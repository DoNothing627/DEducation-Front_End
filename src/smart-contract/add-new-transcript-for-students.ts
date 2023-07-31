import DEducationABI from "@app/abi/DEducation.json";
import { DEducationContractAddress } from "@app/const/contract.const";
import { createInstance } from "@app/eth/forwarder";
import { signMetaTxRequest } from "@app/eth/signer";
import { getContractInstance } from "@app/services/web3/web3";
import { ethers } from "ethers";

export interface TranscriptStudent {
  StudentAddress: string;
  Classroom: string;
  Hashcode: string;
}

async function sendTx(deducation: any, transcriptStudents: any[]) {
  // console.log(
  //   `Sending upload class transcript tx to class ${classroom} and deducation = ${deducation}`
  // );
  console.log("deducation", deducation);
  console.log("transcriptStudents", transcriptStudents);

  return deducation.addNewTranscriptForStudents(transcriptStudents);
}

async function sendMetaTx(
  deducation: any,
  provider: any,
  signer: any,
  transcriptStudents: any[]
) {
  console.log(`Sending class transcript meta-tx`);
  console.log("deducation", deducation);
  console.log("transcriptStudents", transcriptStudents);
  const url =
    "https://api.defender.openzeppelin.com/autotasks/1ce2fce4-4952-4f2e-82f3-089dda714b5b/runs/webhook/1f834d0c-ebbd-4581-a4c2-4a659dd8fb42/9krML3aT2MCZFpZ8BgZPXu";
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();
  const data = deducation.interface.encodeFunctionData(
    "addNewTranscriptForStudents",
    [transcriptStudents]
  );
  console.log("data", data);
  const to = deducation.address;

  const request = await signMetaTxRequest(signer.provider, forwarder, {
    to,
    from,
    data,
  });

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  });
}

export async function addNewTranscriptForStudents(
  deducation: any,
  provider: any,
  transcriptStudents: any[],
  isGasLess: boolean
) {

  console.log("transcript agruments", deducation);
  if (!transcriptStudents) throw new Error(`TranscriptStudents cannot be empty`);
  if (!window.ethereum) throw new Error(`User wallet not found`);

  await window.ethereum.enable();
  const userProvider = new ethers.providers.Web3Provider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 11155111) throw new Error(`Please switch to Sepolia for signing`);

  const signer = userProvider.getSigner();
  const from = await signer.getAddress();
  const balance = await provider.getBalance(from);

  console.log("sendTx agrument", signer, from, balance);

  if(isGasLess) return sendMetaTx(deducation, provider, signer, transcriptStudents);
  else return sendTx(deducation.connect(signer), transcriptStudents);
}
