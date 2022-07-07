import styled from "styled-components";

export const NavBarStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: #000;
  border-bottom: 1px solid #363636;
  padding: 0.1em 1em;
`;

export const SearchForm = styled.form`
  position: relative;
  width: 20%;

  & svg {
    position: absolute;
    top: 10px;
    left: 9px;
    color: var(--icons);
  }

  & input {
    padding-left: 2.5em;
    border: none;
    border-radius: 5px;
    width: 100%;
    margin: 0;
    outline: none;
    cursor: text;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  & li {
    margin-right: 1em;
  }

  & span {
    cursor: pointer;
  }

  & a.active svg {
    color: var(--light);
  }

  & svg {
    font-size: 1.5em;
    color: var(--icons);
  }
`;
