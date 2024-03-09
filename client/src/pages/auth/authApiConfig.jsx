import ApiConstants from "../../serviceIntegration/ApiConstants";
import RestAPIController from "../../serviceIntegration/RestAPIController";

export function signInAPI({ data, url }) {
  let config = {
    method: "POST",
    url,
    data,
  };
  return RestAPIController(config);
}

export function signOutAPI() {
  let config = {
    method: "POST",
    url: ApiConstants.user.signOut,
  };
  return RestAPIController(config);
}
export function deleteUserAPI(userId) {
  let config = {
    method: "DELETE",
    url: ApiConstants.user.delete + userId,
  };
  return RestAPIController(config);
}
