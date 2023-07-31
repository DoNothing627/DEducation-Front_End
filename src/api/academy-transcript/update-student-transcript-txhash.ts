import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface UpdateTranscriptRequestDTO {
  list_student: any[];
  classroom_id: String;
  tx_hash: String;
}

export function updateStudentTranscript(
  data: UpdateTranscriptRequestDTO
) {
  return Http.request({
    method: "PUT",
    url: `${API_END_POINT}/academy-transcript`,
    body: data,
  });
}
