const jwt = require("jsonwebtoken");

let privateKey = "o7servicesKey";

module.exports = (req, res, next) => {
  // here we taken the token given by user.

  let token = req.headers["authorization"];

  console.log(`Token given in req.header is : ${req.headers["authorization"]}`);

  // jwt verify function is used to compare our token with token passed by user.

  jwt.verify(token, privateKey, function (err, data) {
    console.log(`Error ${err}`);
    console.log(`Data ${data}`);
    if (err == null) {
      var tokendata = data;
      console.log(tokendata);
      next();
    } else {
      res.json({
        status: 403,
        success: false,
        message: "Unathenticated",
      });
    }
  });
};
