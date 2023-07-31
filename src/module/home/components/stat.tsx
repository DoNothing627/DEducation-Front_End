import { myProfile } from "@app/api/user/my-profile";
import { useSession } from "@app/hooks/session";
import { useEffect, useState } from "react";
import {
  defaultWinnerBagde,
  defaultExcenllentBagde,
} from "@app/const/common.const";
import { defaultFrame } from "@app/const/common.const";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WalletIcon from "@mui/icons-material/Wallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ScoreIcon from "@mui/icons-material/Score";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SchoolIcon from "@mui/icons-material/School";
import "./stat.scss";
import { SmallClassroomCard } from "@app/module/classrooms/small-classroom-card";
import {
  hustBanner,
  harvardBanner,
  stanfordBanner,
  mitBanner,
  cambridgeBanner,
} from "@app/const/common.const";
import { ModalPortal } from "@app/module/modal";
import { useRouter } from "next/router";

interface UserInfo {
  wallet: string;
  username: string;
  date_of_birth: string;
  role: string;
  school: string;
}

export function Stat() {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  // const [openModalScoreBoard, setOpenModalScoreBoard] = useState(0);
  const [openModalDiploma, setOpenModalDiploma] = useState(0);
  const router = useRouter();

  useEffect(() => {
    myProfile().subscribe((res) => {
      if (res.data) {
        setUserInfo(res.data);
      }
    });
  }, []);

  const onHandleToClass = () => {
    router.push("/classrooms")
  }

  const handleOpenScoreBoard = () => {
    // setOpenModalScoreBoard(1);
    router.push("/transcripts");
  };

  const handleOpenDiploma = () => {
    setOpenModalDiploma(1);
  };

  // const handleCloseScoreBoard = () => {
  //   setOpenModalScoreBoard(0);
  // };

  const handleCloseDiploma = () => {
    setOpenModalDiploma(0);
  };

  return (
    <>
      {/* {openModalScoreBoard == 1 && (
        <ModalPortal close={handleCloseScoreBoard} />
      )} */}
      {openModalDiploma == 1 && <ModalPortal close={handleCloseDiploma} />}
      <div className="de-stat-container">
        <div className="de-limit-width-stat">
          <div className="de-hightlight-link">
            <div>Home</div>
            <div> {">"} </div>
            <div> Profile</div>
          </div>
          <div className="de-content-wrap">
            <div className="de-main-info">
              <div className="de-avatar-place">
                <img className="de-avatar-frame" src={defaultFrame} />
                <img
                  className="de-stat-avatar"
                  src="https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/code-learn/user-default.svg"
                />
              </div>
              <div className="de-username">DoNothing</div>
              <div className="de-line" />
              <div className="de-under-block">
                <div className="de-title-block">INFORMATION</div>
                <div className="de-detail-block">
                  <EmailIcon /> - andxh58chn@gmail.com
                </div>
                <div className="de-detail-block">
                  <PhoneIcon /> -
                </div>
                <div className="de-detail-block de-wallet-address">
                  <WalletIcon /> - 0xc8DdF95448E76709fcd...
                  <span className="tooltiptext">
                    Click to copy to clipboard
                  </span>
                </div>
                <div className="de-detail-block">
                  <CalendarMonthIcon /> - 27/6/2001
                </div>
              </div>
              <div className="de-line" />
              <div className="de-under-block">
                <div className="de-title-block">
                  EDUCATION <KeyboardArrowDownIcon />
                </div>
                <div className="de-detail-block">
                  <SchoolIcon /> - MIT
                </div>
              </div>
              <div className="de-line" />
              <div className="de-under-block">
                <div className="de-title-block">
                  EXPERIENCE <KeyboardArrowDownIcon />
                </div>
              </div>
              {/* <div className="de-line" />
            <div className="de-under-block">
            <div className="de-title-block">
            ACHIVEMENT <KeyboardArrowDownIcon />
            </div>
          </div> */}
              <div className="de-line" />
              <div className="de-under-block">
                <div className="de-title-block">
                  CERTIFICATE <KeyboardArrowDownIcon />
                </div>
                <div
                  className="de-certificate de-detail-block"
                  onClick={handleOpenScoreBoard}>
                  <ScoreIcon />- Score board
                </div>
                <div
                  className="de-certificate de-detail-block"
                  onClick={handleOpenDiploma}>
                  <CardMembershipIcon /> - Diploma
                </div>
              </div>
            </div>
            <div className="de-side-info">
              <div className="de-class-block">
                <div className="de-class-block-title">
                  CLASS <DoubleArrowIcon className="de-icon" onClick={onHandleToClass}/>
                </div>
                <div className="de-class-list">
                  <SmallClassroomCard
                    _id={"1"}
                    subject={"Block-chain"}
                    code={"BC"}
                    image={1}
                    teacher_name={""}
                    teacher_wallet={""}
                  />
                  <SmallClassroomCard
                    _id={"1"}
                    subject={"Artifical Intelligence"}
                    code={"BC"}
                    image={2}
                    teacher_name={""}
                    teacher_wallet={""}
                  />
                </div>
              </div>
              <div className="de-school-block">
                <img src={mitBanner} className="de-school-logo" />
                <div className="de-school-info">
                  <div className="de-school-title">
                    MASSACHUSETTS INSTITUTE of TECHNOLOGY
                  </div>
                  <div className="de-school-code">MIT</div>
                  <div className="de-school-address">
                    0xda0fcF22DaF51093aF7951EB1E5E468723C7C64F
                  </div>
                </div>
              </div>
              <div className="de-discussion-block">
                <div className="de-discussion-block-title">DISCUSSION</div>
                <div className="de-discussion-content">
                  <div className="de-upper-row">
                    <div className="de-topic">
                      <div className="de-circle">
                        <AddIcon className="de-icon" />
                      </div>
                      <div className="de-title">
                        <div className="de-number">0</div>
                        <div>Topic</div>
                      </div>
                    </div>
                    <div className="de-vote">
                      <div className="de-circle">
                        <CheckIcon className="de-icon" />
                      </div>
                      <div className="de-title">
                        <div className="de-number">0</div>
                        <div>Vote</div>
                      </div>
                    </div>
                  </div>
                  <div className="de-lower-row">
                    <div className="de-like">
                      <div className="de-circle">
                        <ThumbUpIcon className="de-icon" />
                      </div>
                      <div className="de-title">
                        <div className="de-number">0</div>
                        <div>Like</div>
                      </div>
                    </div>
                    <div className="de-comment">
                      <div className="de-circle">
                        <CommentIcon className="de-icon" />
                      </div>
                      <div className="de-title">
                        <div className="de-number">0</div>
                        <div>Comment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
