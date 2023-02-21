import { myProfile } from "@app/api/user/my-profile";
import { useSession } from "@app/hooks/session";
import { useEffect, useState } from "react";
import {
  defaultWinnerBagde,
  defaultExcenllentBagde,
} from "@app/const/common.const";

interface UserInfo {
  wallet: string;
  username: string;
  date_of_birth: string;
  role: string;
  school: string;
}

export function Stat() {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  useEffect(() => {
    myProfile().subscribe((res) => {
      if (res.data) {
        setUserInfo(res.data);
      }
    });
  }, []);

  return (
    <div className="stat-container">
      <div className="stat-content">
        <div className="stat-title">
          Hello {userInfo?.username}. Welcome to DEducation. Let's start to
          explore more!
        </div>
        <div className="main-content">
          <div className="stat-card">
            <div className="stat-info">
              <img
                className="stat-avatar"
                src="https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/code-learn/user-default.svg"
              />
              <div className="stat-username">{userInfo?.username}</div>
            </div>
            <div className="stat-school">
              <div className="field-name">School:</div> {userInfo.school}
            </div>
            {/* <div className="stat-semester">Semester: 2022.1</div> */}
            <div className="stat-semester">
              <div className="field-name">Wallet Address:</div>{" "}
              {userInfo.wallet}
            </div>
            <div className="stat-semester">
              <div className="field-name">Date of Birth:</div>{" "}
              {userInfo.date_of_birth}
            </div>
          </div>
          <div className="stat-infomation">
            <div className="stat-bagde">
              <div className="stat-bagde-title">Your Bagdes</div>
              <div className="stat-badge-collection">
                <img className="stat-bagde" src={defaultWinnerBagde} />
                <img className="stat-bagde" src={defaultExcenllentBagde} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
