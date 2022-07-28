import styled from "@emotion/styled";
import media from "../theme/media";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;

  ${media.min.large} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const AppName = styled.h1`
  font-size: 30px;
`;

export { Header, AppName };
