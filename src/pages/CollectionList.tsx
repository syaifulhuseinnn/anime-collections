import React from "react";
import Container from "../components/Container";

import MainLayout from "../layouts/MainLayout";
import Collections from "../components/Collections";
import { Jumbotron } from "../components/JumbotronDefault";
import { useLocation } from "react-router-dom";

export default function CollectionList() {
  let location = useLocation();
  // console.log(location);
  return (
    <MainLayout>
      <Jumbotron>
        <div className="tagline">
          <h1>Collections</h1>
        </div>
      </Jumbotron>
      <main>
        <Collections />
      </main>
    </MainLayout>
  );
}
