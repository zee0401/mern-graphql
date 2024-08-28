const UserTypeDefs = `#graphql
    type User {
        _id: ID!
        name:String!
        username:String!
        password:String!
        profilePicture:String!
        gender:String!
        }

    type Query {
        authUser: User
        user(userId: ID!): User
    }

    type Mutation{
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    input SignUpInput {
        name: String!
        username: String!
        password: String!
        gender: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }

    type LogoutResponse {
        message: String!
    }
`;

export default UserTypeDefs;
