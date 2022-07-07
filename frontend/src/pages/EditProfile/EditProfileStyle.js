import styled from "styled-components";

export const EditPofileStyle = styled.div`
  border: 1px solid #363636;
  background-color: var(--black);
  padding: 1.5em 2em;
  max-width: 40%;
  margin: 2em auto;
  text-align: center;

  & .subtitle {
    color: var(--gray);
  }

  & .profile-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 1em;
  }
`;
