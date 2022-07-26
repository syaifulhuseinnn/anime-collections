import React, { useState } from "react";
import Container from "../components/Container";
import MainLayout from "../layouts/MainLayout";

import { useParams } from "react-router-dom";
import useGetAnime from "../hooks/useGetAnime";
import JumbotronAnimeDetails from "../components/JumbotronAnimeDetails";
import Characters from "../components/Characters";

export default function AnimeDetails() {
  const [homeLinkSelected, setHomeLinkSelected] = useState(true);
  const [collectionsLinkSelected, setCollectionsLinkSelected] = useState(false);

  const { id } = useParams();
  const { error, anime, loading } = useGetAnime(Number(id));

  let MAIN_ELEMENT: JSX.Element = <div></div>;

  if (loading) {
    MAIN_ELEMENT = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    MAIN_ELEMENT = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <div>Something went wrong!</div>
      </div>
    );
  }

  if (!loading && anime) {
    MAIN_ELEMENT = (
      <>
        <JumbotronAnimeDetails
          imgSrc={anime.Media.coverImage.extraLarge}
          title={anime.Media.title.english}
          description={anime.Media.description}
          avgScore={anime.Media.averageScore}
          duration={anime.Media.duration}
          genres={anime.Media.genres}
          episodes={anime.Media.episodes}
          seasonYear={anime.Media.seasonYear}
        />
        <Characters characters={anime.Media.characters} />
      </>
    );
  }

  console.log({
    error,
    anime,
    loading,
  });

  return (
    <MainLayout>
      <main>{MAIN_ELEMENT}</main>
    </MainLayout>
  );
}
