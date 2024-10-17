import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetBooks {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
