import { useEffect, useState } from "react";
import { EmployerCard } from "./employer-card";
import { SchoolCard } from "./school-card";
import { TeacherCard } from "./teacher-card";
import "./index.scss";
import {
  getMyRelationShip,
  GetMyRelationShipRequestDTO,
  GetMyRelationShipResponseDTO,
} from "@app/api/relationship/get-my-relationship";
import { PERMISSION } from "@app/const/enum";

export function Relationship() {
  const [schools, setSchools] = useState<GetMyRelationShipResponseDTO[]>([]);
  const [teachers, setTeachers] = useState<GetMyRelationShipResponseDTO[]>([]);
  const [employers, setEmployers] = useState<GetMyRelationShipResponseDTO[]>(
    []
  );
  // const role = localStorage.getItem("user_role");

  useEffect(() => {
    var getMyRelationShipRequestDTO: GetMyRelationShipRequestDTO = {
      permission_type: PERMISSION.MANAGE,
      is_powerful: false,
    };
    getMyRelationShip(getMyRelationShipRequestDTO).subscribe((res) => {
      if (res.data) {
        console.log(res.data, "school");
        setSchools(res.data);
      }
    });
    getMyRelationShipRequestDTO = {
      permission_type: PERMISSION.EVALUATE,
      is_powerful: false,
    };
    getMyRelationShip(getMyRelationShipRequestDTO).subscribe((res) => {
      if (res.data) {
        console.log(res.data, "teacher");
        setTeachers(res.data);
      }
    });
    getMyRelationShipRequestDTO = {
      permission_type: PERMISSION.WATCH,
      is_powerful: false,
    };
    getMyRelationShip(getMyRelationShipRequestDTO).subscribe((res) => {
      if (res.data) {
        console.log(res.data, "teacher");
        setEmployers(res.data);
      }
    });
  }, []);

  return (
    <>
      <div className="de-relationship-container">
        <div className="de-relationship-title">Your School</div>
        <div className="de-relationship-block">
          {/* <SchoolCard /> */}
          {schools != null &&
            schools.map((school) => (
              <SchoolCard
                _id={school._id}
                username={school.username}
                wallet={school.wallet}
              />
            ))}
        </div>
        <div className="de-relationship-title">Your Teachers</div>
        <div className="de-relationship-block">
          {teachers != null &&
            teachers.map((teacher) => (
              <TeacherCard
                _id={teacher._id}
                username={teacher.username}
                wallet={teacher.wallet}
              />
            ))}
        </div>
        <div className="de-relationship-title">Your Employers</div>
        <div className="de-relationship-block">
          {employers != null &&
            employers.map((employer) => (
              <EmployerCard
                _id={employer._id}
                username={employer.username}
                wallet={employer.wallet}
              />
            ))}
        </div>
      </div>
    </>
  );
}
