import React from "react";

import {
  CardList,
  Card,
  CardImage,
  CardTitle,
  CardCover,
  CardBody,
  Genres,
  AvgScore,
  Country,
} from "../components/Card";
import Button from "../components/Button";

import useAnimes from "../hooks/useAnimes";
import Pagination from "../components/Pagination";
import MainLayout from "../layouts/MainLayout";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function AnimeList() {
  let { page_number } = useParams();
  let navigate = useNavigate();
  const { error, animes, loading } = useAnimes(Number(page_number), 10);

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

  if (!loading && animes) {
    MAIN_ELEMENT = (
      <>
        <CardList>
          {animes.Page.media.map((anime) => (
            <Card key={anime.id}>
              <Link to={`/anime/${anime.id}`} className="link">
                <CardImage
                  src={anime.coverImage.large}
                  loading="lazy"
                  height={230}
                  width={317}
                  alt={anime.title.english || ""}
                />
                <CardCover />
                <CardBody>
                  <Country>
                    {anime.countryOfOrigin}
                    {`, `}
                    <span className="year">{anime.seasonYear}</span>
                  </Country>
                  <CardTitle>{anime.title.english || "No Title"}</CardTitle>
                  <AvgScore>
                    <span className="icon">Average Score</span>
                    <span>{anime.averageScore}</span>
                  </AvgScore>
                  <Genres>
                    <small className="genres">{anime.genres.join(", ")}</small>
                  </Genres>
                </CardBody>
              </Link>
            </Card>
          ))}
        </CardList>
        <section>
          <Pagination>
            {animes.Page.pageInfo.currentPage !== 1 && (
              <Button
                onClick={() =>
                  navigate(`/anime/page/${Number(page_number!) - 1}`, {
                    replace: true,
                  })
                }
              >
                Previous
              </Button>
            )}
            {animes.Page.pageInfo.hasNextPage && (
              <Button
                onClick={() =>
                  navigate(`/anime/page/${Number(page_number!) + 1}`, {
                    replace: true,
                  })
                }
              >
                Next
              </Button>
            )}
          </Pagination>
        </section>
      </>
    );
  }

  return (
    <MainLayout showJumbotronDefault>
      <main>{MAIN_ELEMENT}</main>
    </MainLayout>
  );
}
