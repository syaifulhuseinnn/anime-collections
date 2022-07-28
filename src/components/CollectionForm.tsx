import styled from "@emotion/styled";
import media from "../theme/media";

const CollectionForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* padding: 16px; */

  ${media.min.large} {
    flex-direction: row;
  }

  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${media.min.large} {
      min-height: 70px;
    }

    .error-message {
      color: red;
    }

    .success-message-desktop {
      color: #3ccf4e;
      display: none;

      ${media.min.large} {
        display: block;
      }
    }
  }

  .button {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .success-message-mobile {
      color: #3ccf4e;

      ${media.min.large} {
        display: none;
      }
    }
  }
`;

export default CollectionForm;
