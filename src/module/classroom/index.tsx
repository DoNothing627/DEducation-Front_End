import {
  getMyTranscriptsForTeacher,
  GetMyTranscriptsForTeacherRequestDTO,
  GetMyTranscriptsForTeacherResponseDTO,
} from "@app/api/academy-transcript/get-my-transcripts-for-teacher";
import {
  getUserTranscript,
  GetUserTranscriptRequestDTO,
} from "@app/api/academy-transcript/get-user-transcript";
import ipfs from "@app/dekits/ipfs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import readXlsxFile from "read-excel-file";
import { InputFile } from "../input/input-file";
import { Transcript } from "../transcript";
import "./index.scss";

export function ClassroomDetail() {
  const [transcript, setTranscript] =
    useState<GetMyTranscriptsForTeacherResponseDTO>();
  // const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const role = localStorage.getItem("user_role");

  useEffect(() => {
    var getMyTranscriptsForTeacherResponseDTO: GetMyTranscriptsForTeacherRequestDTO =
      {
        classroom: router.query.classroomId as string,
      };

    var getUserTranscriptRequestDTO: GetUserTranscriptRequestDTO = {
      classroom: router.query.classroomId as string,
    };

    if (role == "1") {
      getMyTranscriptsForTeacher(
        getMyTranscriptsForTeacherResponseDTO
      ).subscribe((res) => {
        if (res.data) {
          console.log(res.data, "school");
          setTranscript(res.data);
        }
      });
    }

    if (role == "2") {
      getUserTranscript(getUserTranscriptRequestDTO).subscribe((res) => {
        if (res.data) {
          setTranscript(res.data);
        }
      });
    }
    // console.log(router.query.classroomId);
  }, []);

  return (
    <>
      <div className="de-transcript-container">
        <Row>
          {role == "1" && <InputFile classroom={transcript?._id as string} />}
          <Transcript
            root_transcript={transcript?.root_transcript}
            teacher_address={transcript?.teacher_address}
            image={transcript?.image as number}
            subject={transcript?.subject as string}
            code={transcript?.code as string}
            _id={transcript?._id as string}
          />
        </Row>
      </div>
    </>
  );
}
