import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Authors from "./components/Authors.jsx";
import Books from "./components/Books.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewBook from "./components/NewBook.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "/add",
        element: <NewBook />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
