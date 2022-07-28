import styled from "@emotion/styled";
import media from "../theme/media";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: 20px;

  .link {
    text-decoration: none;
    color: var(--white);
    font-weight: 600;
    font-size: 18px;
    padding: 8px 16px;
  }

  .active {
    background-color: var(--pink);
  }

  ${media.min.large} {
    width: auto;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink
        to="/anime/page/1"
        className={({ isActive }) => (isActive ? `link active` : `link`)}
      >
        Home
      </NavLink>
      <NavLink
        to="/collections"
        className={({ isActive }) => (isActive ? `link active` : `link`)}
      >
        Collections
      </NavLink>
    </Nav>
  );
}
