import { GetMyClassroomResponseDTO } from "@app/api/classroom/get-my-classroom";
import { hustBanner, harvardBanner, stanfordBanner, mitBanner, cambridgeBanner } from "@app/const/common.const";
import { useRouter } from "next/router";
import "./school-card.scss";

export function SchoolCard(props: GetMyClassroomResponseDTO) {
  const router = useRouter();
  var classImage;
  if (props.image == 1) classImage = hustBanner;
  if (props.image == 2) classImage = harvardBanner;
  if (props.image == 3) classImage = stanfordBanner;
  if (props.image == 4) classImage = mitBanner;
  if (props.image == 5) classImage = cambridgeBanner;

  const onHandleClickSchools = () => {
    router.push(`/students/${props._id}`);
  };

  return (
    <>
      <div className="school-card" onClick={onHandleClickSchools}>
        <img className="de-image-card" src={classImage} />
        <div className="field-name-subject">{props.subject}</div>
        <div className="field-name-code">{props.code}</div>
      </div>
    </>
  );
}
