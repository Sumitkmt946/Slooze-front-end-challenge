const PROD_URL = "https://slooze-test.onrender.com";
const DEV_URL = "http://localhost:5000";

const isDevelopment = process.env.NODE_ENV === "development";

export const PRODUCT_URL = isDevelopment ? DEV_URL + "/products" : PROD_URL + "/products";
export const PRODUCTGET_URL = isDevelopment ? DEV_URL + "/products?id=paramId" : PROD_URL + "/products?id=paramId";
export const EDIT_URL = isDevelopment ? DEV_URL + "/products/paramId" : PROD_URL + "/products/paramId";
export const ADD_URL = isDevelopment ? DEV_URL + "/products" : PROD_URL + "/products";
export const LOGIN_URL = isDevelopment
  ? DEV_URL + "/users?email=paramEmail&password=paramPassword"
  : PROD_URL + "/users?email=paramEmail&password=paramPassword";
export const DASHBOARD_URL = isDevelopment ? DEV_URL + "/products" : PROD_URL + "/products";
