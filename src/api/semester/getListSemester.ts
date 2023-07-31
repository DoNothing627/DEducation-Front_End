import { API_END_POINT } from "@app/const/common.const";
import { PERMISSION } from "@app/const/enum";
import { Http } from "@app/services/http";

export interface GetListSemesterResponseDTO {
  _id: string;
  studentId: string;
  studentName: string;
  studentAddress: string;
  diplomaHashcode: string;
}

export function getListSemester() {
  return Http.request<GetListSemesterResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/semester/`,
  });
}
