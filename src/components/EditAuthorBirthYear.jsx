import React, { useState, useEffect } from "react";
import { UPDATE_AUTHOR_BIRTH_YEAR } from "../mutations/mutations";
import { useMutation } from "@apollo/client";
import { GET_AUTHORS } from "../queries/queries";

const EditAuthorBirthYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor, { loading, error, reset }] = useMutation(
    UPDATE_AUTHOR_BIRTH_YEAR,
    {
      refetchQueries: [{ query: GET_AUTHORS }],
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
    reset();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Edit Author Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Born</label>
          <input value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default EditAuthorBirthYear;
