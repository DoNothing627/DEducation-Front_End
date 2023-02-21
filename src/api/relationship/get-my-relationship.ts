import { API_END_POINT } from "@app/const/common.const";
import { PERMISSION } from "@app/const/enum";
import { Http } from "@app/services/http";

export interface GetMyRelationShipRequestDTO {
  permission_type: PERMISSION;
  is_powerful: boolean;
}

export interface GetMyRelationShipResponseDTO {
  _id: string;
  username: string;
  wallet: string;
  date_of_birth?: string;
  school?: string;
}

export function getMyRelationShip(params: GetMyRelationShipRequestDTO) {
  return Http.request<GetMyRelationShipResponseDTO[]>({
    method: "GET",
    url: `${API_END_POINT}/permission-relationship/self?permission_type=${params.permission_type}&is_powerful=${params.is_powerful}`,
  });
}
