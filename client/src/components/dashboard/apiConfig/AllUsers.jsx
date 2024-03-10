import ApiConstants from "../../../serviceIntegration/ApiConstants";
import RestAPIController from "../../../serviceIntegration/RestAPIController";

export function getAllUsersAPI() {
  let config = {
    method: "GET",
    url: ApiConstants.user.listAllUsers,
  };
  return RestAPIController(config);
}
export function deleteUserAPI(usrId) {
  let config = {
    method: "DELETE",
    url: ApiConstants.user.delete + usrId,
  };
  return RestAPIController(config);
}
