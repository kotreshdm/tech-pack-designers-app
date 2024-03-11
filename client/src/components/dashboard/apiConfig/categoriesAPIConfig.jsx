import ApiConstants from "../../../serviceIntegration/ApiConstants";
import RestAPIController from "../../../serviceIntegration/RestAPIController";

export function getAllCategoriesAPI() {
  let config = {
    method: "GET",
    url: ApiConstants.category.readAll,
  };
  return RestAPIController(config);
}
export function deleteCategoryAPI(categoryId) {
  let config = {
    method: "DELETE",
    url: ApiConstants.category.delete + categoryId,
  };
  return RestAPIController(config);
}

export function addEditCategoryAPI({ data, url, method }) {
  let config = {
    method,
    url,
    data,
  };
  return RestAPIController(config);
}
