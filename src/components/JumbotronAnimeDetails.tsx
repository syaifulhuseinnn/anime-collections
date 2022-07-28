import styled from "@emotion/styled";
import media from "../theme/media";
import Button from "./Button";
import { Context } from "../context/store";
import { useContext } from "react";

type JumbotronAnimeDetailsProps = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  avgScore: number;
  duration: number;
  genres: string[];
  seasonYear: number;
  episodes: number;
};

type StatProps = {
  color?: string;
};

const JumbotronContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

const JumbotronHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;

  ${media.min.large} {
    flex-direction: row;
    gap: 5em;
  }

  .left {
    align-self: center;

    ${media.min.large} {
      width: 60%;
    }

    .title {
      margin: 0;
      font-size: 3.3rem;

      ${media.min.large} {
        font-size: 5.5rem;
      }
    }

    .description {
      font-size: 18px;
      line-height: 1.5rem;
    }

    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px 0;

      ${media.min.large} {
      }
    }

    .add-to-collection {
      padding: 16px 0;
    }
  }

  .right {
    flex: 1;
    position: relative;

    .cover-image {
      width: 100%;
      max-width: 100%;
      height: auto;
    }

    .cover-image-overlay {
      background: rgb(0, 0, 0);
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 5%,
        rgba(0, 0, 0, 0) 100%
      );
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;

      ${media.min.large} {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 1) 5%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }
  }
`;

const Stat = styled.div<StatProps>`
  display: flex;
  align-items: center;
  gap: 5px;

  .icon {
    background-color: rgb(44, 51, 51);
    padding: 2px 7px;
    color: var(--white);
    font-family: "Bebas Neue", cursive;
    border-left: ${(props) =>
      props.color ? `3px solid ${props.color}` : `3px solid #ffc600`};
    font-size: 20px;
  }
`;

export default function JumbotronAnimeDetails(
  props: JumbotronAnimeDetailsProps
) {
  const { state, dispatch } = useContext(Context);
  const { collections } = state;
  const {
    id,
    imgSrc,
    title,
    description,
    avgScore,
    duration,
    genres,
    episodes,
    seasonYear,
  } = props;
  const addedToCollections = collections
    .filter((collection) => collection.data.find((i) => i.Media.id === id))
    .map((item) => item.collection_name)
    .join(", ");

  return (
    <JumbotronContainer>
      <JumbotronHeader>
        <div className="left">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
          <div className="stats">
            <Stat>
              <span className="icon">Average score</span>
              <span>{avgScore}</span>
            </Stat>
            <Stat color="#0096FF">
              <span className="icon">Duration</span>
              <span>{duration} min</span>
            </Stat>
            <Stat color="#3CCF4E">
              <span className="icon">Episodes</span>
              <span>{episodes}</span>
            </Stat>
            <Stat color="#EF5B0C">
              <span className="icon">Year</span>
              <span>{seasonYear}</span>
            </Stat>
            <Stat color="#A149FA">
              <span className="icon">Genres</span>
              <span>{genres.join(", ")}</span>
            </Stat>
            <Stat color="#D9D7F1">
              <span className="icon">Added to</span>
              <span>
                {addedToCollections ? addedToCollections : "Not added"}
              </span>
            </Stat>
          </div>
          <div className="add-to-collection">
            <Button
              onClick={() => dispatch({ type: "SHOW_MODAL_ADD_TO_COLLECTION" })}
            >
              Add to collection
            </Button>
          </div>
        </div>
        <div className="right">
          <div className="cover-image-overlay"></div>
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            className="cover-image"
          />
        </div>
      </JumbotronHeader>
    </JumbotronContainer>
  );
}
