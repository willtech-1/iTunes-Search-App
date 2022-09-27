//import chai
const chai = require("chai");
const should = chai.should();
// chai-http module to allow http test
const chaiHttp = require("chai-http");
// import app.js
const app = require("../app");

// use chaiHttp as a middleware
chai.use(chaiHttp);

describe("Testing the itunes search API", () => {
    // test the get route request and handle the asynchronous testing by passive done for example an argument in the funtion and call it later 
  it("it should test the get route", (done) => {
    // test get request
    chai
      .request(app)
      .get("/search")
      // response status should be 200
      .end((error, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
