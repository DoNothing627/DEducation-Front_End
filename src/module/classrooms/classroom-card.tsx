import { GetMyClassroomResponseDTO } from "@app/api/classroom/get-my-classroom";
import {
  classAIBanner,
  classBlockchainBanner,
  classIoTBanner,
  classWebBanner,
  classSercurityBanner,
} from "@app/const/common.const";
import { useRouter } from "next/router";
import "./classroom-card.scss";

export function ClassroomCard(props: GetMyClassroomResponseDTO) {
  const router = useRouter();
  var classImage;
  if (props.image == 1) classImage = classBlockchainBanner;
  if (props.image == 2) classImage = classAIBanner;
  if (props.image == 3) classImage = classIoTBanner;
  const onHandleClickClassroom = () => {
    router.push(`/classroom/${props._id}`);
  };

  return (
    <>
      <div className="classroom-card" onClick={onHandleClickClassroom}>
        <img className="de-image-card" src={classImage} />
        <div className="field-name-subject">{props.subject}</div>
        <div className="field-name-code">{props.code}</div>
        {/* <div className="field-name-teacher">{props?.teacher_name}</div> */}
        {/* <div className="field-name-wallet">{props?.teacher_wallet}</div> */}
      </div>
    </>
  );
}
