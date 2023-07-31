import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";
import { TranscriptStudent } from "@app/smart-contract/add-new-transcript-for-students";

export interface UploadDiplomaRequestDTO {
  diplomas: DiplomaForBE[];
  school_id: String;
}

export interface DiplomaForBE {
  name: string;
  // supervisorName: string;
  // subject: string;
  classification: string;
  student_id_code: string;
  major: string;
  // class: string;
}

export function uploadDiploma(data: UploadDiplomaRequestDTO) {
  return Http.request({
    method: "POST",
    url: `${API_END_POINT}/diploma`,
    body: data,
  });
}
