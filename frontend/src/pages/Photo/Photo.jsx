//Utils
import { uploads } from "../../utils/config";

//Styles
import { Comments, PhotoStyle } from "./PhotoStyle";

//Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

//Components
import { Message } from "../../components/Message/Message";
import { Link } from "react-router-dom";
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";

//Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import { LikeContainer } from "../../components/LikeContainer/LikeContainer";

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState("");

  //Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //Insert Like
  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  //Inser Comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));
    setCommentText("");
    resetMessage();
  };

  if (loading) {
    return <h1>Carregando . . .</h1>;
  }

  return (
    <PhotoStyle>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="messageContainer"></div>
      <Comments className="comments">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira o seu comentário . . ."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Commentar" />
            </form>
            {photo.comments.length === 0 && (
              <p>Não há comentários nesta foto por enquanto.</p>
            )}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    {comment.userName} :
                  </Link>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </Comments>
    </PhotoStyle>
  );
};
