import styled from "@emotion/styled";
import media from "../theme/media";

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  gap: 16px;

  ${media.min.large} {
    width: auto;
  }
`;

export default Nav;
