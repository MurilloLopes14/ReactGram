//Components
import { NavLink, Link } from "react-router-dom";

//Styles
import { NavBarStyle, SearchForm, NavLinks } from "./NavBarStyle";

//icons
import { ImSearch, ImCamera } from "react-icons/im";
import { BsHouseDoorFill, BsPersonCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

//Hooks
// import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Redux
import { logout, reset } from "../../slices/authSlice";

export const NavBar = () => {
  const { auth } = useAuth();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [query, setQuery] = useState();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <NavBarStyle>
      <Link to="/">ReactGram</Link>
      <SearchForm onSubmit={handleSearch}>
        <ImSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
          value={query || ""}
        />
      </SearchForm>
      <NavLinks>
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <ImCamera />
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/profile">
                <BsPersonCircle />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>
                <BiLogOut />
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register"> Cadastrar</NavLink>
            </li>
          </>
        )}
      </NavLinks>
    </NavBarStyle>
  );
};
