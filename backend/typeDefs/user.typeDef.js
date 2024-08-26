const UserTypeDefs = `#graphql
    type User {
        _id: ID!
        name:string!
        email:string!
        password:string!
        profilePicture:string!
        gender:string!
        }

    type Query {
        getUsers: [User!]
        authUser(email: String!, password:string!): User
    }

    type Mutation{
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LougoutResponse
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

    logoutResponse {
        message: String!
    }
`;
