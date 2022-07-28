import React from "react";
import { Global, css } from "@emotion/react";
import AnimeList from "./pages/AnimeList";
import AnimeDetails from "./pages/AnimeDetails";
import CollectionList from "./pages/CollectionList";
import CollectionDetails from "./pages/CollectionDetails";
import "@fontsource/questrial";
import "@fontsource/bebas-neue";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "./context/store";

function GlobalStyles() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        :root {
          --black: #000000;
          --pink: #f73d93;
          --light-pink: #f473b9;
          --white: #ffffff;
          --yellow: #ffc600;
        }

        body {
          background-color: var(--black);
          font-family: "Questrial", sans-serif;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Bebas Neue", cursive;
        }

        p {
          line-height: 1.25rem;
        }

        input {
          display: block;
          width: 100%;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #212529;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          transition: border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;

          &:focus {
            color: #212529;
            background-color: #fff;
            border-color: var(--pink);
            outline: 0;
            box-shadow: 0 0 0 0.25rem rgba(244, 115, 185, 0.35);
          }
        }
      `}
    />
  );
}

function App() {
  return (
    <Provider>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigate to="anime/page/1" />} />
        <Route path="anime/page/:page_number" element={<AnimeList />} />
        <Route path="anime/:id" element={<AnimeDetails />} />
        <Route path="collections" element={<CollectionList />} />
        <Route
          path="collections/:collection_id"
          element={<CollectionDetails />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
