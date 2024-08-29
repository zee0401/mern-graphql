const TransactiontypeDefs = `#graphql

    type Transaction{
        id:ID!
        userId:ID!
        date:String!
        amount:Float!
    }
    type Query{
        getTransactions:[Transaction]!
        transaction(transactionId:ID!):Transaction
    }

    type Mutation{
        createTransaction(input:createTransactionInput!):Transaction!
        updateTransaction(input:updateTransactionInput!):Transaction!
        deleteTransaction(id:ID!):Transaction!
    }

    input createTransactionInput{
        description:String!
        amount:Float!
        category:String!
        location:String!
        date:String!
    }
    input updateTransactionInput{
        transactionId:ID!
        description:String
        amount:Float
        category:String
        location:String
        date:String
    }

`;

export default TransactiontypeDefs;
