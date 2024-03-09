const ApiConstants = {
  httpStatusCode: {
    ok: 200,
    invalidInput: 400,
    unAuthorized: 401,
    forbidden: 403,
    serverError: 500,
  },
  user: {
    signIn: "/api/user/signin",
    signUp: "/api/user/sign-up",
    signOut: "/api/user/signout",
    updateUser: "/api/user/update/",
    delete: "/api/user/delete/",
    listAllUsers: "",
  },
  category: {
    create: "",
    update: "",
    readAll: "",
    delete: "",
  },
  post: {
    create: "",
    update: "",
    readAll: "",
    readOne: "",
    delete: "",
  },
};

export default ApiConstants;
