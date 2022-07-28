import styled from "@emotion/styled";
import media from "../theme/media";

export const Jumbotron = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;

  ${media.min.large} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .title {
    padding: 16px;
  }

  .tagline {
    font-size: 32px;

    ${media.min.large} {
      font-size: 60px;
    }

    span {
      color: #f73d93;
    }
  }

  ${media.min.large} {
    .tagline-description {
      flex-basis: 70%;
    }
  }
`;

export default function JumbotronDefault() {
  return (
    <Jumbotron>
      <div className="tagline">
        <h1>
          You can <span style={{ color: `var(--pink)` }}>explore</span> all
          <span style={{ color: `var(--pink)` }}> anime</span> on here
        </h1>
      </div>
      <div className="tagline-description">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
          dignissimos excepturi accusantium eum eaque, tempore natus omnis.
          Voluptatem expedita veniam rem, molestias amet cupiditate quisquam
          rerum sequi repellat maxime perferendis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          dolore ut, doloremque cum temporibus facere mollitia beatae quidem et
          atque?
        </p>
      </div>
    </Jumbotron>
  );
}
