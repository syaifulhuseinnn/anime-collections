import React, { useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import Nav from "../components/Nav";
import NavLink from "../components/NavLink";

export default function AnimeDetails() {
  const [homeLinkSelected, setHomeLinkSelected] = useState(true);
  const [collectionsLinkSelected, setCollectionsLinkSelected] = useState(false);

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
      </Header>
    </Container>
  );
}
