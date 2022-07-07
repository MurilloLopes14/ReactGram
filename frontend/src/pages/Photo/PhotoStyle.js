import styled from "styled-components";

export const PhotoStyle = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 2em;

  & .messageContainer {
    margin: 0.2em;
  }

  & img {
    width: 70%;
  }
`;

export const MessageContainer = styled.div`
  margin: 1em 0;
`;

export const Comments = styled.div`
  text-align: left;

  & form {
    margin-bottom: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid #363636;
  }

  & .comment {
    display: flex;
  }

  & .author {
    display: flex;
    align-items: center;

    & a {
      font-weight: 700;
      transition: 0.4s;
      color: var(--gray);
    }

    & a:hover {
      color: #2323a1;
      text-decoration: underline;
    }

    & p {
      margin-left: 0.3em;
    }
    & img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 1em;
      margin: 0.2em;
    }
  }
`;
