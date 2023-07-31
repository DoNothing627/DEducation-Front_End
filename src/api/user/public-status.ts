import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface MyPublicStatusResponse {
  public_status: boolean;
}

export function myPublicStatus() {
  return Http.request<MyPublicStatusResponse>({
    url: `${API_END_POINT}/user/public-status`,
    method: "GET",
  });
}

export function updateMyPublicStatus() {
    return Http.request<MyPublicStatusResponse>({
      url: `${API_END_POINT}/user/public-status`,
      method: "PUT",
    });
  }
