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
  const semesterOptions = [2021.1, 2021.2, 2022.1];

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
      <div className="de-classroom">
        {/* {classrooms != null &&
        classrooms.map((classroom) => {
            <ClassroomCard />;
        })} */}

        {/* <Select className="de-selection" /> */}
        <select className="de-selection">
          {semesterOptions.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
        <div className="de-wrap-card">
          <Row>
            <AddClassroomCard />
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
    </>
  );
}
