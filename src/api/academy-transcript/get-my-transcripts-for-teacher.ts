import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface GetMyTranscriptsForTeacherRequestDTO {
  classroom: string;
}

export interface GetMyTranscriptsForTeacherResponseDTO {
  root_transcript?: string;
  student_address?: string;
  student_name?: string;
  image: number;
  subject: string;
  code: string;
  mark: string;
  _id: string;
  tx_hash: string;
}

export function getMyTranscriptsForTeacher(
  params: GetMyTranscriptsForTeacherRequestDTO
) {
  return Http.request<GetMyTranscriptsForTeacherResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/academy-transcript/teacher?classroom=${params.classroom}`,
  });
}
