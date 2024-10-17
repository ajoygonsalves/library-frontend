import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../mutations/mutations";
import { GET_AUTHORS, GET_BOOKS } from "../queries/queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook, { data, loading, error, reset }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((item) => console.log(item));
    },
  });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title: title,
        author: author,
        published: parseInt(published),
        genres: genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
    reset();
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
