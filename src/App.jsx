import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    navigate("/");
  };

  return (
    <div>
      <nav>
        <Link to={"/authors"}>Authors</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/add"}>Add Book</Link>
        {!token ? (
          <Link to={"/login"}>Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <Outlet context={{ token, setToken }} />
    </div>
  );
};

export default App;
