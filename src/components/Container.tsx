import styled from "@emotion/styled";
import media from "../theme/media";

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;

  ${media.min.small} {
    max-width: 540px;
  }

  ${media.min.medium} {
    max-width: 720px;
  }

  ${media.min.large} {
    max-width: 960px;
  }

  ${media.min.extra_large} {
    max-width: 1140px;
  }

  ${media.min.extra_extra_large} {
    max-width: 1320px;
  }
`;

export default Container;
