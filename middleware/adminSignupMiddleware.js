import { filterObject } from "../helpers/filterObject.js";

export const adminSignupMiddleware = function (req, res, next) {
  req.body.role = "admin";

  next();
};
