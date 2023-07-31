import Select from "react-select";
import { useState, useEffect } from "react";
import { AddClassroomCard } from "./add-classroom-card";
import { ClassroomCard } from "./classroom-card";
import "./index.scss";
import { Row } from "react-bootstrap";
import {
  getMyClassroom,
  GetMyClassroomRequestDTO,
  GetMyClassroomResponseDTO,
} from "@app/api/classroom/get-my-classroom";

export function Classroom() {
  const [classrooms, setClassrooms] = useState<GetMyClassroomResponseDTO[]>([]);
  const semesterOptions = [2022.2];

  useEffect(() => {
    var getMyClassroomRequestDTO: GetMyClassroomRequestDTO = {
      semester: "63ef7e3475a3774cd9833096",
    };
    getMyClassroom(getMyClassroomRequestDTO).subscribe((res) => {
      if (res.data) {
        console.log(res.data, "school");
        setClassrooms(res.data);
      }
    });
  }, []);

  return (
    <>
      <div className="de-classroom-container">
        {/* <img src="https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/home-v2/new-banner-list-courses.png" className="de-classroom-banner"/> */}
        <div className="de-classroom-banner">
          <div className="de-hightlight-link">
            <div>Home</div>
            <div> {">"} </div>
            <div> Classroom</div>
          </div>
          <select className="de-selection">
            {semesterOptions.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="de-classroom">
          {/* {classrooms != null &&
        classrooms.map((classroom) => {
          <ClassroomCard />;
        })} */}
          {/* <div className="de-classroom-block"> */}
          {/* <Select className="de-selection" /> */}

          <div className="de-wrap-card">
            <Row>
              {/* <AddClassroomCard /> */}
              {classrooms != null &&
                classrooms.map((classroom) => (
                  <ClassroomCard
                    _id={classroom._id}
                    subject={classroom.subject}
                    code={classroom.code}
                    image={classroom.image}
                    teacher_name={classroom?.teacher_name}
                    teacher_wallet={classroom?.teacher_wallet}
                  />
                ))}
            </Row>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
