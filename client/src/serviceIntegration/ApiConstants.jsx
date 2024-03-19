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
    create: "/api/posts/create",
    update: "/api/posts/update",
    updateDesc: "/api/posts/updateDesc",
    readAll: "/api/posts/listAll",
    delete: "/api/posts/delete/",
  },
  public: {
    posts: "/api/public/posts",
    categories: "/api/public/categories",
  },
};

export default ApiConstants;
