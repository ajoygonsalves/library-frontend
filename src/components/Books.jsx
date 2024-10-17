import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";

const Books = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <p>Error : {error.message}</p>;

  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
