import React, { useEffect, useContext } from "react";
import styled from "@emotion/styled";
import MainLayout from "../layouts/MainLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import useGetAnime from "../hooks/useGetAnime";
import JumbotronAnimeDetails from "../components/JumbotronAnimeDetails";
import Characters from "../components/Characters";
import Modal from "../components/Modal";
import CollectionForm from "../components/CollectionForm";
import Button from "../components/Button";
import Collections from "../components/Collections";
import { nanoid } from "nanoid";
import { Context } from "../context/store";
import * as Yup from "yup";

const collectionNameSchema = Yup.object().shape({
  collection_name: Yup.string()
    .required("Collection name is required!")
    .min(5, "Minimum collection name is 5 characters")
    .max(25, "Maximum collection name is 25 characters")
    .matches(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/, {
      message: "Your collection name contains special characters",
    }),
});

export default function AnimeDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(Context);
  const { error, anime, loading } = useGetAnime(Number(id));

  let MAIN_ELEMENT: JSX.Element = <div></div>;

  useEffect(() => {
    dispatch({ type: "GET_COLLECTIONS" });
  }, []);

  const handleCreateNewCollection = (id: string, collection_name: string) => {
    dispatch({
      type: "CREATE_A_NEW_COLLECTION",
      payload: {
        id,
        collection_name,
        cover_image: `https://dummyimage.com/380:141x705/61A4BC/ffffff.png&text=${collection_name}`,
        data: [],
      },
    });
  };

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
          id={anime.Media.id}
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

  // console.log({
  //   error,
  //   anime,
  //   loading,
  // });
  console.log(state.collections.length);

  return (
    <>
      <MainLayout>
        <main>{MAIN_ELEMENT}</main>
        <Modal modalTitle="ADD ANIME TO COLLECTIONS">
          <Formik
            initialValues={{ id: "", collection_name: "" }}
            validationSchema={collectionNameSchema}
            onSubmit={(values, { setSubmitting, resetForm, setFieldError }) => {
              let { id, collection_name } = values;
              id = nanoid();
              if (state.collections) {
                if (
                  state.collections.find(
                    (collection) =>
                      collection.collection_name === collection_name
                  )
                ) {
                  setSubmitting(false);
                  setFieldError(
                    "collection_name",
                    `${collection_name} is already in the collection list. Use another name.`
                  );
                } else {
                  handleCreateNewCollection(id, collection_name);
                  console.log(state.collections);
                  resetForm({
                    values: { id: "", collection_name: "" },
                    isSubmitting: true,
                  });
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 5000);
                }
              } else {
                handleCreateNewCollection(id, collection_name);
                console.log(state.collections);
                resetForm({
                  values: { id: "", collection_name: "" },
                  isSubmitting: true,
                });
                setTimeout(() => {
                  setSubmitting(false);
                }, 5000);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => {
              return (
                <Form>
                  <CollectionForm>
                    <div className="input">
                      <Field
                        type="text"
                        name="collection_name"
                        placeholder="Create a new collection"
                      />
                      {errors.collection_name && touched.collection_name ? (
                        <strong className="error-message">
                          {errors.collection_name}
                        </strong>
                      ) : null}
                      {isSubmitting && (
                        <strong className="success-message">
                          New collection created!
                        </strong>
                      )}
                    </div>
                    <div>
                      <Button
                        type="submit"
                        disabled={errors.collection_name ? true : false}
                      >
                        Create
                      </Button>
                    </div>
                  </CollectionForm>
                </Form>
              );
            }}
          </Formik>
          {state.collections.length > 0 ? (
            <Collections
              gridAtLarge={2}
              gridAtExtraLarge={2}
              gridAtExtraExtraLarge={2}
              anime={anime}
            />
          ) : (
            <strong
              style={{
                textAlign: "center",
                padding: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              Collection is emptyssss
            </strong>
          )}
        </Modal>
      </MainLayout>
    </>
  );
}
