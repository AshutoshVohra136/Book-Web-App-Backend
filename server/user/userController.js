const User = require("../user/usermodel.js");
const Customer = require("../customer/customermodel.js");
const DeliveryPartner = require("../deliveryPartner/deliverpartnerModel.js");
const bcrypt = require("bcrypt");
// saltRounds are how good/Strong we want our hash to be.
// more saltRounds more Security...
const saltround = 10;

const jwt = require("jsonwebtoken");

let privateKey = "o7servicesKey";

register = (req, res) => {
  //validation check

  let validationError = "";

  if (!req.body.email) validationError += "Email is required";
  if (!req.body.name) validationError += "name is required";
  if (!req.body.password) validationError += "Password is required";

  if (!!validationError) {
    res.json({
      status: 422,
      success: false,
      message: validationError,
      errors: validationError,
    });
  } else {
    // got everything now check for duplicacy

    User.findOne({ email: req.body.email })
      .then((userData) => {
        if (!userData) {
          // user don't exist now insert it ...

          let userObj = new User();
          userObj.name = req.body.name;
          userObj.email = req.body.email;
          userObj.userType = req.body.userType;
          userObj.password = bcrypt.hashSync(req.body.password, saltround);
          console.log(userObj.password);

          userObj
            .save()
            // we are using async with userResponse because we want userResponse First... so that we can generate userID.
            .then(async (userResponse) => {
              console.log(userResponse);
              if (userResponse.userType == 2) {
                // using async await because
                //  we want the userId Generated From
                //   User Table so that we can use it in our customer model for userID
                let customerObj = await new Customer();
                customerObj.userID = userResponse._id; // here look we are using id from user table.

                customerObj.name = req.body.name;

                customerObj.email = req.body.email;

                customerObj.address = req.body.address;
                customerObj.phone = req.body.phone;
                customerObj.password = req.body.password;

                customerObj.save().then((customerResponse) => {
                  res.json({
                    status: 200,
                    success: true,
                    message: "User Registered",
                    data: customerResponse,
                  });
                });
              }
              // if (userResponse.userType == 3) {
              //   let deliverypartnerObj = await new DeliveryPartner();
              //   deliverypartnerObj.partnerId = userResponse._id;
              //   deliverypartnerObj.partnerEmail = req.body.email;
              //   deliverypartnerObj.partnerName = req.body.name;
              //   deliverypartnerObj.partnerPassword = req.body.password;
              //   deliverypartnerObj.partnerCity = req.body.city;
              //   deliverypartnerObj.partnerAreaCode = req.body.areacode;
              //   deliverypartnerObj.partnerPhone = req.body.phone;
              //   deliverypartnerObj.partnerVehicle = req.body.vehicle;

              //   deliverypartnerObj.save().then((saveRes) => {
              //     res.status(200).json({
              //       status: 200,
              //       success: true,
              //       message: "DeliveryPArtner Registered",
              //       data: saveRes,
              //     });
              //   });
              // }
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: "Unable To insert into User Model",
                errors: err.message,
              });
            });
        } else {
          res.json({
            status: 422,
            success: false,
            message: "User already Exist With Same Email .",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          messsage: "Internal Server Error",
          errors: err.message,
        });
      });
  }
};

login = (req, res) => {
  let validationError = [];

  if (!req.body.email) validationError.push("Email is Required");

  if (!req.body.password) validationError.push("Password is Required");

  if (validationError.length > 0)
    res.json({
      status: 422,
      success: false,
      message: "Validation Error",
      errors: validationError,
    });
  else {
    // we got email and password...

    User.findOne({ email: req.body.email })
      .then((userData) => {
        if (!userData) {
          res.status(422).json({
            status: 422,
            success: false,
            message: "USER EMAIL IS INVALID/NOT EXIST.",
          });
        } else {
          const comp = bcrypt.compareSync(req.body.password, userData.password);
          if (comp) {
            let mytoken = {
              _id: userData._id,
              email: userData.email,
              name: userData.name,
            };
            let token = jwt.sign(mytoken, privateKey);
            res.status(200).json({
              status: 201,
              success: true,
              message: "USER Logged in Successfully",
              data: userData,
              token: token,
            });
          } else {
            res.status(422).json({
              status: 422,
              success: false,
              message: "USER Password IS INVALID.",
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          success: false,
          message: "Internal Server Error",
          errors: err.message,
        });
      });
  }
};

module.exports = {
  register,
  login,
};
