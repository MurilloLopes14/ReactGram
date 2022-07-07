//Imports

//Styles
import "./App.css";

//Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Hooks
import { useAuth } from "./Hooks/useAuth";

//Components
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";

//Pages
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import { Profile } from "./pages/Profile/Profile";
import { Photo } from "./pages/Photo/Photo";
import { Query } from "./pages/Query/Query";

function App() {
  const { loading, auth } = useAuth();

  if (loading) {
    return <h1>Carregando . . .</h1>;
  }

  return (
    <>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={auth ? <Query /> : <Navigate to="/login" />}
            />
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            />

            <Route
              path="login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
