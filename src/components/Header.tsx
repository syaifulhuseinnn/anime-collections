import styled from "@emotion/styled";
import media from "../theme/media";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;

  ${media.min.large} {
    /* flex-direction: row;
    justify-content: space-between;
    align-content: center; */

    h3 {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
export default Header;
