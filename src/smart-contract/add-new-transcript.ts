import DEducationABI from "@app/abi/DEducation.json";
import { DEducationContractAddress } from "@app/const/contract.const";
import { ethers } from "ethers";

export async function addNewTranscript(
  studentAddress: string,
  hashcode: string,
  semester: string,
  subject: string
) {
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const uploadTranscript = new ethers.Contract(
    DEducationContractAddress,
    DEducationABI,
    signer
  );

  return uploadTranscript.addNewTranscript(
    studentAddress,
    hashcode,
    semester,
    subject
  );
}
