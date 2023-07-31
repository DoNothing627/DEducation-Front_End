import { uploadClassTranscript } from "@app/api/academy-transcript/upload-class-transcript";
import {
  uploadStudentTranscript,
  TranscriptStudentForBE,
} from "@app/api/academy-transcript/upload-student-transcript";
import ipfs from "@app/dekits/ipfs";
import { addNewTranscriptForClass } from "@app/smart-contract/add-new-transcript-for-class";
import {
  addNewTranscriptForStudents,
  TranscriptStudent,
} from "@app/smart-contract/add-new-transcript-for-students";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
// import fs from "fs";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { generateNormalCertificate } from "@app/pdf-generate";
import "./input-school.scss";
import { Loading } from "../loading";
import {
  DiplomaForBE,
  uploadDiploma,
} from "@app/api/academy-transcript/upload-diploma";
import { useSession } from "@app/hooks/session";

interface InputFileProps {
  school: string;
}

export function InputSchool(props: InputFileProps) {
  const [row, setRow] = useState<any[]>([]);
  const [buffer, setBuffer] = useState<Buffer>();
  const [isLoanding, setIsLoading] = useState(false);
  const { userInfo } = useSession();
  let diplomaForBE: DiplomaForBE[] = [];

  const onHandleCaptureFile = async (event: any) => {
    console.log("capture file ...");
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    const newList: any[] = [];
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      if (reader.result != null) {
        setBuffer(Buffer.from(reader.result as string));
        console.log("buffer", Buffer.from(reader.result as string));
      }
    };

    // const file = event.target.files[0];
    readXlsxFile(file).then(async (rows) => {
      // console.log("rows: " + rows[0]);
      rows.map((cur) => {
        // console.log("cur", cur);
        var list: any[] = [];
        cur.map((e) => list.push(e));
        newList.push(list);
      });
      setRow(newList);
      console.log("newList", newList);
    });

    // console.log("newList", newList);
  };

  const onHandleSaveRootFile = async () => {
    const uploadResult = await ipfs.add(buffer);
    console.log(uploadResult.path, "path");
    try {
      // addNewTranscriptForClass(props.school, uploadResult.path, true);
      var uploadClassTranscriptRequestDTO = {
        classroom_id: props.school,
        root_transcript: uploadResult.path,
      };

      uploadClassTranscript(uploadClassTranscriptRequestDTO).subscribe(
        (res) => {
          if (res.data) console.log(res.data, "res.data");
        }
      );
    } catch (err) {
      throw err;
    }
  };

  const handleTestUpload = async () => {
    // const file = fs.readFileSync("/home/an/Code/Deducation/Front-end/src/pdf-generate/Dao Xuan An_graduate.pdf");
    // const upload = await ThirdwebStorage.upload(fs.readFileSync("test.jpg"));
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onloadend = () => {
    //   if (reader.result != null) {
    //     setBuffer(Buffer.from(reader.result as string));
    //     console.log("buffer", Buffer.from(reader.result as string));
    //   }
    // };
    // const uploadResult = await ipfs.add(buffer);
    // console.log(uploadResult.path, "path");
  };

  const onHandleUploadFileForStudents = async () => {
    console.log(row, "row");
    console.log(props.school, "school");
    setIsLoading(true);

    for (var i = 0; i < row.length; i++) {
      var col = row[i];
      console.log(col, "col");
      diplomaForBE.push({
        name: col[0],
        classification: col[2],
        student_id_code: col[1],
        major: col[3],
      });
    }

    var UploadDiplomaRequestDTO = {
      school_id: userInfo?.id as string,
      diplomas: diplomaForBE,
    };

    console.log("transcriptStudentForBE", diplomaForBE);

    // await addNewTranscriptForStudents(transcriptStudent);
    uploadDiploma(UploadDiplomaRequestDTO).subscribe((res) => {
      if (res.data) {
        console.log("transcript student", res.data);
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      {isLoanding == true && <Loading />}
      <div className="de-input-school">
        <span className="hiddenFileInput">
          <input type="file" name="theFile" onChange={onHandleCaptureFile} />
        </span>
        <div className="de-input-wrap-button">
          <button className="de-submit-button" onClick={onHandleSaveRootFile}>
            SAVE ROOT FILE
          </button>
          <button
            className="de-submit-button"
            onClick={onHandleUploadFileForStudents}>
            UPLOAD FOR EACH STUDENT
          </button>
        </div>
      </div>
    </>
  );
}
