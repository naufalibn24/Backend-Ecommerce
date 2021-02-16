const jwt = require("jsonwebtoken");
const User = require("../model/User");

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]
//         jwt.verify(token, 'APASIH')
//     } catch (err) {
//         res.status(401).send({ message: 'auth failed' })
//     }
// }
module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, "APASIH", (err, decoded) => {
      if (err) next({ name: "auth failed" });
      else {
        req._id = decoded._id;
        next();
      }
    });
  } else next({ name: "missing token" });
};
