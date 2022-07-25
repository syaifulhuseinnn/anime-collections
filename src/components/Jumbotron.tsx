import styled from "@emotion/styled";
import media from "../theme/media";

const Jumbotron = styled.div`
  display: flex;
  flex-direction: column;

  ${media.min.large} {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .title {
    padding: 16px;
  }

  .tagline {
    font-size: 32px;

    ${media.min.large} {
      font-size: 60px;
    }

    span {
      color: #f73d93;
    }
  }

  ${media.min.large} {
    .tagline-description {
      flex-basis: 70%;
    }
  }
`;

export default Jumbotron;
