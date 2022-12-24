import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface VerifySignatureRequestDTO {
  wallet: string;
  signature: any;
}

export interface VerifySignatureResponseDTO {
  nonce: number;
}

export function verifySignature(params: VerifySignatureRequestDTO) {
  return Http.request<VerifySignatureResponseDTO>({
    method: "PUT",
    url: `${API_END_POINT}/user`,
    body: params,
  });
}
