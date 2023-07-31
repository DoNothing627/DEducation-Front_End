import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from '@mui/icons-material/Warning';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import "./index.scss";
import { getTranscriptForStudent } from "@app/smart-contract/get-transcript-for-student";
import { useState } from "react";

interface ModalProps {
  close: () => void;
  transcript_hashcode?: string;
  tx_hash?: string;
  classroomId?: string;
  studentAddress?: string;
}

export function ModalPortal(props: ModalProps) {
  const [isValid, setIsValid] = useState(true);
  const [isLoanding, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    props.close();
  };

  const handleVerifyButton = async () => {
    setIsLoading(true);
    const onChainData = await getTranscriptForStudent("", props?.studentAddress || "", props?.classroomId || "");
    setIsLoading(false);
    if(onChainData != props?.transcript_hashcode) setIsValid(false); 
    else setIsValid(true);
  }

  return (
    <>
      <div className="de-modal-portal">
        <div className="de-modal-wrapper">
          <div className="de-left-side">
            <div className="de-title">DEducation</div>
            <div className="de-valid-infor-title">THIS TRANSCRIPT IS</div>
            {isLoanding == true && <AutorenewIcon/> }
            {isValid == true && <div className="de-valid-infor">
              VALID <CheckCircleIcon />
            </div>}
            {isValid == false && <div className="de-invalid-infor">
              INVALID <WarningIcon />
            </div>}
            {/* <div>University</div>
            <div>Hanoi Univeristy of Science and Technology</div>
            <div>Reciver</div>
            <div>Dao Xuan An</div> */}
            <button className="de-service-button">
              <a href={props?.tx_hash || "https://sepolia.etherscan.io/address/0xd2ae70ec8857d92156bd837dc5aa86dd99b27eb8"} target="blank">
                SEE TRANSACTION
              </a>
            </button>
            <button className="de-service-button" onClick={handleVerifyButton}>VERIFY TRANSCRIPT</button>
            <button className="de-service-button">SYNC TRANSCRIPT</button>
          </div>
          <div className="de-right-side">
            <object
              data={
                props.transcript_hashcode ||
                "https://ipfs-2.thirdwebcdn.com/ipfs/QmcJVfRAdebDBpvTG6vYUYUGnpq7TNXvk97bvHTLdXdSK8/0"
              }
              className="de-certificate"
            />
            <div>
              <button className="de-close-button" onClick={handleCloseModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
