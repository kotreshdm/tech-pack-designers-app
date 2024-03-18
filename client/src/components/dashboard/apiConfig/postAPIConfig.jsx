import ApiConstants from "../../../serviceIntegration/ApiConstants";
import RestAPIController from "../../../serviceIntegration/RestAPIController";

export function getAllPostsAPI() {
  let config = {
    method: "GET",
    url: ApiConstants.post.readAll,
  };
  return RestAPIController(config);
}
export function deletePostAPI(postId) {
  let config = {
    method: "DELETE",
    url: ApiConstants.post.delete + postId,
  };
  return RestAPIController(config);
}

export function addPostAPI({ data, url, method }) {
  let config = {
    method,
    url,
    data,
  };
  return RestAPIController(config);
}
export function editPostDescriptionAPI({ data }) {
  let config = {
    method: "PUT",
    url: ApiConstants.post.updateDesc,
    data,
  };
  return RestAPIController(config);
}
editPostDescriptionAPI;
