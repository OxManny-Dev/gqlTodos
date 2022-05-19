import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation CreateUser($firstName: String!, $lastName: String!) {
        createUser(firstName: $firstName, lastName: $lastName) {
            _id
            firstName
            lastName
            fullName
        }
    }
`;

export const LOGIN = gql`
    mutation Mutation($firstName: String!, $password: String!) {
        login(firstName: $firstName, password: $password) {
            user {
                _id
                firstName
                lastName
            }
            token
        }
    }
`;
