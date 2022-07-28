import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import media from "../theme/media";
import Button from "../components/Button";
import { Context } from "../context/store";
import { Data } from "../types/AnimeDetailsTypes";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

type CollectionsContainerProps = {
  gridAtSmall?: number;
  gridAtMedium?: number;
  gridAtLarge?: number;
  gridAtExtraLarge?: number;
  gridAtExtraExtraLarge?: number;
};

type CollectionsProps = {
  gridAtSmall?: number;
  gridAtMedium?: number;
  gridAtLarge?: number;
  gridAtExtraLarge?: number;
  gridAtExtraExtraLarge?: number;
  anime?: Data;
};

const CollectionsContainer = styled.section<CollectionsContainerProps>`
  display: grid;
  grid-gap: 16px;
  padding: 16px;
  grid-template-columns:
    repeat(1, 1fr)
    ${media.min.small} {
    grid-template-columns: ${(props) =>
      props.gridAtSmall
        ? `repeat(${props.gridAtSmall}, 1fr)`
        : `repeat(1,1fr)`};
  }

  ${media.min.medium} {
    grid-template-columns: ${(props) =>
      props.gridAtMedium
        ? `repeat(${props.gridAtMedium}, 1fr)`
        : `repeat(1,1fr)`};
  }

  ${media.min.large} {
    grid-template-columns: ${(props) =>
      props.gridAtLarge
        ? `repeat(${props.gridAtLarge}, 1fr)`
        : `repeat(4,1fr)`};
  }

  ${media.min.extra_large} {
    grid-template-columns: ${(props) =>
      props.gridAtExtraLarge
        ? `repeat(${props.gridAtExtraLarge}, 1fr)`
        : `repeat(4, 1fr)`};
  }

  ${media.min.extra_extra_large} {
    grid-template-columns: ${(props) =>
      props.gridAtExtraExtraLarge
        ? `repeat(${props.gridAtExtraExtraLarge},1fr)`
        : `repeat(4, 1fr)`};
  }
`;

const CollectionItem = styled.article`
  display: flex;
  flex-direction: column;
  background-color: rgba(16, 15, 15, 1);
`;

const CollectionItemHeader = styled.div``;

const CollectionCoverImage = styled.img`
  max-width: 100%;
  width: 100%;
  height: auto;
`;

const CollectionBody = styled.div`
  background-color: rgba(16, 15, 15, 1);
  padding: 16px;
`;

const CollectionTitle = styled.h1`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
  margin: 0;
  font-size: 30px;
  margin-bottom: 16px;
`;

const AddedMark = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
`;

export default function Collections(props: CollectionsProps) {
  const { state, dispatch } = useContext(Context);
  let location = useLocation();
  const { collections } = state;
  const {
    gridAtSmall,
    gridAtMedium,
    gridAtLarge,
    gridAtExtraLarge,
    gridAtExtraExtraLarge,
    anime,
  } = props;

  useEffect(() => {
    dispatch({ type: "GET_COLLECTIONS" });
  }, []);
  console.log(location);
  return (
    <CollectionsContainer
      gridAtSmall={gridAtSmall}
      gridAtMedium={gridAtMedium}
      gridAtLarge={gridAtLarge}
      gridAtExtraLarge={gridAtExtraLarge}
      gridAtExtraExtraLarge={gridAtExtraExtraLarge}
    >
      {collections.length > 0 &&
        collections.map((collection) => (
          <CollectionItem key={collection.id}>
            <CollectionItemHeader>
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
              <CollectionTitle>{collection.collection_name}</CollectionTitle>
              {collection.data.find(
                (item) => item.Media.id === anime?.Media.id
              ) ? (
                <AddedMark>
                  <BsFillPatchCheckFill size="1.35em" color="3CCF4E" />
                  <span>Added</span>
                </AddedMark>
              ) : (
                location.pathname !== "/collections" && (
                  <Button
                    onClick={() =>
                      dispatch({
                        type: "ADD_ANIME_TO_COLLECTION",
                        payload: { id: collection.id, data: anime! },
                      })
                    }
                  >
                    Add
                  </Button>
                )
              )}
            </CollectionBody>
          </CollectionItem>
        ))}

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
          }}
        >
          Collection is empty
        </span>
      )}
    </CollectionsContainer>
  );
}
