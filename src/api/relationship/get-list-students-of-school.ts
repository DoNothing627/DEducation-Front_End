import { API_END_POINT } from "@app/const/common.const";
import { PERMISSION } from "@app/const/enum";
import { Http } from "@app/services/http";

export interface GetListStudentsOfSchoolRequestDTO {
  school_id: string;
  is_need_public: boolean;
}

export interface GetListStudentsOfSchoolResponseDTO {
  _id: string;
  studentId: string;
  studentName: string;
  studentAddress: string;
  diplomaHashcode: string;
  diplomaClassification: string;
  diplomaTxHash: string;
}

export function getListStudentsOfSchool(
  params: GetListStudentsOfSchoolRequestDTO
) {
  return Http.request<GetListStudentsOfSchoolResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/permission-relationship/school-students?school_id=${params.school_id}&is_need_public=${params.is_need_public}`,
  });
}
