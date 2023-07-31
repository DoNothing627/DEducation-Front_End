import { uploadClassTranscript } from "@app/api/academy-transcript/upload-class-transcript";
import {
  uploadStudentTranscript,
  TranscriptStudentForBE,
} from "@app/api/academy-transcript/upload-student-transcript";
import ipfs from "@app/dekits/ipfs";
import { addNewTranscriptForClass } from "@app/smart-contract/test-add-new-transcript";
// import { addNewTranscriptForClass } from "@app/smart-contract/add-new-transcript-for-class";
import {
  addNewTranscriptForStudents,
  TranscriptStudent,
} from "@app/smart-contract/add-new-transcript-for-students";
import { useContext, useState } from "react";
import readXlsxFile from "read-excel-file";
// import fs from "fs";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { generateNormalCertificate } from "@app/pdf-generate";
import "./input-class.scss";
import { Loading } from "../loading";
import { EthereumContext } from "@app/context/ethereum-context";
import { toast } from "react-toastify";
import {
  updateStudentTranscript,
  UpdateTranscriptRequestDTO,
} from "@app/api/academy-transcript/update-student-transcript-txhash";

interface InputFileProps {
  classroom: string;
}

export function InputClass(props: InputFileProps) {
  const [row, setRow] = useState<any[]>([]);
  const [buffer, setBuffer] = useState<Buffer>();
  const [isLoanding, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState();
  const [transcript, setTranscript] = useState<TranscriptStudent[]>([]);
  const { deducation, provider } = useContext(EthereumContext);
  let transcriptStudent: TranscriptStudent[] = [];
  let transcriptStudentForBE: TranscriptStudentForBE[] = [];

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
    try {
      const response = await addNewTranscriptForClass(
        deducation,
        provider,
        "Block chain test",
        "abcdefghiklmn"
      );
      const jsonData = await response.json();
      const hash = JSON.parse(jsonData.result).txHash;
      const onClick = hash
        ? () => window.open(`https://sepolia.etherscan.io/tx/${hash}`)
        : undefined;
      toast("Transaction sent!", { type: "info", onClick });
      // nameInput.current.value = '';
      console.log("response json", JSON.parse(jsonData.result));
      // console.log("response json result", response.json().result);
      // console.log("response result", response.result);
    } catch (err: any) {
      console.log("err", err);
      toast(err?.message, { type: "error" });
      // throw err;
    } finally {
      // setSubmitting(false);
    }

    // const uploadResult = await ipfs.add(buffer);
    // // setIpfsHash(uploadResult.path)
    // // ipfs.add(buffer, (err: any, res: any) => {
    // //   if (err) {
    // //     console.log(err);
    // //     return;
    // //   }
    // //   // setIpfsHash(res[0].hash);
    // //   console.log("ipfsHash", res[0].hash);
    // console.log(uploadResult.path, "path");
    // try {
    //   addNewTranscriptForClass(props.classroom, uploadResult.path);
    //   var uploadClassTranscriptRequestDTO = {
    //     classroom_id: props.classroom,
    //     root_transcript: uploadResult.path,
    //   };

    //   uploadClassTranscript(uploadClassTranscriptRequestDTO).subscribe(
    //     (res) => {
    //       if (res.data) console.log(res.data, "res.data");
    //     }
    //   );
    // } catch (err) {
    //   throw err;
    // }
    // });

    // console.log("arr: " + arr[0]);
    // `rows` is an array of rows
    // each row being an array of cells.
    // });
    // const uploadClassReportsRequestDTO = {
    //   classroom_id: "1234",
    //   class_reports: row,
    // };
    // console.log("uploadClassReportsRequestDTO", uploadClassReportsRequestDTO);
    // uploadClassReports(uploadClassReportsRequestDTO).subscribe((res) => {
    //   console.log(res.data);
    // });

    // for (var i = 0; i < row.length; i++) {
    //   var col = row[i];
    //   console.log(col, "col");
    //   const result = await ipfs.add(`Hello World ${col[0]}`);
    //   console.log(result.path);
    // }

    // row.map((col) => {
    //   console.log(col, "col");
    //   const result = ipfs.add(`Hello World ${col[0]}`);
    //   console.log(result.result);
    //   // ipfs.add(`Hello World ${col[0]}`, (err: any, res: any) => {
    //   //   if (err) {
    //   //     console.log(err);
    //   //     return;
    //   //   }
    //   //   console.log("ipfsHash", res[0].hash);
    //   // });
    // });
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
    console.log(props.classroom, "classroom");
    setIsLoading(true);
    // for (var i = 0; i < row.length; i++) {
    //   var col = row[i];
    //   console.log(col, "col");
    //   const result = await ipfs.add(`${col[0]}\n ${col[1]} \n${col[2]}`);
    //   console.log(result.path);
    //   transcriptStudent.push({
    //     StudentAddress: col[0],
    //     Classroom: props.classroom,
    //     Hashcode: result.path,
    //   });
    // }

    for (var i = 0; i < row.length; i++) {
      var col = row[i];
      console.log(col, "col");
      transcriptStudentForBE.push({
        name: col[0],
        mark: col[1],
        student_id_code: col[2],
      });
    }

    var UploadStudentTranscriptRequestDTO = {
      classroom_id: props.classroom,
      transcriptStudents: transcriptStudentForBE,
    };

    console.log("transcriptStudentForBE", transcriptStudentForBE);

    // await addNewTranscriptForStudents(transcriptStudent);
    uploadStudentTranscript(UploadStudentTranscriptRequestDTO).subscribe(
      async (res) => {
        if (res.data) {
          console.log("transcript student", res.data);
          setIsLoading(false);

          const response = await addNewTranscriptForStudents(
            deducation,
            provider,
            res.data,
            true
          );
          console.log("response", response);
          const jsonData = await response.json();
          const hash = JSON.parse(jsonData.result).txHash;
          const onClick = hash
            ? () => window.open(`https://sepolia.etherscan.io/tx/${hash}`)
            : undefined;
          toast("Transaction sent!", { type: "info", onClick });
          // nameInput.current.value = '';

          let updateTranscriptRequestDto: UpdateTranscriptRequestDTO = {
            list_student: [],
            classroom_id: "",
            tx_hash: "",
          };
          res.data.forEach((element: any) => {
            updateTranscriptRequestDto.list_student.push(
              element.StudentAddress
            );
          });
          updateTranscriptRequestDto.classroom_id = props.classroom;
          updateTranscriptRequestDto.tx_hash = hash;

          updateStudentTranscript(updateTranscriptRequestDto).subscribe(
            (res) => {
              console.log("update txhash", res);
            }
          );
        }
      }
    );

    // const uploadResult = await ipfs.add(buffer);
    // addNewTranscriptForClass(props.classroom, uploadResult.path);
  };

  // const onHandleTestSmartContract = async () => {
  //   console.log("deducation", deducation);
  //   let transcriptStudent = [];
  //   // transcriptStudent.push({
  //   //   StudentAddress: "0x5aa7d58C672282D5F10E98dC5f7d31D73135328F",
  //   //   Classroom: "12345",
  //   //   Hashcode: "6789",
  //   // });
  //   // transcriptStudent.push({
  //   //   StudentAddress: "0x5aa7d58C672282D5F10E98dC5f7d31D73135328F",
  //   //   Classroom: "12345",
  //   //   Hashcode: "6789",
  //   // });
  //   transcriptStudent =[{
  //     StudentAddress: "0x5aa7d58C672282D5F10E98dC5f7d31D73135328F",
  //     Classroom: "12345",
  //     Hashcode: "6789",
  //   }]
  //   transcriptStudent = [
  //     ...transcriptStudent,
  //     {
  //     StudentAddress: "0x5aa7d58C672282D5F10E98dC5f7d31D73135328F",
  //     Classroom: "12345",
  //     Hashcode: "6789",
  //   }]
  //   await addNewTranscriptForStudents(deducation,
  //     provider, transcriptStudent, true);
  // };

  return (
    <>
      {isLoanding == true && <Loading />}
      <div className="de-input-class">
        <span className="hiddenFileInput">
          <input type="file" name="theFile" onChange={onHandleCaptureFile} />
        </span>
        {/* <button className="de-service-button">Update</button> */}
        {/* <input
          className="de-transcript-input"
          type="file"
          onChange={onHandleCaptureFile}></input> */}
        <div className="de-input-wrap-button">
          <button className="de-submit-button" onClick={onHandleSaveRootFile}>
            SAVE ROOT FILE
          </button>
          <button
            className="de-submit-button"
            onClick={onHandleUploadFileForStudents}>
            UPLOAD FOR EACH STUDENT
          </button>
          {/* <button onClick={onHandleTestSmartContract}>
            TEST SMART CONTRACT
          </button> */}
        </div>
      </div>
    </>
  );
}
