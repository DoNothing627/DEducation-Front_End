import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface GetUserTranscriptRequestDTO {
  user_id: string;
}

export interface GetUserTranscriptResponseDTO {
  nonce: number;
}

export function getUserTranscript(params: GetUserTranscriptRequestDTO) {
  return Http.request<GetUserTranscriptResponseDTO>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/${params.user_id}`,
  });
}
