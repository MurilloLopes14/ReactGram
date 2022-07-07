//Styles
import { EditPhoto, NewPhoto, ProfileStyle } from "./ProfileStyle";

//Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Components
import { Message } from "../../components/Message/Message";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

//Icons
import { FaEye } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";

//Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  resetMessage,
} from "../../slices/photoSlice";

//AQUI COMEÇA O COMPONENTE!!!!!!!!!!!!!!!!!!!!!!!!!
export const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  //States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  //New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  //Reset component function
  function resetComponent() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    //Build form Data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponent();
  };

  const handleFile = (e) => {
    //Image Preview
    const image = e.target.files[0];

    setImage(image);
  };

  //Delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponent();
  };

  //Show or hide forms
  const hideOrShowForm = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  //Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetComponent();
  };

  //Open edit form
  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForm();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = (e) => {
    hideOrShowForm();
  };

  if (loading) {
    return <h1>Carregando . . .</h1>;
  }

  return (
    <ProfileStyle>
      <div className="profile-header">
        {user.profileImage && (
          <>
            <img
              src={`${uploads}/users/${user.profileImage}`}
              alt={user.name}
            />
            <div className="profile-description">
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
            </div>
          </>
        )}
      </div>

      {id === userAuth._id && (
        <>
          <NewPhoto ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              <p className="subtitle">
                (OBS: Procure apenas por fotos no formato .PNG, .JPEG ou .JPG)
              </p>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde . . ." disabled />
              )}
            </form>
          </NewPhoto>
          <EditPhoto>
            <div className="hide" ref={editPhotoForm}>
              <p>Editando:</p>
              {editImage && (
                <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
              )}
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />

                <p className="subtitle">
                  (OBS: Procure apenas por fotos no formato .PNG, .JPEG ou .JPG)
                </p>
                <input type="submit" value="Atualizar" />
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancelar Edição
                </button>
              </form>
            </div>
          </EditPhoto>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}

      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <FaEye />
                    </Link>
                    <GoPencil onClick={() => handleEdit(photo)} />
                    <MdDelete onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <div className="seeMore">
                    <Link className="btn" to={`/photos/${photo._id}`}>
                      Ver
                    </Link>
                  </div>
                )}
              </div>
            ))}
          {photos.length === 0 && <h1>Ainda não há fotos publicadas</h1>}
        </div>
      </div>
    </ProfileStyle>
  );
};
