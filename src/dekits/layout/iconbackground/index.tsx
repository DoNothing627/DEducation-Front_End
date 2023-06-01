import "./iconbackground.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
export function IconBackground() {
  return (
    <div className="iconbackground-container">
      <div className="de-notiwrap">
        <NotificationsNoneIcon className="de-icon" />
      </div>
      <div className="de-chatwrap">
        <ChatBubbleOutlineIcon className="de-icon" />
      </div>
      <div className="de-supportwrap">
        <HeadsetMicIcon className="de-icon" />
      </div>
    </div>
  );
}
