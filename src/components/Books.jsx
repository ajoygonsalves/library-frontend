import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_BOOKS, GET_CURRENT_USER } from "../queries/queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
    refetch: refetchBooks,
  } = useQuery(GET_BOOKS, {
    variables: { genre: selectedGenre || null },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (showFavorites && userData?.me?.favoriteGenre) {
      setSelectedGenre(userData.me.favoriteGenre);
    }
  }, [showFavorites, userData]);

  if (booksLoading || userLoading) return <div>loading...</div>;
  if (booksError) return <p>Error loading books: {booksError.message}</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;

  const books = booksData.allBooks;
  // Get unique genres from all books
  const genres = [...new Set(books.map((book) => book.genres).flat())];

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setSelectedGenre(userData?.me?.favoriteGenre || "");
    } else {
      setSelectedGenre("");
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    refetchBooks({ genre: genre || null });
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Filter by genre:</h3>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreSelect(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreSelect("")}>All genres</button>
        {userData?.me && (
          <button onClick={toggleFavorites}>
            {showFavorites ? "Show All" : "Show Favorites"}
          </button>
        )}
      </div>
      {showFavorites && userData?.me && (
        <p>Showing books in your favorite genre: {userData.me.favoriteGenre}</p>
      )}
    </div>
  );
};

export default Books;
