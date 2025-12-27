import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { generateOtp, otpExpiry } from "../utils/otp";
import { sendOtpEmail } from "../utils/email";
import jwt from "jsonwebtoken";


export const auth = {
    Query: {
        me: (_: any, __: any, ctx: any) => {
            if (!ctx.user) throw new Error("Not authenticated");
            return ctx.user;
        },
    },

    Mutation: {
        // REGISTER
        register: async (_: any, { email, phoneNo, password,firstName,lastName }: any) => {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ email }, { phoneNo }],
                },
            });

            // Case 1: User exists AND already verified → block
            if (existingUser && existingUser.emailVerified) {
                throw new Error("User already exists");
            }

            // Case 2: User exists BUT not verified → resend OTP
            if (existingUser && !existingUser.emailVerified) {
                // delete old OTPs
                await prisma.emailOTP.deleteMany({
                    where: { email: existingUser.email },
                });

                // generate new OTP
                const otp = generateOtp();

                await prisma.emailOTP.create({
                    data: {
                        email: existingUser.email,
                        otp,
                        expiresAt: otpExpiry(),
                    },
                });

                await sendOtpEmail(existingUser.email, otp);

                return "OTP resent to your email";
            }

            // Case 3: Brand new user → create + send OTP
            const passwordHash = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    email,
                    phoneNo,
                    passwordHash,
                    firstName,
                    lastName,
                    emailVerified: false,
                },
            });

            const otp = generateOtp();

            await prisma.emailOTP.create({
                data: {
                    email,
                    otp,
                    expiresAt: otpExpiry(),
                },
            });

            await sendOtpEmail(email, otp);

            return "OTP sent to your email";
        },
        // VERIFY EMAIL OTP
        verifyEmailOtp: async (_: any, { email, otp }: any) => {
            const record = await prisma.emailOTP.findFirst({
                where: { email, otp },
            });

            if (!record) {
                throw new Error("Invalid OTP");
            }

            if (record.expiresAt < new Date()) {
                throw new Error("OTP expired");
            }

            await prisma.user.update({
                where: { email },
                data: { emailVerified: true },
            });

            await prisma.emailOTP.delete({
                where: { id: record.id },
            });

            return "Email verified successfully";
        },
        //  LOGIN
        login: async (_: any, { identifier, password }: any) => {
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: identifier },
                        { phoneNo: identifier },
                    ],
                },
            });

            if (!user) throw new Error("Invalid credentials");

            if (!user.emailVerified) {
                throw new Error("Email not verified");
            }

            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) throw new Error("Invalid credentials");

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: "7d" }
            );

            return { token, user };
        },
        // FORGOT PASSWORD
        forgotPassword: async (_: any, { email }: any) => {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new Error("User not found");
            }

            // delete old OTPs
            await prisma.emailOTP.deleteMany({
                where: { email },
            });

            const otp = generateOtp();

            await prisma.emailOTP.create({
                data: {
                    email,
                    otp,
                    expiresAt: otpExpiry(),
                },
            });

            await sendOtpEmail(email, otp);

            return "Password reset OTP sent to your email";
        },
        // RESET PASSWORD
        resetPassword: async (
            _: any,
            { email, otp, newPassword }: any
        ) => {
            const record = await prisma.emailOTP.findFirst({
                where: { email, otp },
            });

            if (!record) {
                throw new Error("Invalid OTP");
            }

            if (record.expiresAt < new Date()) {
                throw new Error("OTP expired");
            }

            const passwordHash = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: { email },
                data: { passwordHash },
            });

            // delete OTP after success
            await prisma.emailOTP.delete({
                where: { id: record.id },
            });

            return "Password updated successfully";
        },
    },
};
