import styled from "styled-components";

export const LikeStyle = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #363636;
  border-bottom: 1px solid #363636;

  & svg {
    font-size: 1.5em;
    cursor: pointer;
    margin: 0.4em;
  }

  & p {
    margin-left: 1em;
  }
`;

export const HomeLikeStyle = styled.div`
  border: none;
`;
