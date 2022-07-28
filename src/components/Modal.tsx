import React, { useContext } from "react";
import styled from "@emotion/styled";
import media from "../theme/media";
import { Context } from "../context/store";

type ModalBackdropProps = {
  showModal: boolean;
};

type ModalProps = {
  modalTitle: string;
  children: React.ReactNode;
};

const ModalBackdrop = styled.div<ModalBackdropProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  /* overflow: auto; */
  z-index: 1;
  display: ${(props) => (props.showModal ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ModalContent = styled.div`
  background-color: #2c3333;
  margin: auto;
  padding: 16px;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  border-top: 2px solid var(--pink);

  ${media.min.large} {
    max-width: 80%;
    max-height: 80%;
    width: 45%;
    height: auto;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .heading {
    align-self: center;
    margin: 0;
  }

  .close {
    color: var(--white);
    font-size: 30px;
    font-weight: bold;
    align-self: flex-end;
    background-color: #ffc600;
    text-align: center;
    width: 35px;
    height: 35px;

    &:hover,
    &:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

const ModalBody = styled.div`
  padding: 16px 0;
`;

export default function Modal(props: ModalProps) {
  const { state, dispatch } = useContext(Context);
  const { addToCollection } = state.modals;
  const { modalTitle, children } = props;
  return (
    <ModalBackdrop showModal={addToCollection}>
      <ModalContent>
        <ModalHeader>
          <span
            className="close"
            onClick={() => dispatch({ type: "HIDE_MODAL_ADD_TO_COLLECTION" })}
          >
            &times;
          </span>
          <h1 className="heading">{modalTitle}</h1>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
}
