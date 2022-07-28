import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import media from "../theme/media";
import Button from "../components/Button";
import { Context } from "../context/store";
import { Data } from "../types/AnimeDetailsTypes";

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
  children: React.ReactNode;
};

const CollectionsContainer = styled.section<CollectionsContainerProps>`
  display: grid;
  grid-gap: 16px;
  padding: 16px 0;
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

const CollectionItemHeader = styled.div`
  min-height: 130px;
  cursor: pointer;
`;

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

export {
  CollectionItem,
  CollectionItemHeader,
  CollectionCoverImage,
  CollectionBody,
  CollectionTitle,
  AddedMark,
};

export default function Collections(props: CollectionsProps) {
  const {
    gridAtSmall,
    gridAtMedium,
    gridAtLarge,
    gridAtExtraLarge,
    gridAtExtraExtraLarge,
    children,
  } = props;

  return (
    <>
      <CollectionsContainer
        gridAtSmall={gridAtSmall}
        gridAtMedium={gridAtMedium}
        gridAtLarge={gridAtLarge}
        gridAtExtraLarge={gridAtExtraLarge}
        gridAtExtraExtraLarge={gridAtExtraExtraLarge}
      >
        {children}
      </CollectionsContainer>
    </>
  );
}
