const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type FavoriteApartment {
        _id: ID!
        apartment: Apartment!
        users: User!
    }

    type Apartment {
        _id: ID!
        name: String!
        city: String!
        country: String!
        monthlyPrice: String!
        areaInSqMeter: String!
        noOfRooms: String!
        apartmentCode: String!
        creator: User!
    }
    
    type User {
        _id: ID!
        email: String!
        password: String
        fName: String!
        lName: String!
        city: String!
        country: String!
        phone: String!
        createdApartments: [Apartment!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input ApartmentInput {
        name: String!
        city: String!
        country: String!
        monthlyPrice: Float!
        areaInSqMeter: Float!
        noOfRooms: Int!
        apartmentCode: String!
    }

    input UserInput {
        email: String!
        password: String!
        fName: String!
        lName: String!
        city: String!
        country: String!
        phone: Int!
    }

    type RootQuery {
        apartment: [Apartment!]!
        searchApartments(searchBy: String!, searchValue: String):[Apartment!]!
        user:[User!]!
        favoriteApartment: [FavoriteApartment!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createApartment(apartmentInput: ApartmentInput): Apartment
        createFavoriteApartment(apartmentId: ID!): FavoriteApartment!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
