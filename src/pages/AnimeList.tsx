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
} from "../components/Card";
import Button from "../components/Button";
import { FaStar } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { gql, useQuery } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import Spinner from "../components/Spinner";
import useAnimes from "../hooks/useAnimes";

export default function AnimeList() {
  const [homeLinkSelected, setHomeLinkSelected] = useState(true);
  const [collectionsLinkSelected, setCollectionsLinkSelected] = useState(false);

  const { error, animes, loading } = useAnimes();

  console.log(animes);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }
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
          <h1>
            you can <span>explore</span> all anime on here
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
            dignissimos excepturi accusantium eum eaque, tempore natus omnis.
            Voluptatem expedita veniam rem, molestias amet cupiditate quisquam
            rerum sequi repellat maxime perferendis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            dolore ut, doloremque cum temporibus facere mollitia beatae quidem
            et atque?
          </p>
        </Jumbotron>
      </Header>
      <main>
        <CardList>
          {animes.Page.media.map((anime: any) => (
            <Card>
              <CardCover />
              <div style={{ textAlign: "end" }}>
                <CardImage src={anime.coverImage.extraLarge} />
              </div>
              <CardBody>
                <Genres>
                  <small className="genres">{anime.genres.join(", ")}</small>
                </Genres>
                <CardTitle>{anime.title.english}</CardTitle>
                <CardDescription>{anime.description}</CardDescription>
              </CardBody>
            </Card>
          ))}
        </CardList>
      </main>

      <Button type="button" bottomRight>
        {/* <IconContext.Provider value={{ size: "1.5em" }}> */}
        <FaStar />
        &nbsp;
        {/* </IconContext.Provider> */}
        Add collection
      </Button>
    </Container>
  );
}
