//Utils
import { uploads } from "../../utils/config";

//Styles
import { PhotoAuthor, PhotoItemStyle } from "./PhotoItemStyle";

//Hooks

import { useSelector } from "react-redux";

//Components
import { Link } from "react-router-dom";

export const PhotoItem = ({ photo }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <PhotoItemStyle>
      <Link to={`/users/${user._id}`}>Voltar</Link>
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
      <h2>{photo.title}</h2>
      <PhotoAuthor>
        Publicado por:{" "}
        <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
      </PhotoAuthor>
    </PhotoItemStyle>
  );
};
