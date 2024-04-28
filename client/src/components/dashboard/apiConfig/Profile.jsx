import ApiConstants from "../../../serviceIntegration/ApiConstants";
import RestAPIController from "../../../serviceIntegration/RestAPIController";

export function updateProfileAPI({ data, userId }) {
  let config = {
    method: "PUT",
    url: ApiConstants.user.updateUser + userId,
    data,
  };
  return RestAPIController(config);
}
