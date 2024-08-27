import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";
import { mergeResolvers } from "@graphql-tools/merge";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver]);

export default mergedResolvers;
