import DEducationABI from "@app/abi/DEducation.json";
import { DEducationContractAddress } from "@app/const/contract.const";
import { getContractInstance } from "@app/services/web3/web3";
import { ethers } from "ethers";

export interface TranscriptStudent {
  StudentAddress: string;
  Classroom: string;
  Hashcode: string;
}

export async function addNewTranscriptForStudents(
  transcriptStudents: TranscriptStudent[]
) {
  const provider = await new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const DEducation = new ethers.Contract(
    DEducationContractAddress,
    DEducationABI,
    signer
  );

  const DEducationContractInstance = await getContractInstance(
    DEducationABI,
    DEducationContractAddress
  );

  const newTx = await DEducationContractInstance.methods
    .addNewTranscriptForStudents(transcriptStudents)
    .send();

  console.log(newTx, "newTx");

  // console.log(transcriptStudents, "transcriptStudents contract");
  // return DEducation.addNewTranscriptForStudents(transcriptStudents);
}
