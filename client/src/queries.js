import { gql } from "@apollo/client";

export const getAllBooks = gql`
  query getAllBooks {
    books {
      title
      author {
        name
        age
      }
    }
  }
`;