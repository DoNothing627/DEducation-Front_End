import { GetMyTranscriptsForTeacherResponseDTO } from "@app/api/academy-transcript/get-my-transcripts-for-teacher";
import {
  classAIBanner,
  classBlockchainBanner,
  classIoTBanner,
  classWebBanner,
  classSercurityBanner,
} from "@app/const/common.const";
import { getTranscriptForClass } from "@app/smart-contract/get-transcript-for-class";
import { getTranscriptForStudent } from "@app/smart-contract/get-transcript-for-student";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import "./index.scss";

export function Transcript(props: GetMyTranscriptsForTeacherResponseDTO) {
  const router = useRouter();
  const role = localStorage.getItem("user_role");

  var classImage;
  if (props.image == 1) classImage = classBlockchainBanner;
  if (props.image == 2) classImage = classAIBanner;
  if (props.image == 3) classImage = classIoTBanner;

  const onHandleClickClassroom = () => {
    router.push("/classroom/123");
  };

  const onHandleViewOffChain = () => {
    window.open(`https://ipfs.io/ipfs/${props.root_transcript}`);
  };

  const onHandleViewOnChain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    if (role == "1") {
      var root_transcript = await getTranscriptForClass(addr, props._id);
      window.open(`https://ipfs.io/ipfs/${root_transcript}`);
    }
    if (role == "2") {
      root_transcript = props.root_transcript as string;
      window.open(`https://ipfs.io/ipfs/${root_transcript}`);
    }
    // console.log(props.teacher_address, addr, props._id, "root_transcript");
  };

  return (
    <>
      {props.root_transcript && (
        <div className="de-transcript-card" onClick={onHandleClickClassroom}>
          <img className="de-image-card" src={classImage} />
          <div className="field-name-subject" onClick={onHandleViewOnChain}>
            {props.subject}
          </div>
          <div className="field-name-code">{props.code}</div>
          {/* <div className="de-button-block">
            <button
              className="de-transcript-button"
              onClick={onHandleViewOffChain}>
              VIEW OFF CHAIN
            </button>
            <button
              className="de-transcript-button"
              onClick={onHandleViewOnChain}>
              VIEW ON CHAIN
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}
