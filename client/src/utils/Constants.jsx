const Constants = {
  baseURL: import.meta.env.VITE_BASE_URL,
  Navagation: {
    home: "/",
    about: "/about",
    services: "/services",
    techPack: "/tech-pack",
    portfolio: "/portfolio",
    manufacturing: "/manufacturing",
    blog: "/blog",
    contactUs: "/contact",
    signIn: "/sign-in",
    dashBoard: "/dashboard",
    categoty: "/category/",
  },
  S3: {
    S3_BUCKET: import.meta.env.VITE_S3_BUCKET,
    REGION: import.meta.env.VITE_REGION,
    ACCESS_KEY: import.meta.env.VITE_ACCESS_KEY,
    SECRET_ACCESS_KEY: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
};
export default Constants;
