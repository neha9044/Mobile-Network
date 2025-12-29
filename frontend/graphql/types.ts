// What the mutation RETURNS
export interface RegisterMutationResponse {
  register: string;
}

// What VARIABLES it ACCEPTS
export interface RegisterMutationVariables {
  email: string;
  phoneNo: string;
  password: string;
  firstName: string;
  lastName?: string | null;
}
export interface VerifyEmailOtpResponse {
  verifyEmailOtp: string;
}

export interface VerifyEmailOtpVariables {
  email: string;
  otp: string;
}
export interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName?: string | null;
    };
  };
}

export interface LoginVariables {
  identifier: string;
  password: string;
}
export interface ForgotPasswordResponse {
  forgotPassword: string;
}

export interface ForgotPasswordVariables {
  email: string;
}

export interface ResetPasswordResponse {
  resetPassword: string;
}

export interface ResetPasswordVariables {
  email: string;
  otp: string;
  newPassword: string;
}
