import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
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
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      // const transactions = [
      // 	{ category: "expense", amount: 50 },
      // 	{ category: "expense", amount: 75 },
      // 	{ category: "investment", amount: 100 },
      // 	{ category: "saving", amount: 30 },
      // 	{ category: "saving", amount: 20 }
      // ];

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      // categoryMap = { expense: 125, investment: 100, saving: 50 }

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
      // return [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
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
    updateTransaction: async (_, { input }) => {
      try {
        const updatedtransaction = await Transaction.findByIdAndUpdate(
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
    deleteTransaction: async (_, { id }, context) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        return deletedTransaction;
      } catch (err) {
        console.log("error in deleting transaction", err);
        throw new Error("error in deleting transaction");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      // const userId = parent.userId;
      try {
        const user = await User.findById(parent.userId);
        return user;
      } catch (error) {
        console.error("error in user resolver", error);
        throw new Error(error.message || "user resolver error");
      }
    },
  },
};

export default transactionResolver;
