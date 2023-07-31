import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";
import { TranscriptStudent } from "@app/smart-contract/add-new-transcript-for-students";

export interface UpdateDiplomaRequestDTO {
  list_student: any[];
  school_id: String;
  tx_hash: String;
}

export function updateDiploma(data: UpdateDiplomaRequestDTO) {
  return Http.request({
    method: "PUT",
    url: `${API_END_POINT}/diploma`,
    body: data,
  });
}
