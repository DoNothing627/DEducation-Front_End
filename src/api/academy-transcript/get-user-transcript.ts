import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface GetUserTranscriptRequestDTO {
  classroom: string;
}

export interface GetUserTranscriptResponseDTO {
  root_transcript?: string;
  teacher_address?: string;
  image: number;
  subject: string;
  code: string;
  _id: string;
}

export function getUserTranscript(params: GetUserTranscriptRequestDTO) {
  return Http.request<GetUserTranscriptResponseDTO>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/self?classroom=${params.classroom}`,
  });
}
