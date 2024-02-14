const express = require("express");
const app = express();
const router = require("express").Router();
const multer = require("multer");
const categoryController = require("../server/category/categoryController");
const bookController = require("../server/books/bookController");
const userController = require("../server/user/userController");

// endpoints

// TRIED TO CREATE CHECK USER ID MIDDLEWARE FOR  CHECKING USER ID...

// const checkUserId = (req, res, next) => {
//   const userId = req.body._id;

//   if (!userId) {
//     console.log("Book Id required for Image Upload....");
//     return res.status(400).json({ error: "Book ID is required" });
//   }

//   next();
// };

// app.use(checkUserId);

const bookstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./public/books");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newname = file.fieldname + "-" + uniqueSuffix + file.originalname;
    req.body["bookImage"] = newname;
    cb(null, newname);
  },
});
const bookupload = multer({ storage: bookstorage });

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.use(require("../config/auth.middleware"));

router.post("/category/add", categoryController.add);
router.get("/category/getall", categoryController.getall);
router.post("/category/getsingle", categoryController.getsingle);
router.post("/category/update", categoryController.updatedata);
router.post("/category/delete", categoryController.deletedata);
router.post("/book/add", bookupload.single("bookImage"), bookController.add);
router.get("/book/getall", bookController.getall);
router.post("/book/deletedata", bookController.deletedata);

router.post(
  "/book/update",
  bookupload.single("bookImage"),
  bookController.update
);
router.all("**", (req, res) => {
  res.json({
    status: 404,
    success: false,
    message: "Route Not Found",
  });
});

module.exports = router;
