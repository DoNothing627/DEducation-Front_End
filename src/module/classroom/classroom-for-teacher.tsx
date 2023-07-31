import { useEffect, useState } from "react";
import "./classroom-for-teacher.scss";
import {
  GetMyTranscriptsForTeacherRequestDTO,
  GetMyTranscriptsForTeacherResponseDTO,
  getMyTranscriptsForTeacher,
} from "@app/api/academy-transcript/get-my-transcripts-for-teacher";
import { ModalPortal } from "../modal";

export interface ClassroomForTeacherProps {
  classroom_id: string;
}

export function ClassroomForTeacher(props: ClassroomForTeacherProps) {
  const [transcripts, setTranscripts] = useState<
    GetMyTranscriptsForTeacherResponseDTO[]
  >([]);
  const [transcriptHashcode, setTranscriptHashcode] = useState("");
  const [transcriptTxHash, setTranscriptTxHash] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [isOpenModalTranscript, setIsOpenModalTranscript] = useState(false);

  const onHandleOpenTranscriptModal = (
    transcript_hashcode: string,
    transcript_txhash: string,
    student_address: string
  ) => {
    setTranscriptHashcode(transcript_hashcode);
    setStudentAddress(student_address);
    setTranscriptTxHash(`https://sepolia.etherscan.io/tx/${transcript_txhash}`);
    setIsOpenModalTranscript(true);
  };

  const onHandleCloseTranscriptModal = () => {
    setIsOpenModalTranscript(false);
  };

  useEffect(() => {
    var GetMyTranscriptsForTeacherRequestDTO: GetMyTranscriptsForTeacherRequestDTO =
      {
        classroom: props.classroom_id as string,
      };

    getMyTranscriptsForTeacher(GetMyTranscriptsForTeacherRequestDTO).subscribe(
      (res) => {
        if (res.data) {
          console.log("transcripts", res.data);
          setTranscripts(res.data);
        }
      }
    );
  }, []);

  return (
    <>
      {isOpenModalTranscript == true && (
        <ModalPortal
          close={onHandleCloseTranscriptModal}
          transcript_hashcode={transcriptHashcode}
          tx_hash={transcriptTxHash}
          classroomId={props.classroom_id}
          studentAddress={studentAddress}
        />
      )}
      <div className="de-classroom-for-teacher-wrap">
        <table>
          <thead>
            <tr>
              <th className="de-head-sharp">
                <div className="ds-sharp">#</div>
              </th>
              <th className="de-head-semester">Semester</th>
              <th className="de-head-name">Subject</th>
              <th className="de-head-name">Student</th>
              <th className="de-head-name">Mark</th>
              <th className="de-head-address">Student Address</th>
              <th className="de-head-transcript">Transcript</th>
            </tr>
          </thead>
          <tbody>
            {transcripts.map((transcript, index) => (
              <tr key={index}>
                <td className="de-body-sharp">{index + 1}</td>
                <td className="de-body-semester">2022.2</td>
                <td className="de-body-name">{transcript.subject}</td>
                <td className="de-body-name">{transcript.student_name}</td>
                <td className="de-body-name">{transcript.mark}</td>
                <td className="de-body-address">
                  {transcript.student_address?.slice(0, 12) + "..."}
                </td>
                <td className="de-body-transcript">
                  <button
                    onClick={() =>
                      onHandleOpenTranscriptModal(
                        transcript.root_transcript as string, transcript.tx_hash as string, transcript.student_address as string
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
    </>
  );
}
