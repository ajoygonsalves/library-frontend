import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
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

export const ALL_GENRES = gql`
  query AllGenres {
    allBooks {
      genres
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
