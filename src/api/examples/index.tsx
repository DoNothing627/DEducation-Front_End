import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export interface Request {}

export interface Response {}

export function examples(data: Request) {
  return Http.request<Response>({
    method: "POST",
    url: `${API_END_POINT}`,
    body: data,
  });
}
