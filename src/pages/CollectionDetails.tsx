import React, { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { Context } from "../context/store";
import {
  CardList,
  Card,
  CardImage,
  CardCover,
  CardBody,
  CardTitle,
  Country,
  AvgScore,
  Genres,
} from "../components/Card";
import { Link } from "react-router-dom";
import { Jumbotron } from "../components/JumbotronDefault";

export default function CollectionDetails() {
  const { collection_id } = useParams();
  const { state, dispatch } = useContext(Context);
  const { collections } = state;

  let MAIN_ELEMENT: JSX.Element = <div></div>;

  if (collections) {
    MAIN_ELEMENT = (
      <CardList>
        {collections
          .find((collection) => collection.id === collection_id)
          ?.data.map((anime) => (
            <Card key={anime.Media.id}>
              <Link to={`/anime/${anime.Media.id}`} className="link">
                <CardImage
                  src={anime.Media.coverImage.extraLarge}
                  loading="lazy"
                  height={230}
                  width={317}
                  alt={anime.Media.title.english || ""}
                />
                <CardCover />
                <CardBody>
                  <Country>
                    {anime.Media.countryOfOrigin}
                    {`, `}
                    <span className="year">{anime.Media.seasonYear}</span>
                  </Country>
                  <CardTitle>
                    {anime.Media.title.english || "No Title"}
                  </CardTitle>
                  <AvgScore>
                    <span className="icon">Average Score</span>
                    <span>{anime.Media.averageScore}</span>
                  </AvgScore>
                  <Genres>
                    <small className="genres">
                      {anime.Media.genres.join(", ")}
                    </small>
                  </Genres>
                </CardBody>
              </Link>
            </Card>
          ))}
      </CardList>
    );
  }

  return (
    <MainLayout>
      <Jumbotron>
        <div className="tagline">
          <h1>
            {
              collections.find((collection) => collection.id === collection_id)
                ?.collection_name
            }
          </h1>
        </div>
      </Jumbotron>
      <main>{MAIN_ELEMENT}</main>
    </MainLayout>
  );
}
