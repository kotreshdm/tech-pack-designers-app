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
    listAllUsers: "/api/user/allusers",
  },
  category: {
    create: "/api/categories/create",
    update: "/api/categories/update",
    readAll: "/api/categories/listAll",
    delete: "/api/categories/delete/",
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
