import "./footer.scss";
import { defaultDEducationLogo } from "@app/const/common.const";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
export function Footer() {
  return (
    <div className="auth-wrap">
      <div className="de-auth-row">
        <div className="de-auth-first-row">
          <div className="de-logo-wrap">
            <img className="de-logo" src={defaultDEducationLogo} />
            <div className="de-headline">DEducation</div>
          </div>
          <div className="de-normalline">
            DEducation is an online platform that helps
          </div>
          <div className="de-normalline">users to store your achive</div>
          <div className="de-icon-links">
            <FacebookIcon />
            <YouTubeIcon />
            <TwitterIcon />
            <InstagramIcon />
          </div>
        </div>
        <div className="auth-footer">
          <div className="de-footer-column">
            <div className="de-headline">LINKS</div>
            <div className="de-normalline">About</div>
            <div className="de-normalline">Accessibility</div>
            <div className="de-normalline">User Agreement</div>
          </div>
          <div className="de-footer-column">
            <div className="de-headline">INFORMATIONS</div>
            <div className="de-normalline">Privacy Policy</div>
            <div className="de-normalline">Cookie Policy</div>
            <div className="de-normalline">Copyright Policy</div>
          </div>
          <div className="de-footer-column">
            <div className="de-headline">HELPS</div>
            <div className="de-normalline">Brand Policy</div>
            <div className="de-normalline">Guest Controls</div>
            <div className="de-normalline">Community Guidelines</div>
          </div>
        </div>
      </div>
      <div className="de-footer-end">
        Powered by DoNothing © 2023. All Rights Reserved.
      </div>
    </div>
  );
}
