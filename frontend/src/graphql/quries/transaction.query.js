import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
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

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
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
