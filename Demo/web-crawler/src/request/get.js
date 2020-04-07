/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 10:21:46
 */

const request = require("request");
request("https://juejin.im/timeline/frontend", function (
  error,
  response,
  body
) {
  // Print the error if one occurred
  console.error("error:", error);
  // Print the response status code if a response was received
  console.log("statusCode:", response && response.statusCode);
  // Print the HTML for the Google homepage.
  console.log("body:", body);
});
