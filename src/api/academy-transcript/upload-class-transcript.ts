import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface UploadClassTranscriptRequestDTO {
  classroom_id: string;
  root_transcript: string;
}

export function uploadClassTranscript(data: UploadClassTranscriptRequestDTO) {
  return Http.request({
    method: "POST",
    url: `${API_END_POINT}/academy-transcript/class-transcript`,
    body: data,
  });
}
