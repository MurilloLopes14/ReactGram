import styled from "styled-components";

export const MessageStyle = styled.div`
  border-radius: 5px;

  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--light);

  & .error {
    width: 100%;
    padding: 5px 10px;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f6f5cb;
  }

  & .success {
    width: 100%;
    padding: 5px 10px;
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
`;
