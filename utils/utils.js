import validator from "validator"
export const errorMessage =
  (code = 400, message = "Unknown Error", error = {}) =>
  (res = null) => {
    let data = {
      status_code: code,
      status: false,
      message,
      error,
    };
    if (!res) return data;
    res.status(code).json(data);
    return false;
  };

export const successMessage =
  (code = 200, message = "Success", data = {}) =>
  (res = null) => {
    let resp = {
      status_code: code,
      status: true,
      message,
      data,
    };
    if (!res) return resp;
    res.status(code).json(resp);
    return true;
  };

  export const emailValidatorHelper = (email, res) => {
    if (!validator.isEmail(email))
      return errorMessage(400, "Invalid Email Address", {
        email,
        example: "example@example.com",
      })(res);
    return true;
};
