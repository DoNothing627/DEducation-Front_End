import DEducationABI from "@app/abi/DEducation.json";
import { DEducationContractAddress } from "@app/const/contract.const";
import { ethers } from "ethers";

export async function getTranscriptForStudent(
  teacher_address: string,
  student_address: string,
  classroom: string
) {
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const DEducation = new ethers.Contract(
    DEducationContractAddress,
    DEducationABI,
    signer
  );

  return DEducation.TranscriptForStudents(
    '0x31170fB6208D8A46052F15f0BFCf6e52b620a86c',
    student_address,
    classroom
  );
}
