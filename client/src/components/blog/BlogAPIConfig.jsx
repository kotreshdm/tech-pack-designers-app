import ApiConstants from "../../serviceIntegration/ApiConstants";
import RestAPIController from "../../serviceIntegration/RestAPIController";

export function getAllPostsAPI() {
  let config = {
    method: "GET",
    url: ApiConstants.public.posts,
  };
  return RestAPIController(config);
}
export function getAllCategoriesAPI() {
  let config = {
    method: "GET",
    url: ApiConstants.public.categories,
  };
  return RestAPIController(config);
}
