import styled from "@emotion/styled";
import media from "../theme/media";
import "@fontsource/work-sans/900.css";

const CardList = styled.section`
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 80px;

  ${media.min.medium} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.min.large} {
    /* grid-gap: px; */
  }

  /* ${media.min.extra_large} {
    grid-template-columns: repeat(5, 1fr);
  } */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 16px; */
  /* border-radius: 10px; */
  background-color: #000000;
  position: relative;
  min-height: 500px;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    box-shadow: 8px 8px 0px 0px rgba(247, 61, 147, 1);
    border: 0.1px solid #ffffff;
  }

  ${media.min.large} {
    width: 100%;
    min-height: unset;
  }
`;

const CardImage = styled.img`
  height: auto;
  max-width: 100%;
  width: 100%;
  /* border-radius: 10px; */
  ${media.min.large} {
    width: 250px;
    display: inline;
  }
`;

const CardBody = styled.div`
  position: absolute;
  left: 0;
  /* width: 100%; */
  padding: 16px;
  /* z-index: 1; */
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: end;

  ${media.min.large} {
    width: 57%;
    justify-content: center;
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
  -webkit-line-clamp: 2;
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
  -webkit-line-clamp: 5;
  white-space: normal;
  margin: 0;
`;

const CardCover = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  ${media.min.large} {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const Genres = styled.div`
  small.genres {
    background-color: rgba(51, 71, 86, 0.5);
    padding: 7px 14px;
    /* border-radius: 16px; */
    border-left: 2px solid var(--pink);
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
};
