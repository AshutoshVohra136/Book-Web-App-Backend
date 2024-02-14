const Home = require("./homeModel");

get = (req, res) => {
  res.json({
    status: 200,
    message: "Home Page is On.",
  });
};

module.exports = {
  get,
};
