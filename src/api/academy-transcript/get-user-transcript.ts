import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface GetUserTranscriptRequestDTO {
  classroom: string;
}

export interface GetUserTranscriptResponseDTO {
  root_transcript?: string;
  teacher_address?: string;
  teacher_name?: string;
  image: number;
  subject: string;
  code: string;
  mark: string;
  tx_hash: string;
  _id: string;
}

export function getUserTranscript(params: GetUserTranscriptRequestDTO) {
  return Http.request<GetUserTranscriptResponseDTO>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/self?classroom=${params.classroom}`,
  });
}

export function getMyAllTranscript() {
  return Http.request<GetUserTranscriptResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/all-self`,
  });
}

export function getAllTranscriptOfAnUser(userId: string) {
  return Http.request<GetUserTranscriptResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/${userId}`,
  });
}
