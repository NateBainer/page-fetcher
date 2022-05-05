const cliArg = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

request(cliArg[0], (error, response, body) => {

  if (error) throw (`There was an error making the http request, ${error}`);
  if (response.statusCode !== 200) console.log('We could not complete your download, your http request Status Code was: ', response && response.statusCode);
  if (!error && response.statusCode === 200) {
    fs.writeFile(cliArg[1], body, (err,) => {
      if (err) {
        console.log(err);
      } else {
        fs.stat(cliArg[1], (err, fileStats) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Downloaded and saved ${fileStats.size} bytes to ${cliArg[1]} `);
          }
        });
      }
    });
  }



});