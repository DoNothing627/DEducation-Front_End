import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";
import { TranscriptStudent } from "@app/smart-contract/add-new-transcript-for-students";

export interface UploadStudentTranscriptRequestDTO {
  transcriptStudents: TranscriptStudent[];
}

export function uploadStudentTranscript(
  data: UploadStudentTranscriptRequestDTO
) {
  return Http.request({
    method: "POST",
    url: `${API_END_POINT}/academy-transcript/student-transcript`,
    body: data,
  });
}
