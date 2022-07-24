import styled from "@emotion/styled";
import media from "../theme/media";
import "@fontsource/work-sans/900.css";

const CardList = styled.section`
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  ${media.min.medium} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.min.large} {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
  }

  ${media.min.extra_large} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Card = styled.div`
  background-color: #000000;
  cursor: pointer;
  position: relative;
`;

const CardImage = styled.img`
  height: auto;
  max-width: 100%;
  width: 100%;
  ${media.min.large} {
    width: 250px;
    display: inline;
  }
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: center;

  ${media.min.large} {
  }
`;

const CardTitle = styled.h1`
  color: #ffffff;
  font-size: 30px;
  /* font-family: "Work Sans", sans-serif;
  font-weight: 900; */
  text-transform: uppercase;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;

  ${media.min.large} {
    font-size: 32px;
  }
`;

const CardDescription = styled.p`
  color: #ffffff;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
  margin: 0;
`;

const CardCover = styled.div`
  background-color: rgba(16, 15, 15, 0.2);
  backdrop-filter: blur(18px);
  position: absolute;
  bottom: 0;
  left: 0;
  height: 150px;
  width: 100%;
`;

const Genres = styled.small`
  small.genres {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal;
    margin: 0;
    font-size: 12px;
  }
`;

const AvgScore = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .icon {
    background-color: #ffc600;
    padding: 2px 7px;
    color: var(--black);
    font-family: "Bebas Neue", cursive;
  }
`;

const Country = styled.span`
  .year {
    color: #ffc600;
  }
`;

export {
  CardList,
  Card,
  CardImage,
  CardTitle,
  CardCover,
  CardBody,
  CardDescription,
  Genres,
  AvgScore,
  Country,
};
