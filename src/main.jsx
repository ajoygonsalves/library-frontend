import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Authors from "./components/Authors.jsx";
import Books from "./components/Books.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewBook from "./components/NewBook.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
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
