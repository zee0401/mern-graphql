const TransactiontypeDefs = `#graphql

    type Transaction{
        _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
    user: User!
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
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        date: String!
        location: String
    }

    input updateTransactionInput{
        transactionId:ID!
        description:String
        amount:Float
        category:String
        location:String
        paymentType:String
        date:String
    }

`;

export default TransactiontypeDefs;
