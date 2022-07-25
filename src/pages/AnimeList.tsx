import React, { useState, useContext } from "react";
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
import Jumbotron from "../components/Jumbotron";
import useAnimes from "../hooks/useAnimes";
import Pagination from "../components/Pagination";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IndexContext } from "../context/store";

export default function AnimeList() {
  const [homeLinkSelected, setHomeLinkSelected] = useState(true);
  const [collectionsLinkSelected, setCollectionsLinkSelected] = useState(false);
  const [page, setPage] = useState<number>(1);

  let { page_number } = useParams();
  let navigate = useNavigate();
  const { error, animes, loading } = useAnimes(Number(page_number), 10);
  const { state, dispatch } = useContext(IndexContext);

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

  // console.log({ error, animes, loading });
  console.log(state);

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
              You can <span style={{ color: `var(--pink)` }}>explore</span> all
              <span style={{ color: `var(--pink)` }}> anime</span> on here
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
