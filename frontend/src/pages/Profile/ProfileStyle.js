import styled from "styled-components";

export const ProfileStyle = styled.div`
  width: 50%;
  margin: 0 auto;

  & .user-photos {
    margin-bottom: 200px;
  }

  & .profile-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em;
    border-bottom: 1px solid #363636;
  }

  & .profile-header img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 2em;
  }

  & .container {
    display: flex;
    flex-wrap: wrap;

    & .photo {
      width: 32%;
      margin: 0.3%;

      & img {
        width: 100%;
      }

      & .seeMore {
        margin-top: 0.5em;
      }
    }
  }

  & .actions {
    display: flex;
    justify-content: space-around;
    padding: 10px;

    & svg {
      cursor: pointer;
    }
  }

  & .edit-photo {
    margin-bottom: 1em;

    & img {
      width: 100%;
      margin-bottom: 1em;
    }
  }
`;

export const NewPhoto = styled.div`
  padding: 1em;
  border-bottom: 1px solid #363636;

  & .subtitle {
    font-weight: 600;
    color: var(--gray);
    cursor: default;
  }
`;

export const EditPhoto = styled.div`
  & img {
    max-width: 300px;
    max-height: 300px;
    margin: 10px;
    border-radius: 5px;
  }
`;
