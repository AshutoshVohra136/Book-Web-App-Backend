//  import model
const Book = require("../books/bookModel");

// add function

add = (req, res) => {
  // VALIDATION LOGIC

  var errors = "";

  if (req.body.bookName == "") errors += "Book Name is Required.";

  if (!!errors) {
    res.json({
      status: 422,
      success: false,
      message: "Errors",
      error: errors,
    });
  } else {
    //  Now lets check for duplicacy

    // Duplicacy Check
    Book.findOne({ bookName: req.body.bookName }).then((bookData) => {
      if (!bookData) {
        //  if not exist then inesert...
        let bookObj = new Book();

        bookObj.bookName = req.body.bookName;
        bookObj.bookTitle = req.body.bookTitle;

        bookObj.bookPrice = req.body.bookPrice;
        bookObj.bookDescription = req.body.bookDescription;
        bookObj.bookImage = "books/ " + req.body.bookImage;
        bookObj.bookStock = req.body.bookStock;
        bookObj.bookCategory = req.body.bookCategory;
        bookObj
          .save()
          .then((bookData) => {
            res.json({
              status: 200,
              success: true,
              message: "Book Added Successfully",
              data: bookData,
            });
          })
          .catch((err) => {
            res.json({
              status: 500,
              success: false,
              message: "Server Error",
              error: err.message,
            });
          });
      } else {
        //   if exist so skip...

        res.json({
          status: 200,
          success: false,
          message: "Book Already Exist. Error on file bookcontroller ",
        });
      }
    });
  }
};

getall = (req, res) => {
  Book.find()
    .populate("bookCategory")
    .then((bookData) => {
      res.json({
        status: 200,
        success: true,
        message: "All Data Found",
        data: bookData,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "Server Error",
        success: false,
        error: err.message,
      });
    });
};

deletedata = (req, res) => {
  let validation = "";
  if (!req.body._id) validation += "_id is required";
  if (!!validation) {
    res.json({
      status: 422,
      success: false,
      message: validation,
      errors: validation,
    });
  } else {
    // we have id now lets check if there is any data related to that id

    Book.findOne({ _id: req.body._id })
      .then((categoryData) => {
        if (!categoryData) {
          res.json({
            status: 404,
            message: "Not Found.",
            success: false,
          });
        } else {
          Book.deleteOne({ _id: req.body._id }).then(() => {
            res.json({
              status: 200,
              success: true,
              message: "Record Deleted",
            });
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Internal Server Error",
          errors: err.message,
        });
      });
  }
};
update = (req, res) => {
  let validateerror = "";
  if (!req.body._id) validateerror += "  _id is required ";

  if (!!validateerror)
    res.json({
      status: 422,
      success: false,
      message: validateerror,
      errors: validateerror,
    });

  Book.findOne({ _id: req.body._id })
    .then((bookdata) => {
      if (!bookdata) {
        //NOT FOUND
        res.json({
          status: 404,
          success: false,
          message: "404 not found.",
        });
      } else {
        // UPDATING
        if (req.body.bookName) {
          bookdata.bookName = req.body.bookName;
        }
        if (req.body.bookTitle) {
          bookdata.bookTitle = req.body.bookTitle;
        }
        if (req.body.bookImage) {
          bookdata.bookImage = "books/" + req.body.bookImage;
        }
        if (req.body.bookPrice) {
          bookdata.bookPrice = req.body.bookPrice;
        }
        if (req.body.bookDescription) {
          bookdata.bookDescription = req.body.bookDescription;
        }
        if (req.body.bookStock) {
          bookdata.bookStock = req.body.bookStock;
        }
        if (req.body.bookCategory) {
          bookdata.bookCategory = req.body.bookCategory;
        }
        if (req.body.owner) {
          bookdata.owner = req.body.owner;
        }
        bookdata.save().then((saveres) => {
          res.json({
            status: 200,
            success: true,
            message: "record updatted",
          });
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "INTERNAL SERVER ERROR",

        errors: err.message,
      });
    });
};
getsingle = (req, res) => {};
module.exports = {
  add,
  getall,
  getsingle,
  deletedata,
  update,
};

/*


  //  WORKING CODE.

//  import model
const Book = require("../books/bookModel");

// add function

add = (req, res) => {
  let bookObj = new Book();

  // VALIDATION LOGIC

  var errors = "";

  if (req.body.bookName == "") errors += "Book Name is Required.";

  if (!!errors) {
    res.json({
      status: 422,
      success: false,
      message: "Errors",
      error: errors,
    });
  } else {
    bookObj.bookName = req.body.bookName;
    bookObj.bookTitle = req.body.bookTitle;
    bookObj.bookPrice = req.body.bookPrice;
    bookObj.bookDescription = req.body.bookDescription;
    bookObj.bookImage = req.body.bookImage;
    bookObj.bookStock = req.body.bookStock;
    bookObj.bookCategory = req.body.bookCategory;

    bookObj
      .save()
      .then((bookData) => {
        res.json({
          status: 200,
          success: true,
          message: "Book Added Successfully",
          data: bookData,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Server Error",
          error: err.message,
        });
      });
  }
};

getall = (req, res) => {
  Book.find()
    .then((bookData) => {
      res.json({
        status: 200,
        success: true,
        message: "All Data Found",
        data: bookData,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "Server Error",
        success: false,
        error: err.message,
      });
    });
};

module.exports = {
  add,
  getall,
};







*/
