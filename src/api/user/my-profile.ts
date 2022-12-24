import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface MyProfile {
  username: string;
  user_id: string;
}

export function myProfile() {
  return Http.request<MyProfile>({
    url: `${API_END_POINT}/user/profile`,
    method: "GET",
    onError: "throwOriginal",
  });
}
