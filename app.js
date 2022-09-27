//express
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
//node-fetch
const fetch = require("node-fetch");
const path = require("path");
const app = express();

//disable Content Security Policy 
app.use(helmet({
  contentSecurityPolicy: false,
}));

// middleware allows requests to the body in .json format.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cors helps to handle cross-site request cookies.
app.use(cors());


//search from itunes
app.get("/search", (req, res) => {
  // destructure name & type from req.query
  const { name, type } = req.query;
  // node-fetch api
  fetch(`https://itunes.apple.com/search?term=${name}&limit=25&media=${type}`)
    // returns a Promise
    .then((response) => response.json())
    // if promise is successful send the data
    .then((data) => {
      res.status(200).send(data);
    })
    // if promise is failed console.log() the error
    .catch((err) => console.log("error =>" + err));
});

// deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

// //listen
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

// for testing
module.exports = app;
