import React, { useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import Nav from "../components/Nav";
import NavLink from "../components/NavLink";
import {
  CardList,
  Card,
  CardImage,
  CardTitle,
  CardCover,
  CardBody,
  CardDescription,
  Genres,
  AvgScore,
  Country,
} from "../components/Card";
import Button from "../components/Button";
import { FaStar } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { gql, useQuery } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import Spinner from "../components/Spinner";
import useAnimes from "../hooks/useAnimes";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function AnimeList() {
  const [homeLinkSelected, setHomeLinkSelected] = useState(true);
  const [collectionsLinkSelected, setCollectionsLinkSelected] = useState(false);
  const [page, setPage] = useState<number>(1);
  const { error, animes, loading } = useAnimes(page, 10);

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
              <Link to={`anime/${anime.id}`} className="link">
                <CardImage src={anime.coverImage.large} loading="lazy" />
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
              <Button onClick={() => setPage((prevPage) => prevPage - 1)}>
                Previous
              </Button>
            )}
            {animes.Page.pageInfo.hasNextPage && (
              <Button
                onClick={() => {
                  window.scrollTo(0, 594);
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                Next
              </Button>
            )}
          </Pagination>
        </section>
      </>
    );
  }

  // console.log({ error, animes, loading });

  return (
    <Container>
      <Header>
        <h3>Animexplorer.com</h3>
        <Nav>
          <NavLink
            onClick={() => {
              setHomeLinkSelected(true);
              setCollectionsLinkSelected(false);
            }}
            selected={homeLinkSelected}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setCollectionsLinkSelected(true);
              setHomeLinkSelected(false);
            }}
            selected={collectionsLinkSelected}
          >
            Collections
          </NavLink>
        </Nav>
        <Jumbotron>
          <div className="tagline">
            <h1>
              you can <span>explore</span> all anime on here
            </h1>
          </div>
          <div className="tagline-description">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
              dignissimos excepturi accusantium eum eaque, tempore natus omnis.
              Voluptatem expedita veniam rem, molestias amet cupiditate quisquam
              rerum sequi repellat maxime perferendis.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio dolore ut, doloremque cum temporibus facere mollitia
              beatae quidem et atque?
            </p>
          </div>
        </Jumbotron>
      </Header>
      <main>{MAIN_ELEMENT}</main>
    </Container>
  );
}
