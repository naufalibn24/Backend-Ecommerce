module.exports = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "ALREADY_USED":
      name = "ALREADY_USED";
      code = 409;
      message = "Email Already Used!";
      break;
    case "DATA_ERROR":
      name = "DATA_ERROR";
      code = 500;
      message = "Data ERORR!";
      break;
    case "NOT_FOUND":
      name = "NOT_FOUND";
      code = 404;
      message = "User Not Found!";
      break;
    case "MISS_TOKEN":
      name = "MISS_TOKEN";
      code = 404;
      message = "Missing Token!";
      break;
    case "WRONG":
      name = "WRONG";
      code = 400;
      message = "username or password incorrect! please try again";
      break;
    case "PRODUCK":
      (name = "PRODUCK"), (code = 401), (message = "product already created");
      break;
    case "OUT_OF_STOCK":
      name = "OUT_OF_STOCK";
      code = 404;
      message = "product out of stock";
      break;
    default:
      500;
      message = "internal server error!";
  }
  console.log(err);
  res.status(code).send({ succses: false, message });
};
