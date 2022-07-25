import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import Nav from "../components/Nav";
import NavLink from "../components/NavLink";
import Jumbotron from "../components/Jumbotron";
import { Outlet } from "react-router-dom";

export default function Anime() {
  return (
    <Container>
      <Header>
        <h3>Animexplorer.com</h3>
        <Nav>
          <NavLink selected>Home</NavLink>
          <NavLink>Collections</NavLink>
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
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
