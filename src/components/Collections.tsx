import React from "react";
import styled from "@emotion/styled";
import media from "../theme/media";

const CollectionsContainer = styled.section`
  display: grid;
  padding: 16px;
  grid-gap: 16px;

  ${media.min.extra_extra_large} {
    grid-template-columns: repeat(4, 1fr);
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
`;

const CollectionTitle = styled.h1`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
  margin: 0;
  padding: 16px;
  font-size: 32px;
`;

export default function Collections() {
  return (
    <CollectionsContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <CollectionItem>
          <CollectionItemHeader>
            <CollectionCoverImage
              src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-T3PJUjFJyRwg.jpg"
              height={318}
              width={118}
            />
          </CollectionItemHeader>
          <CollectionBody>
            <CollectionTitle>Example Title</CollectionTitle>
          </CollectionBody>
        </CollectionItem>
      ))}
    </CollectionsContainer>
  );
}
