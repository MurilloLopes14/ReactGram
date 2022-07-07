//Styles
import { HomeStyle, NoPhotosContainer } from "./HomeStyle";

//Components
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";
import { Message } from "../../components/Message/Message";
import { Link } from "react-router-dom";
import { LikeContainer } from "../../components/LikeContainer/LikeContainer";

//Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

//redux
import { getAllPhotos, like } from "../../slices/photoSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  //Load photo
  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  //like photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <h1>Carregando . . .</h1>;
  }

  return (
    <HomeStyle>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link to={`/photos/${photo._id}`} className="btn">
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <NoPhotosContainer>
          <h2>
            Ainda não há fotos publicadas,{" "}
            <Link to={`/users/${user._id}`}>
              Clique aqui para adicionar uma foto
            </Link>
          </h2>
        </NoPhotosContainer>
      )}
    </HomeStyle>
  );
};
