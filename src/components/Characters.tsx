import styled from "@emotion/styled";
import media from "../theme/media";
import { Characters as CharactersTypes } from "../types/AnimeDetailsTypes";

type CharactersProps = {
  characters: CharactersTypes;
};

const CharactersContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  .heading {
    font-size: 3rem;
    margin: 0;
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;

    ${media.min.small} {
      grid-template-columns: repeat(3, 1fr);
    }

    ${media.min.medium} {
      grid-template-columns: repeat(4, 1fr);
    }

    ${media.min.large} {
      grid-template-columns: repeat(6, 200px);
      grid-column-gap: 0;
    }
  }

  .character {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .character-img {
      max-width: 100%;
      width: 160px;
      height: auto;
    }

    .character-name {
      font-weight: 600;
    }
  }
`;

export default function Characters(props: CharactersProps) {
  const { nodes } = props.characters;
  return (
    <CharactersContainer>
      <h1 className="heading">MAIN CHARACTERS</h1>
      <div className="characters">
        {nodes.map((character) => (
          <div className="character" key={character.id}>
            <img
              src={character.image.medium}
              alt={character.name.full}
              className="character-img"
              loading="lazy"
            />
            <span className="character-name">{character.name.full}</span>
          </div>
        ))}
      </div>
    </CharactersContainer>
  );
}
