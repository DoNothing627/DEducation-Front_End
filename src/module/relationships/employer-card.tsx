import { GetMyRelationShipResponseDTO } from "@app/api/relationship/get-my-relationship";
import "./employer-card.scss";

export function EmployerCard(props: GetMyRelationShipResponseDTO) {
  return (
    <>
      <div className="de-employer-stat-card">
        <div className="stat-info">
          <img
            className="stat-avatar"
            src="https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/code-learn/user-default.svg"
          />
          <div className="de-employer-stat-username">{props.username}</div>
        </div>
        <div className="de-employer-stat-school">
          <div className="de-employer-field-name">Company:</div> FPT Software
        </div>
        {/* <div className="stat-semester">Semester: 2022.1</div> */}
        <div className="de-employer-stat-semester">
          <div className="de-employer-field-name">Wallet Address:</div>
          {props.wallet}
        </div>
        <div className="de-employer-stat-semester">
          <div className="de-employer-field-name">Date of Birth:</div> 1/1/1990
        </div>
      </div>
    </>
  );
}
