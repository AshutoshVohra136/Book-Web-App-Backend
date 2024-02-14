const bcrpyt = require("bcrypt");

const jwt = require("jsonwebtoken");

const saltround = 10;

const User = require("../server/user/usermodel");

/*




Seeding a database is a process in which an initial set of data is provided to a database when it is being installed. It is especially useful when we want to populate the database with data we want to develop in future. So our goal is to “feed” the database with dummy data on its initialization







*/

adminreg = () => {
  User.findOne({ email: "admin@gmail.com" }).then((adminData) => {
    if (!adminData) {
      let UserObject = new User();

      UserObject.name = "Admin";
      UserObject.email = "admin@gmail.com";
      UserObject.password = bcrpyt.hashSync("admin123", saltround);
      UserObject.userType = 1;
      UserObject.save();
      console.log(`Admin Seeded.`);
    }
  });
};
module.exports = {
  adminreg,
};
