import styled from "@emotion/styled";

const CollectionForm = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;

  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .error-message {
      color: red;
    }

    .success-message {
      color: #3ccf4e;
    }
  }
`;

export default CollectionForm;
