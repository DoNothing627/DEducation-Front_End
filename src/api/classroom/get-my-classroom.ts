import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface GetMyClassroomRequestDTO {
  semester: string;
}

export interface GetMyClassroomResponseDTO {
  _id: string;
  subject: string;
  code: string;
  image: number;
  teacher_name: string;
  teacher_wallet: string;
}

export function getMyClassroom(params: GetMyClassroomRequestDTO) {
  return Http.request<GetMyClassroomResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/classroom/self?semester=${params.semester}`,
  });
}
