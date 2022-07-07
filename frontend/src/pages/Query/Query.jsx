//Styles
import { QueryStyle, NoPhotosContainer } from "./QueryStyle";

//Components
import { LikeContainer } from "../../components/LikeContainer/LikeContainer";
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

//redux
import { searchPhotos, like } from "../../slices/photoSlice";

//Hooks
import { useQuery } from "../../Hooks/useQuery";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

export const Query = () => {
  const query = useQuery();

  const search = query.get("q");

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  //like photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <h1>Carregando . . .</h1>;
  }

  return (
    <QueryStyle>
      <h2>Você está buscando por: {search}</h2>
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
            Não foram encontrados resultados para a sua busca
            <Link to={`/users/${user._id}`}>
              Clique aqui para adicionar uma foto
            </Link>
          </h2>
        </NoPhotosContainer>
      )}
    </QueryStyle>
  );
};
