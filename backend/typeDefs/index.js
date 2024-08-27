import TransactionTypeDefs from "./trasnsaction.typeDef.js";
import UserTypeDefs from "./user.typeDef.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

const mergedTypeDefs = mergeTypeDefs([TransactionTypeDefs, UserTypeDefs]);

export default mergedTypeDefs;
