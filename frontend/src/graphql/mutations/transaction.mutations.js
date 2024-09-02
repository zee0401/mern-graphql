import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      _id
      description
      amount
      paymentType
      date
      location
      category
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      description
      amount
      paymentType
      date
      location
      category
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      _id
      description
      amount
      paymentType
      date
      location
      category
    }
  }
`;
