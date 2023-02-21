import { GetMyRelationShipResponseDTO } from "@app/api/relationship/get-my-relationship";
import "./teacher-card.scss";

export function TeacherCard(props: GetMyRelationShipResponseDTO) {
  return (
    <>
      <div className="de-teacher-stat-card">
        <div className="stat-info">
          <img
            className="stat-avatar"
            src="https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/code-learn/user-default.svg"
          />
          <div className="de-teacher-stat-username">{props.username}</div>
        </div>
        <div className="de-teacher-stat-school">
          <div className="de-teacher-field-name">School:</div> Hanoi University
          of Science and Teachnology
        </div>
        {/* <div className="stat-semester">Semester: 2022.1</div> */}
        <div className="de-teacher-stat-semester">
          <div className="de-teacher-field-name">Wallet Address:</div>
          {props.wallet}
        </div>
        <div className="de-teacher-stat-semester">
          <div className="de-teacher-field-name">Date of Birth:</div> 22/10/2001
        </div>
      </div>
    </>
  );
}
