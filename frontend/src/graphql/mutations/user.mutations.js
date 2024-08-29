import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation signupUser($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      username
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
