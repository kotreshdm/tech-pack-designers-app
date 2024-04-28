export function responseValidator(response) {
  if (response.data.success === false) {
    return { status: 400, message: response.data.message };
  } else return { status: 200, data: response.data };
}
