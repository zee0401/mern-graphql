const UserTypeDefs = `#graphql
    type User {
        _id: ID!
        name:String!
        email:String!
        password:String!
        profilePicture:String!
        gender:String!
        }

    type Query {
        getUsers: [User!]
        authUser(email: String!, password:String!): User
    }

    type Mutation{
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    input SignUpInput {
        name: String!
        email: String!
        password: String!
        gender: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }

    type LogoutResponse {
        message: String!
    }
`;

export default UserTypeDefs;
