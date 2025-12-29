import { prisma } from "./prisma";
import { verifyToken } from "./utils/jwt";

export async function context({ req }: any) {
  const authHeader = req.headers.authorization || "";
  let user = null;

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");

    try {
      const { userId } = verifyToken(token);
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    } catch {
      user = null;
    }
  }

  return { prisma, user };
}
