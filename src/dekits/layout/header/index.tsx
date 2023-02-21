import { defaultDEducationLogo } from "@app/const/common.const";
import { redirectToLogin } from "@app/services/auth";
import router, { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  const handleLogout = () => {
    redirectToLogin();
  };
  return (
    <>
      <div className="home-page">
        <div className="navigation">
          <img className="navigation-image" src={defaultDEducationLogo} />
          <div className="navigation-tile">DEducation</div>
          <div
            className="navigation-object"
            onClick={() => router.push("/home")}
            style={{
              color: pathname == "/home" ? "rgb(127, 99, 54)" : "#C0C0C0",
            }}>
            Home
          </div>
          {/* <div
            className="navigation-object"
            onClick={() => router.push("/transcripts")}
            style={{ color: pathname == "/transcripts" ? "#F99" : "#C0C0C0" }}>
            Transcript
          </div> */}
          <div
            className="navigation-object"
            onClick={() => router.push("/relationships")}
            style={{
              color:
                pathname == "/relationships" ? "rgb(127, 99, 54)" : "#C0C0C0",
            }}>
            Relationship
          </div>
          <div
            className="navigation-object"
            onClick={() => router.push("/classrooms")}
            style={{
              color: pathname == "/classrooms" ? "rgb(127, 99, 54)" : "#C0C0C0",
            }}>
            Classroom
          </div>
        </div>
        <div className="de-login-button" onClick={handleLogout}>
          LOGOUT
        </div>
      </div>
    </>
  );
}
