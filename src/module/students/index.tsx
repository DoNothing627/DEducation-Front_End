import { useRouter } from "next/router";
import { InputSchool } from "../input/input-school";
import "./index.scss";
import { useEffect, useState } from "react";
import {
  GetListStudentsOfSchoolRequestDTO,
  GetListStudentsOfSchoolResponseDTO,
  getListStudentsOfSchool,
} from "@app/api/relationship/get-list-students-of-school";
import { getListSemester } from "@app/api/semester/getListSemester";
import { useSession } from "@app/hooks/session";
import { ModalPortal } from "../modal";

export function Students() {
  const router = useRouter();
  const { userInfo } = useSession();
  const [listStudents, setListStudents] = useState<
    GetListStudentsOfSchoolResponseDTO[]
  >([]);
  const [isOpenModalTranscript, setIsOpenModalTranscript] = useState(false);
  const [transcriptHashcode, setTranscriptHashcode] = useState("");
  const [transcriptTxHash, setTranscriptTxHash] = useState("");

  console.log("user info", userInfo);

  useEffect(() => {
    const schoolId = router.query.schoolId;
    let listStudentsOfSchoolRequestDTO: GetListStudentsOfSchoolRequestDTO = {
      school_id: router.query.schoolId as string,
      is_need_public: userInfo?.role == "3",
    };
    console.log(
      "listStudentsOfSchoolRequestDTO",
      listStudentsOfSchoolRequestDTO
    );
    getListStudentsOfSchool(listStudentsOfSchoolRequestDTO).subscribe((res) => {
      if (res.data) {
        console.log("res.data", res.data);
        setListStudents(res.data);
      }
    });
  }, []);

  const onHandleOpenDiploma = (
    diplomaHashcode: string,
    diplomaTxHash: string
  ) => {
    // getListSemester().subscribe((res) => {
    //   if (res.data) console.log(res.data);
    // });
    console.log("diplomaHashcode", diplomaHashcode);
    setTranscriptTxHash(`https://sepolia.etherscan.io/tx/${diplomaTxHash}`);
    setTranscriptHashcode(diplomaHashcode);
    setIsOpenModalTranscript(true);
  };

  console.log("transcriptHashcode", transcriptHashcode);

  const handleCloseTranscript = () => {
    setIsOpenModalTranscript(false);
  };

  const onHandleToScoreBoard = (userId: string) => {
    router.push(`/score-board/${userId}`);
  };

  return (
    <>
      {isOpenModalTranscript == true && (
        <ModalPortal
          close={handleCloseTranscript}
          transcript_hashcode={transcriptHashcode}
          tx_hash={transcriptTxHash}
        />
      )}
      <div className="de-students-container">
        <div className="de-students-banner">
          <div className="de-hightlight-link">
            <div>Home</div>
            <div> {">"} </div>
            <div> Students</div>
          </div>
          {/* <select className="de-selection">
            {semesterOptions.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select> */}
          <div className="de-service-area">
            <input className="de-student-search" placeholder="Student ID" />
            {/* <span className="hiddenFileInput">
              <input type="file" name="theFile" />
            </span>
            <button className="de-service-button">Update</button> */}
            {userInfo?.role == "0" && <InputSchool school="" />}
          </div>
        </div>
        {/* {userInfo?.role == "3" && (
          <div className="de-school-title">
            Hanoi University of Science and Technology
          </div>
        )} */}
        <div className="de-students-wrap">
          <table>
            <thead>
              <tr>
                <th className="de-head-sharp">
                  <div className="ds-sharp">#</div>
                </th>
                <th className="de-head-id">Student ID</th>
                <th className="de-head-name">Name</th>
                <th className="de-head-address">Address</th>
                <th className="de-head-address">Classification</th>
                <th className="de-head-score">Score Board</th>
                <th className="de-head-diploma">Diploma</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td className="de-body-sharp">1</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr>
              <tr>
                <td className="de-body-sharp">2</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr>
              <tr>
                <td className="de-body-sharp">3</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr>
              <tr>
                <td className="de-body-sharp">4</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr>
              <tr>
                <td className="de-body-sharp">5</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr>
              <tr>
                <td className="de-body-sharp">6</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr>
              <tr>
                <td className="de-body-sharp">7</td>
                <td className="de-body-id">20190076</td>
                <td className="de-body-name">Dao Xuan An</td>
                <td className="de-body-address">0x5aa7d58C...</td>
                <td className="de-body-score">
                  <button>View Score</button>
                </td>
                <td className="de-body-diploma">
                  <button>View Diploma</button>
                </td>
              </tr> */}
              {listStudents.map((student, index) => (
                <tr>
                  <td className="de-body-sharp">{index + 1}</td>
                  <td className="de-body-id">{student.studentId}</td>
                  <td className="de-body-name">{student.studentName}</td>
                  <td className="de-body-address">
                    {student.studentAddress?.slice(0, 12) + "..."}
                  </td>
                  <td className="de-body-address">
                    {student.diplomaClassification}
                  </td>
                  <td className="de-body-score">
                    <button onClick={() => onHandleToScoreBoard(student._id)}>
                      View Score
                    </button>
                  </td>
                  <td className="de-body-diploma">
                    <button
                      onClick={() =>
                        onHandleOpenDiploma(
                          student.diplomaHashcode as string,
                          student.diplomaTxHash
                        )
                      }>
                      View Diploma
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
