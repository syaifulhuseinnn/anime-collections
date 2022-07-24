import styled from "@emotion/styled";

type ButtonProps = {
  bottomRight?: boolean;
  circle?: boolean;
};

const Button = styled.button<ButtonProps>`
  background-color: #f73d93;
  padding: ${(props) => (props.circle ? `16px` : `6px 12px`)};
  border: 1px solid #f73d93;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 400;
  line-height: 1.5;
  border-radius: ${(props) => (props.circle ? `50%` : `0`)};
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  display: ${(props) => (props.circle ? `block` : `inline-block`)};
  cursor: pointer;

  ${(props) =>
    props.circle && {
      width: "62px",
      height: "62px",
    }}

  ${(props) =>
    props.bottomRight && {
      position: "fixed",
      bottom: "16px",
      right: "16px",
    }}

  &:hover {
    /* color: var(--bs-btn-active-color); */
    background-color: #f10086;
    border-color: #f73d93;
  }

  &:focus {
    /* color: var(--bs-btn-hover-color); */
    background-color: #f473b9;
    border-color: #f473b9;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(244, 115, 185, 0.5);
  }

  &:active {
    /* color: var(--bs-btn-active-color); */
    background-color: #f473b9;
    border-color: #f473b9;
  }
`;

export default Button;