// import { uploadClassTranscript } from "@app/api/academy-transcript/upload-class-transcript";
// import { uploadStudentTranscript } from "@app/api/academy-transcript/upload-student-transcript";
// import ipfs from "@app/dekits/ipfs";
// import { addNewTranscriptForClass } from "@app/smart-contract/add-new-transcript-for-class";
// import {
//   addNewTranscriptForStudents,
//   TranscriptStudent,
// } from "@app/smart-contract/add-new-transcript-for-students";
// import { useState } from "react";
// import readXlsxFile from "read-excel-file";
// // import fs from "fs";
// import { ThirdwebStorage } from "@thirdweb-dev/storage";
// import "./input-file.scss";

// interface InputFileProps {
//   classroom: string;
// }

// export function InputFile(props: InputFileProps) {
//   const [row, setRow] = useState<any[]>([]);
//   const [buffer, setBuffer] = useState<Buffer>();
//   const [ipfsHash, setIpfsHash] = useState();
//   const [transcript, setTranscript] = useState<TranscriptStudent[]>([]);
//   let transcriptStudent: TranscriptStudent[] = [];

//   const onHandleCaptureFile = async (event: any) => {
//     console.log("capture file ...");
//     event.preventDefault();
//     const file = event.target.files[0];
//     const reader = new window.FileReader();
//     const newList: any[] = [];
//     reader.readAsArrayBuffer(file);
//     reader.onloadend = () => {
//       if (reader.result != null) {
//         setBuffer(Buffer.from(reader.result as string));
//         console.log("buffer", Buffer.from(reader.result as string));
//       }
//     };

//     // const file = event.target.files[0];
//     readXlsxFile(file).then(async (rows) => {
//       // console.log("rows: " + rows[0]);
//       rows.map((cur) => {
//         // console.log("cur", cur);
//         var list: any[] = [];
//         cur.map((e) => list.push(e));
//         newList.push(list);
//       });
//       setRow(newList);
//       console.log("newList", newList);
//     });

//     // console.log("newList", newList);
//   };

//   const onHandleSaveRootFile = async () => {
//     const uploadResult = await ipfs.add(buffer);
//     // setIpfsHash(uploadResult.path)
//     // ipfs.add(buffer, (err: any, res: any) => {
//     //   if (err) {
//     //     console.log(err);
//     //     return;
//     //   }
//     //   // setIpfsHash(res[0].hash);
//     //   console.log("ipfsHash", res[0].hash);
//     console.log(uploadResult.path, "path");
//     try {
//       addNewTranscriptForClass(props.classroom, uploadResult.path);
//       var uploadClassTranscriptRequestDTO = {
//         classroom_id: props.classroom,
//         root_transcript: uploadResult.path,
//       };

//       uploadClassTranscript(uploadClassTranscriptRequestDTO).subscribe(
//         (res) => {
//           if (res.data) console.log(res.data, "res.data");
//         }
//       );
//     } catch (err) {
//       throw err;
//     }
//     // });

//     // console.log("arr: " + arr[0]);
//     // `rows` is an array of rows
//     // each row being an array of cells.
//     // });
//     // const uploadClassReportsRequestDTO = {
//     //   classroom_id: "1234",
//     //   class_reports: row,
//     // };
//     // console.log("uploadClassReportsRequestDTO", uploadClassReportsRequestDTO);
//     // uploadClassReports(uploadClassReportsRequestDTO).subscribe((res) => {
//     //   console.log(res.data);
//     // });

//     // for (var i = 0; i < row.length; i++) {
//     //   var col = row[i];
//     //   console.log(col, "col");
//     //   const result = await ipfs.add(`Hello World ${col[0]}`);
//     //   console.log(result.path);
//     // }

//     // row.map((col) => {
//     //   console.log(col, "col");
//     //   const result = ipfs.add(`Hello World ${col[0]}`);
//     //   console.log(result.result);
//     //   // ipfs.add(`Hello World ${col[0]}`, (err: any, res: any) => {
//     //   //   if (err) {
//     //   //     console.log(err);
//     //   //     return;
//     //   //   }
//     //   //   console.log("ipfsHash", res[0].hash);
//     //   // });
//     // });
//   };

//   const handleTestUpload = async () => {
//     // const file = fs.readFileSync("/home/an/Code/Deducation/Front-end/src/pdf-generate/Dao Xuan An_graduate.pdf");
//     // const upload = await ThirdwebStorage.upload(fs.readFileSync("test.jpg"));
//     // const reader = new window.FileReader();
//     // reader.readAsArrayBuffer(file);
//     // reader.onloadend = () => {
//     //   if (reader.result != null) {
//     //     setBuffer(Buffer.from(reader.result as string));
//     //     console.log("buffer", Buffer.from(reader.result as string));
//     //   }
//     // };

//     // const uploadResult = await ipfs.add(buffer);
//     // console.log(uploadResult.path, "path");
//   };

//   const onHandleUploadFileForStudents = async () => {
//     console.log(row, "row");
//     console.log(transcriptStudent, "transcriptStudent");

//     for (var i = 0; i < row.length; i++) {
//       var col = row[i];
//       console.log(col, "col");
//       const result = await ipfs.add(`${col[0]}\n ${col[1]} \n${col[2]}`);
//       console.log(result.path);
//       transcriptStudent.push({
//         StudentAddress: col[0],
//         Classroom: props.classroom,
//         Hashcode: result.path,
//       });
//     }

//     var UploadStudentTranscriptRequestDTO = {
//       transcriptStudents: transcriptStudent,
//     };

//     // await addNewTranscriptForStudents(transcriptStudent);
//     uploadStudentTranscript(UploadStudentTranscriptRequestDTO).subscribe(
//       (res) => {
//         if (res.data) console.log("transcript student", res.data);
//       }
//     );

//     const uploadResult = await ipfs.add(buffer);
//     addNewTranscriptForClass(props.classroom, uploadResult.path);
//   };
//   return (
//     <>
//       <div className="de-input-file">
//         <input
//           className="de-transcript-input"
//           type="file"
//           onChange={onHandleCaptureFile}></input>
//         <div className="de-input-wrap-button">
//           <button className="de-submit-button" onClick={onHandleSaveRootFile}>
//             SAVE ROOT FILE
//           </button>
//           <button
//             className="de-submit-button"
//             onClick={onHandleUploadFileForStudents}>
//             UPLOAD FOR EACH STUDENT
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
