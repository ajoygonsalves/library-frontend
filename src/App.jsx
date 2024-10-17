import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav>
        <Link to={"/authors"}>Authors</Link>
        <Link to={"/books"}>Books</Link>
        <Link to={"/add"}>Add Book</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
