import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface GetMyTranscriptsForTeacherRequestDTO {
  classroom: string;
}

export interface GetMyTranscriptsForTeacherResponseDTO {
  root_transcript?: string;
  teacher_address?: string;
  image: number;
  subject: string;
  code: string;
  _id: string;
}

export function getMyTranscriptsForTeacher(
  params: GetMyTranscriptsForTeacherRequestDTO
) {
  return Http.request<GetMyTranscriptsForTeacherResponseDTO>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/teacher?classroom=${params.classroom}`,
  });
}
