import {
  getUserTranscript,
  GetUserTranscriptRequestDTO,
} from "@app/api/academy-transcript/get-user-transcript";
import { defaultDEducationLogo } from "@app/const/common.const";
import { useSession } from "@app/hooks/session";
import { redirectToLogin } from "@app/services/auth";
import { use, useEffect, useState } from "react";
import { Stat } from "./components/stat";
import ipfs from "../../dekits/ipfs";
import { addNewTranscript } from "@app/smart-contract/add-new-transcript";
import readXlsxFile from "read-excel-file";
// import { uploadClassReports } from "@app/api/academy-transcript/upload-class-report";
import { myProfile } from "@app/api/user/my-profile";
import { useRouter } from "next/router";
import { ModalPortal } from "../modal";

export function Home() {
  const { isLoggedIn, userInfo } = useSession();
  const [buffer, setBuffer] = useState<Buffer>();
  const [ipfsHash, setIpfsHash] = useState();
  const router = useRouter();
  // const [role, setRole] = useState("");

  useEffect(() => {
    // setRole(localStorage.getItem("user_role") as string);
    if (userInfo?.role == "0") router.push(`/students/${userInfo?.id}`);
    if (userInfo?.role == "1") router.push("/classrooms");
    if (userInfo?.role == "3") router.push("/schools");
    console.log("role", userInfo?.role);
  });

  // useEffect(() => {
  //   // myProfile().subscribe((res) => {
  //   //   console.log(res.data);
  //   // });

  // });

  return (
    <>
      {userInfo?.role == "2" && <Stat />}
      {/* <ModalPortal /> */}
    </>
  );
}
