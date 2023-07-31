import { defaultDEducationLogo } from "@app/const/common.const";
import { useSession } from "@app/hooks/session";
import { redirectToLogin } from "@app/services/auth";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  // const [role, setRole] = useState("");
  const { userInfo } = useSession();

  // useEffect(() => {
  //   setRole(localStorage.getItem("user_role") as string);
  //   console.log("role", role);
  // });

  const handleLogout = () => {
    redirectToLogin();
  };

  return (
    <>
      <div className="home-page">
        <div className="navigation">
          <img className="navigation-image" src={defaultDEducationLogo} />
          <div className="navigation-tile">DEducation</div>
          {userInfo?.role == "2" && (
            <div
              className="navigation-object"
              onClick={() => router.push("/home")}
              style={{
                color: pathname == "/home" ? "rgb(127, 99, 54)" : "#C0C0C0",
              }}>
              Home
            </div>
          )}
          {/* <div
            className="navigation-object"
            onClick={() => router.push("/transcripts")}
            style={{ color: pathname == "/transcripts" ? "#F99" : "#C0C0C0" }}>
            Transcript
          </div> */}
          {/* <div
            className="navigation-object"
            onClick={() => router.push("/relationships")}
            style={{
              color:
                pathname == "/relationships" ? "rgb(127, 99, 54)" : "#C0C0C0",
            }}>
            Relationship
          </div> */}
          {(userInfo?.role == "1" || userInfo?.role == "2") && (
            <div
              className="navigation-object"
              onClick={() => router.push("/classrooms")}
              style={{
                color:
                  pathname == "/classrooms" ? "rgb(127, 99, 54)" : "#C0C0C0",
              }}>
              Classroom
            </div>
          )}
          {userInfo?.role == "2" && (
            <div
              className="navigation-object"
              onClick={() => router.push("/transcripts")}
              style={{
                color:
                  pathname == "/transcripts" ? "rgb(127, 99, 54)" : "#C0C0C0",
              }}>
              Transcripts
            </div>
          )}
          {userInfo?.role == "3" && (
            <div
              className="navigation-object"
              onClick={() => router.push("/schools")}
              style={{
                color: pathname == "/schools" ? "rgb(127, 99, 54)" : "#C0C0C0",
              }}>
              Schools
            </div>
          )}
          {userInfo?.role == "0" && (
            <div
              className="navigation-object"
              onClick={() => (window.location.href = `/`)}
              style={{
                color: pathname == "/students" ? "rgb(127, 99, 54)" : "#C0C0C0",
              }}>
              Students
            </div>
          )}
        </div>
        <div className="de-login-button" onClick={handleLogout}>
          LOGOUT
        </div>
      </div>
    </>
  );
}
