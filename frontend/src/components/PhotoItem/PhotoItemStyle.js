import styled from "styled-components";

export const PhotoItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & a {
    font-size: 1.5em;
    font-weight: 700;
    letter-spacing: 1px;
    transition: 0.4s;
    margin: 0.5em;
  }
  & a:hover {
    color: #2323a1;
    text-decoration: underline;
  }

  & img {
    width: 100%;
  }

  & h2 {
    margin: 0.3em;
  }
`;

export const HomePhotoItemStyle = styled.div`
  & h2 {
    margin-bottom: 0.2em;
  }
`;
export const PhotoAuthor = styled.div`
  text-align: left;

  & a {
    font-weight: 700;
    transition: all 0.4s;
  }

  & a:hover {
    color: #2323a1;
    text-decoration: underline;
  }
`;
