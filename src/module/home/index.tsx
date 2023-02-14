import {
  getUserTranscript,
  GetUserTranscriptRequestDTO,
} from "@app/api/academy-transcript/get-user-transcript";
import { defaultDEducationLogo } from "@app/const/common.const";
import { useSession } from "@app/hooks/session";
import { redirectToLogin } from "@app/services/auth";
import { useEffect, useState } from "react";
import { Stat } from "./components/stat";
import ipfs from "../../dekits/ipfs";
import { addNewTranscript } from "@app/smart-contract/add-new-transcript";

export function Home() {
  const { isLoggedIn, userInfo } = useSession();
  const [buffer, setBuffer] = useState<Buffer>();
  const [ipfsHash, setIpfsHash] = useState();

  const getUserTranscriptRequestDTO = {
    user_id: "1234",
  };

  const handleLogout = () => {
    redirectToLogin();
  };

  const onHandleCaptureFile = (event: any) => {
    console.log("capture file ...");
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      if (reader.result != null) {
        setBuffer(Buffer.from(reader.result as string));
        console.log("buffer", Buffer.from(reader.result as string));
      }
    };
  };

  const onHandleUploadFile = () => {
    ipfs.files.add(buffer, (err: any, res: any) => {
      if (err) {
        console.log(err);
        return;
      }
      setIpfsHash(res[0].hash);
      console.log("ipfsHash", res[0].hash);
      try {
        addNewTranscript(
          "0x5aa7d58C672282D5F10E98dC5f7d31D73135328F",
          res[0].hash,
          "def",
          "ghi"
        );
      } catch (err) {
        throw err;
      }
    });
  };

  useEffect(() => {
    getUserTranscript(getUserTranscriptRequestDTO).subscribe((res) =>
      console.log(res.data)
    );
  });

  return (
    <>
      <div className="home-page">
        <div className="navigation">
          <img className="navigation-image" src={defaultDEducationLogo} />
          <div className="navigation-tile">DEducation</div>
          <div className="navigation-object">Home</div>
          <div className="navigation-object">Transcrips</div>
          <div className="navigation-object">Relationship</div>
          <div className="navigation-object">Profile</div>
        </div>
        <div className="de-login-button" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <Stat />
      <input type="file" onChange={onHandleCaptureFile}></input>
      <button onClick={onHandleUploadFile}>submit</button>
    </>
  );
}
