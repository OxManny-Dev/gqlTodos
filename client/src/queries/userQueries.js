import { gql } from '@apollo/client';


export const USERS = gql`
    query Users {
        users {
            _id
            firstName
            lastName
            fullName
        }
    }
`;

export const USER = gql`
    query User($id: String!) {
        user(id: $id) {
            _id
            firstName
            lastName
            fullName
        }
    }
`;
