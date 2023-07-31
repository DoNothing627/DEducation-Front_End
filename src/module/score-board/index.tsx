import { useEffect, useState } from "react";
import "./index.scss";
import { ModalPortal } from "../modal";
import {
  GetUserTranscriptResponseDTO,
  getAllTranscriptOfAnUser,
  getMyAllTranscript,
} from "@app/api/academy-transcript/get-user-transcript";
import { useRouter } from "next/router";
import { useSession } from "@app/hooks/session";

export function ScoreBoard() {
  const router = useRouter();
  const { userInfo } = useSession();
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

  useEffect(() => {
    console.log("router.query.scoreBoardId", router.query.scoreBoardId);
    getAllTranscriptOfAnUser(router.query.scoreBoardId as string).subscribe(
      (res) => {
        if (res.data) {
          setTranscripts(res.data);
          console.log("transcripts", res.data);
        }
      }
    );
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
        </div>
        {/* {userInfo?.role == "3" && (
          <div className="de-school-title">
            Dao Xuan An
          </div>
        )} */}
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
