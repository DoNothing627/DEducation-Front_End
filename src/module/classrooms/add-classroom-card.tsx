import { defaultPlusSign } from "@app/const/common.const";
import "./add-classroom-card.scss";

interface AddClassroomCardProps {}

export function AddClassroomCard(props: AddClassroomCardProps) {
  return (
    <>
      <div className="add-classroom-card">
        <img className="de-plus-sign" src={defaultPlusSign} />
      </div>
    </>
  );
}
