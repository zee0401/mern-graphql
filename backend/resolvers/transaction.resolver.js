import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    getTransactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("You must be logged in to do this");
        }
        const userId = await context.getUser()._id;

        const trasnsactions = await Transaction.find({ userId: userId });

        return trasnsactions;
      } catch (error) {
        console.log("error in getting transactions", error);
        throw new Error(error);
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.log("error in getting transaction", error);
        throw new Error("error in getting transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        const updatedtransaction = await Transaction.findByIdandUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedtransaction;
      } catch (err) {
        console.log("error in updating transaction", err);
        throw new Error("error in updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (err) {
        console.log("error in deleting transaction", err);
        throw new Error("error in deleting transaction");
      }
    },
  },
};

export default transactionResolver;
