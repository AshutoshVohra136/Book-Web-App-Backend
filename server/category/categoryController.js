const Category = require("../category/categoryModel");
add = (req, res) => {
  let categoryobj = new Category();

  categoryobj.categoryName = req.body.categoryName;
  categoryobj.categoryDescription = req.body.categoryDescription;

  categoryobj
    .save()
    .then((categoryData) => {
      res.json({
        status: 200,
        message: "Category Added Successfully",
        success: true,
        data: categoryData,
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
};
// getall = async (req, res) => {
//   let totalcount;
//   let lim = 2;
//   let skipcount = 0;

//   if (req.body.pageno > 1) {
//     skipcount = (req.body.pageno - 1) * lim;
//   }
//   if (req.body.pageno > 1) {
//     totalcount = await Category.find(req.body).countDocuments().exec();
//   } else {
//     totalcount = await Category.countDocuments().exec();
//   }

//   await Category.find()
//     .limit(lim)
//     .skip(skipcount)
//     .then((categoryData) => {
//       res.json({
//         status: 200,
//         success: true,
//         total: totalcount,
//         message: "Found All Category Data",
//         data: categoryData,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         status: 500,
//         success: true,
//         message: "Server Error",
//         error: err.message,
//       });
//     });
// };

updatedata = (req, res) => {
  let validationError = "";

  if (!req.body._id) validationError += "  Category Id is required.  ";

  if (!!validationError) {
    res.json({
      status: 422,
      message: validationError,
      errors: validationError,
      success: false,
    });
  } else {
    // existence of record..
    Category.findOne({ _id: req.body._id })
      .then((categoryData) => {
        if (!categoryData) {
          console.log("Record Not Found.");
          res.json({
            status: 404,
            success: false,
            message: "Record Not Found",
          });
        } else {
          console.log("Record Found");
          console.log("Updating Record Now.");

          if (req.body.categoryName) {
            categoryData.categoryName = req.body.categoryName;
          }
          if (req.body.categoryDescription) {
            categoryData.categoryDescription = req.body.categoryDescription;
          }

          categoryData.save().then((saveResponse) => {
            res.json({
              status: 200,
              success: true,
              message: "Record Updated",
              data: saveResponse,
            });
          });
          console.log(" Record Updated Successfullly.");
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

getsingle = (req, res) => {
  let validationError = "";
  if (!req.body._id) validationError += "_Id is required.";
  if (!!validationError) {
    res.json({
      status: 422,
      success: false,
      message: "Error",
      errors: validationError,
    });
  } else {
    // var finder = req.body._id;
    // var finder = {
    //   $or: [{ _id: req.body._id }, { status: req.body.status }],
    // };
    Category.findOne({ _id: req.body._id })
      .then((categoryData) => {
        res.json({
          status: 200,
          success: true,
          message: "Data Found Successfull",
          data: categoryData,
        });
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
getall = async (req, res) => {
  let totalcount;
  // let lim = 2;
  // let skipcount = 0;

  // if (req.body.pageno > 1) {
  //   skipcount = (req.body.pageno - 1) * lim;
  // }
  if (req.body.pageno > 1) {
    totalcount = await Category.find(req.body).countDocuments().exec();
  } else {
    totalcount = await Category.countDocuments().exec();
  }

  Category.find()
    .then((categoryData) => {
      res.json({
        status: 200,
        success: true,
        total: totalcount,
        message: "Found All Category Data",
        data: categoryData,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: true,
        message: "Server Error",
        error: err.message,
      });
    });
};
deletedata = (req, res) => {
  let validationError = "";
  if (!req.body._id) validationError += " _id is required. ";
  if (!!validationError)
    res.json({
      status: 422,
      success: false,
      message: validationError,
    });
  else {
    Category.findOne({ _id: req.body._id })
      .then((catedata) => {
        if (!catedata) {
          res.json({
            status: 404,
            success: false,
            message: "404 Not Found",
          });
        } else {
          Category.deleteOne({ _id: req.body._id }).then(() => {
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
module.exports = {
  add,
  getall,
  getsingle,
  updatedata,
  deletedata,
};
