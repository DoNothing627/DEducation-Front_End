import { GetMyRelationShipResponseDTO } from "@app/api/relationship/get-my-relationship";
import { defaultHustLogo } from "@app/const/common.const";
import "./school-card.scss";

export function SchoolCard(props: GetMyRelationShipResponseDTO) {
  return (
    <>
      <div className="de-school-stat-card">
        <div className="de-stat-school-info">
          <img className="de-stat-school-avatar" src={defaultHustLogo} />
          <div className="de-school-detail-block">
            <div className="de-school-stat-name">{props.username}</div>
            <div className="de-school-wallet">{props.wallet}</div>
          </div>
        </div>
      </div>
    </>
  );
}
