import { useState } from "react";
import "./classroom-for-student.scss";
import { ModalPortal } from "../modal";

export interface ClassroomForStudentProps {
  subject: string;
  professor: string;
  professor_address: string;
  transcript_hashcode: string;
  mark: string;
}

export function ClassroomForStudent(props: ClassroomForStudentProps) {
  const [isOpenModalTranscript, setIsOpenModalTranscript] = useState(false);
  const onHandleOpenTranscript = () => {
    setIsOpenModalTranscript(true);
  };
  const onHandleCloseTranscript = () => {
    setIsOpenModalTranscript(false);
  };
  return (
    <>
      {isOpenModalTranscript == true && <ModalPortal close={onHandleCloseTranscript} transcript_hashcode={props.transcript_hashcode}/>}
      <div className="de-classroom-for-student-wrap">
        <table>
          <thead>
            <tr>
              <th className="de-head-sharp">
                <div className="ds-sharp">#</div>
              </th>
              <th className="de-head-semester">Semester</th>
              <th className="de-head-name">Professor</th>
              <th className="de-head-name">Subject</th>
              <th className="de-head-name">Mark</th>
              <th className="de-head-address">Professor Address</th>
              <th className="de-head-transcript">Transcript</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="de-body-sharp">1</td>
              <td className="de-body-semester">2022.2</td>
              <td className="de-body-name">{props.professor}</td>
              <td className="de-body-name">{props.subject}</td>
              <td className="de-body-name">{props.mark}</td>
              <td className="de-body-address">
                {props?.professor_address?.slice(0, 12) + "..."}
              </td>
              <td className="de-body-transcript">
                <button onClick={onHandleOpenTranscript}>
                  View Transcript
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
