import DEducationABI from "@app/abi/DEducation.json";
import { DEducationContractAddress } from "@app/const/contract.const";
import { ethers } from "ethers";

export async function getTranscriptForClass(
  teacher_address: string,
  classroom: string
) {
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const DEducation = new ethers.Contract(
    DEducationContractAddress,
    DEducationABI,
    signer
  );

  return DEducation.TranscriptForClass(teacher_address, classroom);
}
