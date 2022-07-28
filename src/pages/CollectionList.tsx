import React, { useState, useContext, useEffect } from "react";
import Modal from "../components/Modal";
import { Context } from "../context/store";
import MainLayout from "../layouts/MainLayout";
import Collections, {
  CollectionBody,
  CollectionCoverImage,
  CollectionItem,
  CollectionItemHeader,
  CollectionTitle,
} from "../components/Collections";
import { Jumbotron } from "../components/JumbotronDefault";
import ConfirmationForm from "../components/ConfirmationForm";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import CollectionForm from "../components/CollectionForm";

const collectionNameSchema = Yup.object().shape({
  collection_name: Yup.string()
    .required("Collection name is required!")
    .min(5, "Minimum collection name is 5 characters")
    .max(25, "Maximum collection name is 25 characters")
    .matches(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/, {
      message: "Your collection name contains special characters",
    }),
});

export default function CollectionList() {
  const [collectionId, setCollectionId] = useState<string>("");
  const [showAddNewCollectionModal, setShowAddNewCollectionModal] =
    useState<boolean>(false);
  const [showRemoveCollectionModal, setShowRemoveCollectionModal] =
    useState<boolean>(false);
  const { state, dispatch } = useContext(Context);
  const { collections } = state;

  let navigate = useNavigate();
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

  return (
    <MainLayout>
      <Jumbotron>
        <div className="tagline">
          <h1>Collections</h1>
        </div>
      </Jumbotron>
      <main style={{ padding: "0 16px" }}>
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() =>
              setShowAddNewCollectionModal(!showAddNewCollectionModal)
            }
          >
            Add new collection
          </Button>
        </div>
        <Collections>
          {collections.length > 0 &&
            collections.map((collection) => (
              <CollectionItem key={collection.id}>
                <CollectionItemHeader
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  <CollectionCoverImage
                    src={
                      collection.data.length > 0
                        ? collection.data[0].Media.bannerImage ||
                          collection.cover_image
                        : collection.cover_image
                    }
                    height={318}
                    width={118}
                  />
                </CollectionItemHeader>
                <CollectionBody>
                  <CollectionTitle>
                    {collection.collection_name}
                  </CollectionTitle>
                  <Button
                    onClick={() => {
                      setShowRemoveCollectionModal(!showRemoveCollectionModal);
                      setCollectionId(collection.id);
                    }}
                  >
                    Remove
                  </Button>
                </CollectionBody>
              </CollectionItem>
            ))}
        </Collections>
        {/* Render if collections is empty */}
        {collections.length === 0 && (
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
            Collection is empty
          </span>
        )}
      </main>

      {/* ADD NEW COLLECTION MODAL */}
      <Modal
        modalTitle="ADD ANIME TO COLLECTIONS"
        showModal={showAddNewCollectionModal}
        onClose={() => setShowAddNewCollectionModal(!showAddNewCollectionModal)}
      >
        <Formik
          initialValues={{ id: "", collection_name: "" }}
          validationSchema={collectionNameSchema}
          onSubmit={(values, { setSubmitting, resetForm, setFieldError }) => {
            let { id, collection_name } = values;
            id = nanoid();
            if (state.collections) {
              if (
                state.collections.find(
                  (collection) => collection.collection_name === collection_name
                )
              ) {
                setSubmitting(false);
                setFieldError(
                  "collection_name",
                  `${collection_name} is already in the collection list. Use another name.`
                );
              } else {
                handleCreateNewCollection(id, collection_name);

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
                      <strong className="success-message-desktop">
                        New collection created!
                      </strong>
                    )}
                  </div>
                  <div className="button">
                    <Button
                      type="submit"
                      disabled={errors.collection_name ? true : false}
                      fullSize
                    >
                      Create
                    </Button>
                    {isSubmitting && (
                      <strong className="success-message-mobile">
                        New collection created!
                      </strong>
                    )}
                  </div>
                </CollectionForm>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      {/* REMOVE COLLECTION MODAL */}
      <Modal
        modalTitle="REMOVE COLLECTION?"
        showModal={showRemoveCollectionModal}
        onClose={() => setShowRemoveCollectionModal(!showRemoveCollectionModal)}
      >
        <ConfirmationForm>
          <div className="no">
            <Button
              danger
              onClick={() =>
                setShowRemoveCollectionModal(!showRemoveCollectionModal)
              }
            >
              No
            </Button>
          </div>
          <div className="yes">
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_COLLECTION",
                  payload: { collection_id: collectionId },
                });
                setShowRemoveCollectionModal(!showRemoveCollectionModal);
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
