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
      user {
        _id
        name
        username
        profilePicture
      }
    }
  }
`;

export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      totalAmount
      category
    }
  }
`;
