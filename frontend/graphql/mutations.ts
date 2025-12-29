import { gql } from "@apollo/client";


export const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $phoneNo: String!
    $password: String!
    $firstName: String!
    $lastName: String
  ) {
    register(
      email: $email
      phoneNo: $phoneNo
      password: $password
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
export const VERIFY_EMAIL_OTP_MUTATION = gql`
  mutation VerifyEmailOtp($email: String!, $otp: String!) {
    verifyEmailOtp(email: $email, otp: $otp)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
/* SEND OTP */
export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

/* RESET PASSWORD */
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $email: String!
    $otp: String!
    $newPassword: String!
  ) {
    resetPassword(email: $email, otp: $otp, newPassword: $newPassword)
  }
`;
