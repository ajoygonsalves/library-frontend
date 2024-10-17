import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/queries";
import EditAuthorBirthYear from "./EditAuthorBirthYear";

const Authors = () => {
  const { data, loading, error } = useQuery(GET_AUTHORS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <p>Error : {error.message}</p>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditAuthorBirthYear authors={authors} />
    </div>
  );
};

export default Authors;
