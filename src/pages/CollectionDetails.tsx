import React, { useContext, useEffect, useState } from "react";
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
} from "../components/Card";
import { Link } from "react-router-dom";
import { Jumbotron } from "../components/JumbotronDefault";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ConfirmationForm from "../components/ConfirmationForm";

export default function CollectionDetails() {
  const [showRemoveAnimeModal, setShowRemoveAnimeModal] =
    useState<boolean>(false);
  const [animeId, setAnimeId] = useState<number | undefined>(undefined);
  const { collection_id } = useParams();
  const { state, dispatch } = useContext(Context);
  const { collections } = state;

  let MAIN_ELEMENT: JSX.Element = <div></div>;

  useEffect(() => {
    dispatch({ type: "GET_COLLECTIONS" });
  }, []);

  const collectionDetails = collections.find(
    (collection) => collection.id === collection_id
  );

  if (collectionDetails?.data.length! > 0) {
    MAIN_ELEMENT = (
      <CardList>
        {collectionDetails?.data.map((anime) => (
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
            </Link>
            <CardBody>
              <Country>
                {anime.Media.countryOfOrigin}
                {`, `}
                <span className="year">{anime.Media.seasonYear}</span>
              </Country>
              <CardTitle>{anime.Media.title.english || "No Title"}</CardTitle>
              <Button
                onClick={() => {
                  setShowRemoveAnimeModal(!showRemoveAnimeModal);
                  setAnimeId(anime.Media.id);
                }}
                third
              >
                Remove
              </Button>
            </CardBody>
          </Card>
        ))}
      </CardList>
    );
  } else {
    MAIN_ELEMENT = (
      <span
        style={{
          textAlign: "center",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          fontWeight: "600",
        }}
      >
        No anime added yet
      </span>
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

      {/* REMOVE COLLECTION MODAL */}
      <Modal
        modalTitle="REMOVE ANIME?"
        showModal={showRemoveAnimeModal}
        onClose={() => setShowRemoveAnimeModal(!showRemoveAnimeModal)}
      >
        <ConfirmationForm>
          <div className="no">
            <Button
              danger
              onClick={() => setShowRemoveAnimeModal(!showRemoveAnimeModal)}
            >
              No
            </Button>
          </div>
          <div className="yes">
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_ANIME_FROM_COLLECTION",
                  payload: {
                    anime_id: animeId!,
                    collection_id: collection_id!,
                  },
                });
                setShowRemoveAnimeModal(!showRemoveAnimeModal);
              }}
            >
              Yes
            </Button>
          </div>
        </ConfirmationForm>
      </Modal>
    </MainLayout>
  );
}
