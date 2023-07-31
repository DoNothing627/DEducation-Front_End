import { ethers } from "ethers";
import { createInstance } from "../eth/forwarder";
import { signMetaTxRequest } from "../eth/signer";
// import { useSession } from "@app/hooks/session";

// const { userInfo } = useSession();

async function sendTx(deducation: any, classroom: string, hashcode: string) {
  console.log(
    `Sending upload class transcript tx to class ${classroom} and deducation = ${deducation}`
  );
  console.log("deducation", deducation);
  return deducation.addNewTranscriptForClass(classroom, hashcode);
}

async function sendMetaTx(
  deducation: any,
  provider: any,
  signer: any,
  classroom: string,
  hashcode: string
) {
  console.log(`Sending class transcript meta-tx to ${classroom}`);
  console.log("deducation", deducation);
  const url =
    "https://api.defender.openzeppelin.com/autotasks/1ce2fce4-4952-4f2e-82f3-089dda714b5b/runs/webhook/1f834d0c-ebbd-4581-a4c2-4a659dd8fb42/9krML3aT2MCZFpZ8BgZPXu";
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();
  const data = deducation.interface.encodeFunctionData(
    "addNewTranscriptForClass",
    [classroom, hashcode]
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

export async function addNewTranscriptForClass(
  deducation: any,
  provider: any,
  classroom: string,
  hashcode: string
) {
  console.log("transcript agruments", deducation, classroom, hashcode);
  if (!classroom) throw new Error(`Name cannot be empty`);
  if (!window.ethereum) throw new Error(`User wallet not found`);

  await window.ethereum.enable();
  const userProvider = new ethers.providers.Web3Provider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 11155111) throw new Error(`Please switch to Sepolia for signing`);

  const signer = userProvider.getSigner();
  const from = await signer.getAddress();
  const balance = await provider.getBalance(from);

  console.log("sendTx agrument", signer, from, balance);

  const canSendTx = balance.gt(1e15);
  //if (canSendTx) return sendTx(deducation.connect(signer), classroom, hashcode);
  return sendMetaTx(deducation, provider, signer, classroom, hashcode);
}
