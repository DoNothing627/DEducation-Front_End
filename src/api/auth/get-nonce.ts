import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface NonceRequestDTO {
  wallet: string;
}

export interface NonceResponseDTO {
  nonce: number;
}

export function getNonce(params: NonceRequestDTO) {
  return Http.request<NonceResponseDTO>({
    method: "GET",
    url: `${API_END_POINT}/user/${params.wallet}`,
  });
}
