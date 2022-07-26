import React from "react";
import { Global, css } from "@emotion/react";
import AnimeList from "./pages/AnimeList";
import AnimeDetails from "./pages/AnimeDetails";
import CollectionList from "./pages/CollectionList";
import "@fontsource/questrial";
import "@fontsource/bebas-neue";
import { Routes, Route, Navigate } from "react-router-dom";

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
      `}
    />
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigate to="anime/page/1" />} />
        <Route path="anime/page/:page_number" element={<AnimeList />} />
        <Route path="anime/:id" element={<AnimeDetails />} />
        <Route path="collections" element={<CollectionList />} />
      </Routes>
    </>
  );
}

export default App;
