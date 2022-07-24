import styled from "@emotion/styled";

type NavLinkProps = {
  selected?: boolean;
};

const NavLink = styled.span<NavLinkProps>`
  font-size: 18px;
  background-color: ${(props) => (props.selected ? "#f73d93" : "none")};
  padding: 5px 16px;
  flex: 1;
  /* border-radius: 16px; */
  font-weight: bold;
  cursor: pointer;
`;

export default NavLink;
