import { Row } from "react-bootstrap";
import "./index.scss";
import { SchoolCard } from "./school-card";
export function Schools() {
  return (
    <>
      <div className="de-schools-container">
        {/* <img src="https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/home-v2/new-banner-list-courses.png" className="de-classroom-banner"/> */}
        <div className="de-schools-banner">
          <div className="de-hightlight-link">
            <div>Home</div>
            <div> {">"} </div>
            <div> Schools</div>
          </div>
          {/* <select className="de-selection">
            {semesterOptions.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select> */}
        </div>
        <div className="de-schools">
          {/* {classrooms != null &&
        classrooms.map((classroom) => {
          <ClassroomCard />;
        })} */}
          {/* <div className="de-classroom-block"> */}
          {/* <Select className="de-selection" /> */}

          <div className="de-wrap-card">
            <Row>
              {/* <AddClassroomCard />
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
                ))} */}
              <SchoolCard
                _id={"637e364cc1c652e106a6a8c2"}
                subject={"Hanoi University of Science and Technology"}
                code={"HUST"}
                image={1}
                teacher_name={"classroom?.teacher_name"}
                teacher_wallet={"classroom?.teacher_wallet"}
              />
              <SchoolCard
                _id={"1"}
                subject={"Harvard University"}
                code={"HUN"}
                image={2}
                teacher_name={"classroom?.teacher_name"}
                teacher_wallet={"classroom?.teacher_wallet"}
              />

              <SchoolCard
                _id={"1"}
                subject={"Massachusetts Institute of Technology"}
                code={"MIT"}
                image={4}
                teacher_name={"classroom?.teacher_name"}
                teacher_wallet={"classroom?.teacher_wallet"}
              />
              <SchoolCard
                _id={"1"}
                subject={"Stanford University"}
                code={"SUN"}
                image={3}
                teacher_name={"classroom?.teacher_name"}
                teacher_wallet={"classroom?.teacher_wallet"}
              />
              <SchoolCard
                _id={"1"}
                subject={"Cambridge University"}
                code={"CUN"}
                image={5}
                teacher_name={"classroom?.teacher_name"}
                teacher_wallet={"classroom?.teacher_wallet"}
              />
            </Row>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
