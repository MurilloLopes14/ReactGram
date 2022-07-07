//Utils

//Styles
import { LikeStyle } from "./LikeContainerStyle";

//Icons
import { FiHeart } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";

export const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <LikeStyle>
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsSuitHeartFill />
          ) : (
            <FiHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} Like(s)</p>
        </>
      )}
    </LikeStyle>
  );
};
