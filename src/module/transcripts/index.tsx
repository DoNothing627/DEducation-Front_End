import { useEffect, useState } from "react";
import "./index.scss";
import { ModalPortal } from "../modal";
import {
  GetUserTranscriptResponseDTO,
  getMyAllTranscript,
} from "@app/api/academy-transcript/get-user-transcript";
import {
  myPublicStatus,
  updateMyPublicStatus,
} from "@app/api/user/public-status";

export function Transcripts() {
  const [isPublished, setIsPublished] = useState(false);
  const [isOpenModalTranscript, setIsOpenModalTranscript] = useState(false);
  const [transcriptHashcode, setTranscriptHashcode] = useState("");
  const [transcriptTxHash, setTranscriptTxHash] = useState("");
  const [transcripts, setTranscripts] = useState<
    GetUserTranscriptResponseDTO[]
  >([]);
  const handleOpenTranscript = (
    transcript_hashcode: string,
    transcript_txhash: string
  ) => {
    setTranscriptHashcode(transcript_hashcode);
    setTranscriptTxHash(`https://sepolia.etherscan.io/tx/${transcript_txhash}`);
    setIsOpenModalTranscript(true);
  };
  const handleCloseTranscript = () => {
    setIsOpenModalTranscript(false);
  };

  const onHandleChangePublicStatus = () => {
    updateMyPublicStatus().subscribe((res) => {
      if (res.data) {
        console.log("update", res.data);
        setIsPublished(res.data.public_status);
      }
    });
  };

  useEffect(() => {
    getMyAllTranscript().subscribe((res) => {
      if (res.data) {
        setTranscripts(res.data);
        console.log("transcripts", res.data);
      }
    });
    myPublicStatus().subscribe((res) => {
      if (res.data) {
        setIsPublished(res.data.public_status);
        console.log("public status", isPublished);
      }
    });
  }, []);

  return (
    <>
      {isOpenModalTranscript == true && (
        <ModalPortal
          close={handleCloseTranscript}
          transcript_hashcode={transcriptHashcode}
          tx_hash={transcriptTxHash}
        />
      )}
      <div className="de-transcripts-container">
        <div className="de-transcripts-banner">
          <div className="de-hightlight-link">
            <div>Home</div>
            <div> {">"} </div>
            <div> Transcripts</div>
          </div>
          {/* <select className="de-selection">
            {semesterOptions.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select> */}
          {/* <div className="de-service-area">
            <input className="de-student-search" placeholder="Student ID"/>
            <span className="hiddenFileInput">
              <input type="file" name="theFile" />
            </span>
            <button className="de-service-button">Update</button>
          </div> */}
          {/* <label className="toggle">
            <input
              className="toggle-checkbox"
              type="checkbox"
              checked={isPublished}
              onChange={onHandleChangePublicStatus}
            />
            <div className="toggle-switch"></div>
          </label> */}

          {/* <div className="toggle-button-cover"> */}
          {/* <div className="button-cover"> */}
          <div className="button r" id="button-4">
            <input
              type="checkbox"
              className="checkbox"
              checked={isPublished}
              onChange={onHandleChangePublicStatus}
            />
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
        <div className="de-transcripts-wrap">
          <table>
            <thead>
              <tr>
                <th className="de-head-sharp">
                  <div className="ds-sharp">#</div>
                </th>
                <th className="de-head-semester">Semester</th>
                <th className="de-head-name">Subject</th>
                <th className="de-head-name">Mark</th>
                <th className="de-head-name">Professor</th>
                <th className="de-head-address">Professor Address</th>
                <th className="de-head-transcript">Transcript</th>
              </tr>
            </thead>
            <tbody>
              {transcripts.map((transcript, index) => (
                <tr>
                  <td className="de-body-sharp">{index + 1}</td>
                  <td className="de-body-semester">2022.2</td>
                  <td className="de-body-name">{transcript.subject}</td>
                  <td className="de-body-name">{transcript.mark}</td>
                  <td className="de-body-name">{transcript.teacher_name}</td>
                  <td className="de-body-address">
                    {transcript.teacher_address?.slice(0, 12) + "..."}
                  </td>
                  <td className="de-body-transcript">
                    <button
                      onClick={() =>
                        handleOpenTranscript(
                          transcript.root_transcript as string,
                          transcript.tx_hash as string
                        )
                      }>
                      View Transcript
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
