import { filterObject } from "../helpers/filterObject.js";

export const userSignupMiddleware = function (req, res, next) {
  req.body = filterObject(req.body, "role");

  req.body.role = "customer";

  next();
};
