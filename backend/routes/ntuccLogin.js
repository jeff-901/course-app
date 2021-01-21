const request = require("request");
function ntuccLogin(username, password, cb) {
  const j = request.jar();
  const cookie = request.cookie("");
  const url = "https://my.ntu.edu.tw/login.aspx";
  // const url = "https://nol.ntu.edu.tw/nol/auth.php";
  j.setCookie(cookie, url);
  request({ url: url, jar: j }, function (err, res, body) {
    // console.log(res.headers)
    // console.log(body)

    request(
      {
        url: "https://web2.cc.ntu.edu.tw/p/s/login2/p1.php",
        jar: j,
        method: "POST",
        formData: {
          user: username,
          pass: password,
          Submit: "登入",
        },
      },
      function (err, res, body) {
        // console.log(res.headers);
        if (res.headers["location"] === undefined) {
          let ret = {
            result: false,
          };
          console.log("Wrong credential");
          cb(JSON.stringify(ret));
        } else {
          request(
            { url: res.headers["location"], jar: j },
            function (err, res, body) {
              // console.log(body)
              // console.log(body);
              // var regex = /<meta http-equiv="refresh" content="0;.*>/;
              // var match = regex.exec(body);
              // console.log(match);
              // console.log(res.headers);

              // request(
              //   {
              //     url: "https://nol.ntu.edu.tw/nol/auth.php",
              //     jar: j,
              //     method: "GET",
              //   },
              //   function (err, res, body) {
              //     console.log(body);
              //     console.log(res.headers);
              //     request(
              //       { url: "https://nol.ntu.edu.tw/nol/student/", jar: j },
              //       function (err, res, body) {
              //         // console.log(err)
              //         console.log(res.headers["set-cookie"]);
              //         console.log(body);
              //         let ret = {
              //           result: true,
              //           chinese_name: "", //d[0],
              //           role: "", //d[1],
              //           id: username,
              //         };
              //         console.log("Success!");
              //         cb(JSON.stringify(ret));
              //       }
              //     );
                  let a = body.search("loginPanel");
                  a = body.indexOf("> ", a + 3);
                  a = a + 1;
                  let b = body.indexOf("</div>", a);
                  let d = body.substring(a, b).trim().split(" ");
                  let ret = {
                              result: true,
                              chinese_name: d[0],
                              role: d[1],
                              id: username,
                            };
                            console.log("Success!");
                            cb(JSON.stringify(ret));
                
            }
          );
        }
      }
    );
  });
}

module.exports = ntuccLogin;
