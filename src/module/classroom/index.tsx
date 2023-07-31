import {
  getMyTranscriptsForTeacher,
  GetMyTranscriptsForTeacherRequestDTO,
  GetMyTranscriptsForTeacherResponseDTO,
} from "@app/api/academy-transcript/get-my-transcripts-for-teacher";
import {
  getUserTranscript,
  GetUserTranscriptRequestDTO,
  GetUserTranscriptResponseDTO,
} from "@app/api/academy-transcript/get-user-transcript";
import ipfs from "@app/dekits/ipfs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import readXlsxFile from "read-excel-file";
// import { InputFile } from "../input/input-file";
import { Transcript } from "../transcript";
import "./index.scss";
import { InputClass } from "../input/input-class";
import { ClassroomForTeacher } from "./classroom-for-teacher";
import { ClassroomForStudent } from "./classroom-for-student";
import { useSession } from "@app/hooks/session";

export function ClassroomDetail() {
  const [transcript, setTranscript] = useState<GetUserTranscriptResponseDTO>();
  // const [classroom, setClassroom] = useState("");
  const router = useRouter();
  // const [role, setRole] = useState("");
  const { userInfo } = useSession();

  // useEffect(() => {
  //   setRole(localStorage.getItem("user_role") as string);
  //   // console.log("role", role);
  // });

  const onHandleOpenRootFile = () => {

  }

  useEffect(() => {

    var getUserTranscriptRequestDTO: GetUserTranscriptRequestDTO = {
      classroom: router.query.classroomId as string,
    };

    if (userInfo?.role == "2") {
      // console.log("transcript", transcript);

      getUserTranscript(getUserTranscriptRequestDTO).subscribe((res) => {
        if (res.data) {
          setTranscript(res.data);
          console.log("transcript", res.data);
        }
      });
    }
    // console.log(router.query.classroomId);
  }, [userInfo?.role]);

  return (
    <>
      <div className="de-transcript-container">
        <div className="de-transcript-banner">
          <div className="de-hightlight-link">
            <div>Classrooms</div>
            <div> {">"} </div>
            <div> Class</div>
          </div>
          {userInfo?.role == "1" && (
            <div className="de-teacher-zone">
              <InputClass classroom={router.query.classroomId as string} />
              <button className="de-view-root-file-button" onClick={onHandleOpenRootFile}>VIEW ROOT FILE</button>
            </div>
          )}
        </div>
        <div className="de-transcript">
          {/* <div className="de-transcript-block"> */}
          {/* <Row> */}
          {/* {role == "1" && <InputFile classroom={transcript?._id as string} />} */}
          {/* <Transcript
              root_transcript={transcript?.root_transcript}
              teacher_address={transcript?.teacher_address}
              image={transcript?.image as number}
              subject={transcript?.subject as string}
              code={transcript?.code as string}
              _id={transcript?._id as string}
            /> */}
          {/* </Row> */}
          {/* </div> */}
          {userInfo?.role == "1" && (
            <ClassroomForTeacher
              classroom_id={router.query.classroomId as string}
            />
          )}
          {userInfo?.role == "2" && (
            <ClassroomForStudent
              subject={transcript?.subject as string}
              professor={transcript?.teacher_name as string}
              professor_address={transcript?.teacher_address as string}
              transcript_hashcode={transcript?.root_transcript as string}
              mark={transcript?.mark as string}
            />
          )}
        </div>
      </div>
    </>
  );
}
