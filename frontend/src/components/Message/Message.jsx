import { MessageStyle } from "./MessageStyle";

export const Message = ({ msg, type }) => {
  return (
    <MessageStyle>
      <div className={type}>
        <p>{msg}</p>
      </div>
    </MessageStyle>
  );
};
