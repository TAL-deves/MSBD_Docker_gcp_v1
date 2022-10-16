const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const routesURLs = require('./routes/routes');
const cors = require("cors");
const { logger, SMSlogger, SSLlogger, requestLogger, responseLogger } = require("./logger/logger");

const { loadExampleData, revokeToken } = require("./auth/model");

const bodyParser = require("body-parser");
const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const router = express.Router();

const signUpTemplateCopy = require("./Database/models/SignUpModels");
const courseIdList = require("./Database/models/courses");

const { sendMail } = require("./services/emailService");
const { generateOTP } = require("./services/OTP");
const { getCertificate } = require("./services/certificateGenerator");
const moment = require("moment");
const PDFDocument = require("pdfkit");

const cookieSession = require("cookie-session");
const passport = require("passport");
const passportStrategy = require("./passport");
const expressSession = require("express-session");
// import ResponseDetails from './Details/responseDetails.js';
// var request = require("request");

const coursesData = require("./data/courses");
const allCourses = require("./data/allCourses");
const allInstructors = require("./data/instructors");

let tokenModel = require("./Database/models/token");

const { v4: uuidv4 } = require("uuid");

dotenv.config();

// ***** API docmentation  ***** //
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// import library and files
const swaggerDocument = require("./swagger.json");
const { response } = require("express");

const crypto = require("crypto");
var CryptoJS = require("crypto-js");

const { encyptMessage } = require("./encryptionService/encrypt");
const { decryptMessage } = require("./encryptionService/decrypt");
const { isError } = require("util");

const bcrypt = require("bcrypt");

const SSLCommerzPayment = require("sslcommerz-lts");
const { sendSms } = require("./services/smsService");
const reviews = require("./Database/models/reviews");
const multer = require('multer')

// const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_CONNECT, function (err, res) {
  if (err) {
    return console.error("Error connecting to DB:", err);
  }
  console.log("Connected successfully to DB");
  // loadExampleData()
});

app.use(express.json());
app.use(
  cors({
    // origin: '*',
    // // origin: true,
    // methods: "GET,POST,PUT,DELETE",
    // credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const myLogger = function (req, res, next) {
  // console.log(req.headers.useraagent)
  const headers = Object.entries(req.headers);
  let json = {};
  let data = headers.map((itm) => `${itm[0]}: ${itm[1]}`);
  json = { ...data };
  json = Object.assign({}, data);
  json = data.reduce((json, value, key) => {
    json[value.split(":")[0]] = value.split(":")[1];
    return json;
  }, {});
  json["ip"] = req.ip;
  json["url"] = req.url;
  json["method"] = req.method;
  logger.log("info", `${JSON.stringify(json)}`);
  next();
};

// Generate random 16 bytes to use as IV
var IV = CryptoJS.enc.Utf8.parse("1583288699248111");

var keyString = "thisIsAverySpecialSecretKey";
// finds the SHA-256 hash for the keyString
var Key = CryptoJS.SHA256(keyString);

var JsonFormatter = {
  stringify: function (cipherParams) {
    // create json object with ciphertext
    var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    // optionally add iv or salt
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }
    // stringify json object
    // return JSON.stringify(jsonObj);
    return jsonObj;
  },
  parse: function (jsonStr) {
    // parse json string
    var jsonObj = JSON.parse(jsonStr);
    // extract ciphertext from json object, and create cipher params object
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
    });
    // optionally extract iv or salt
    if (jsonObj.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
    }
    if (jsonObj.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
    }
    return cipherParams;
  },
};

function encrypt(data) {
  var encryptedCP = CryptoJS.AES.encrypt(data, Key, { iv: IV });

  var cryptText = encryptedCP.toString();

  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cryptText),
    formatter: JsonFormatter,
  });
  return cipherParams.toString();
}

let decryptionService = function (req, res, next) {
  console.log("This prints 1st");
  const { request, passphase } = req.body;
  const keyString = "thisIsAverySpecialSecretKey";
  const key = crypto.createHash("sha256").update(keyString).digest();
  try {
    const iv = Buffer.from(passphase, "hex");
    const encryptedText = Buffer.from(request, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    let obj = decrypted;
    // console.log("obj req ----- :"+JSON.parse(obj));

    // let recievedData = (obj)

    // console.log("This is the object -----", JSON.stringify(obj));
    return obj;

    // switch (req.originalUrl) {
    //   case "/api/signup":
    //   case "/api/forget-password":
    //     req.body = JSON.parse(JSON.parse(obj));
    //     break;
    //   case "/api/oauth/token":
    //     req.body = JSON.parse(obj);
    //     break;

    //   default:
    //     req.body = obj;
    // }

    // req.body= JSON.parse(obj);
    // req.body.recv= recievedData
    // req.body = (req.body)
    // console.log("Outgoing req ----- :", obj);
    // console.log("Outgoing req ----- :"+ typeof (req.body));
  } catch (err) {
    console.log("Error log:     " + err.message);
    res.send(err.message);
  }

  next();
};
// }

// let encryptionService = function (req, res, next) {
//   console.log("This prints 3rd");
//   let oldSend = res.send;

//   console.log("This prints 3rd", oldSend);
//   //  console.log("oldSend -------   ",res);
//   res.send = (data) => {
//     //  console.log("data -------   "+JSON.stringify(data));
//     let encryptionData = encrypt(JSON.stringify(data));
//     //  let encryptionData = encrypt((data))
//     // console.log("encryptionData -------   "+encryptionData);

//     res.send = oldSend; // set function back to avoid the 'double-send'
//     let encryptedData = {
//       request: encryptionData,
//       passphase: IV.toString(),
//     };
//     console.log("ENCRYPTED response data: " +encryptionData);

//     return res.send(encryptedData); // just call as normal with data

//   };
//   next();
// };
//! Starting of  ***** Encryption and decryption *****

let decryptionOfData = (req, res) => {
  const { request, passphase } = req.body;
  const keyString = "thisIsAverySpecialSecretKey";
  const key = crypto.createHash("sha256").update(keyString).digest();
  try {
    const iv = Buffer.from(passphase, "hex");
    const encryptedText = Buffer.from(request, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    let obj = decrypted;

    return obj;
  } catch (err) {
    console.log("Error log:     " + err.message);
    return err.message;
    // res.send(err.message);
  }
};

let encryptionOfData = (data) => {
  let encryptionData = encrypt(JSON.stringify(data));
  //  let encryptionData = encrypt((data))
  // console.log("encryptionData -------   "+encryptionData);

  // res.send = oldSend; // set function back to avoid the 'double-send'
  let encryptedData = {
    request: encryptionData,
    passphase: IV.toString(),
  };
  // console.log("ENCRYPTED response data: ",encryptedData);

  // console.log("This is the encryptedData -----", JSON.stringify(encryptedData));

  return encryptedData;
};
//? Ending of ***** Encryption and decryption *****

//! Starting of ***** response *****
class sendResponseData {
  constructor(data, status, errMsg) {
    this.data = data;
    // this.isError = isError;
    this.status = status;
    this.errMsg = errMsg;
  }
  success() {
    return {
      data: this.data,
      result: {
        isError: false,
        status: this.status,
        errMsg: null,
      },
    };
  }
  successWithMessage() {
    return {
      data: this.data,
      result: {
        isError: false,
        status: this.status,
        errMsg: this.errMsg,
      },
    };
  }
  error() {
    return {
      data: null,
      result: {
        isError: true,
        status: this.status,
        errMsg: this.errMsg,
      },
    };
  }
}
//? Ending of ***** response *****

app.use(myLogger);
// app.use(decryptionService);
// app.use(encryptionService);

// ! ******* Social Login API *******/ (Encryption done)
app.get("/api/login/success", (req, res) => {
  if (req.session) {
    // res.status(200).json({
    //   data: {
    //     messege: null,
    //   },
    //   result: {
    //     error: false,
    //     message: "Successfully Loged In",
    //     user: req.session,
    //   },
    // });

    let setSendResponseData = new sendResponseData("Success", 200, null);
    let responseToSend = encryptionOfData(setSendResponseData.success());

    res.send(responseToSend);
  } else {
    // res.status(403).json({
    //   data: {
    //     messege: null,
    //   },
    //   result: {
    //     isError: true,
    //     status: 403,
    //     message: "Not Authorized",
    //   },
    // });

    let setSendResponseData = new sendResponseData(null, 403, "Not Authorized");
    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );

    res.send(responseToSend);
  }
});

app.get("/api/login/failed", (req, res) => {
  // res.status(401).json({
  //   data: {
  //     messege: null,
  //   },
  //   result: {
  //     isError: true,
  //     message: "Log in failure",
  //   },
  // });

  let setSendResponseData = new sendResponseData(null, 401, "Log in failure");
  let responseToSend = encryptionOfData(
    setSendResponseData.successWithMessage()
  );

  res.send(responseToSend);
});

app.get("/api/google", passport.authenticate("google", ["profile", "email"]));
app.get(
  "/api/facebook",
  passport.authenticate("facebook", ["profile", "email"])
);

app.get(
  "/api/google/callback",
  passport.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL_DEVELOPMENT,
    failureRedirect: process.env.GOOGLE_FAILED_URL,
    // session: false,
  }),
  async function (req, res) {
    // res.redirect(process.env.CLIENT_URL_DEVELOPMENT);
    // res.redirect("/");
    // console.log(req)
    const userid = req.session.passport.user.googleId;
    const userinfo = req.session.passport.user.profilename;
    // console.log("userid : ", userid, userinfo);
    var options = {
      body: {
        grant_type: "password",
        username: userid,
        password: userid,
        loginMethod: "google",
        profileName: userinfo,
      },
      headers: {
        "user-agent": "Thunder Client (https://www.thunderclient.com)",
        accept: "*/*",
        "content-type": "application/x-www-form-urlencoded",
        authorization: "Basic YXBwbGljYXRpb246c2VjcmV0",
        "content-length": "81",
        "accept-encoding": "gzip, deflate, br",
        host: process.env.SERVER_URL_DEVELOPMENT,
        connection: "close",
      },
      method: "POST",
      query: {},
    };
    let token = await obtainToken(options);
    let foundtoken = token;
    // console.log(" foundtoken -----  ", foundtoken);
    // let tokendata = JSON.stringify(token.data.accessToken);
    // res.json("from obtain token: "+ JSON.stringify(token));

    let setSendResponseData = new sendResponseData(foundtoken);

    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );

    // res.send(responseToSend);

    res.redirect(
      process.env.CLIENT_URL_DEVELOPMENT +
        `login?gusername=${userid}&gobject=${JSON.stringify(
          responseToSend
        )}&profilename=${userinfo}`
    );
  }
);
app.get(
  "/api/facebook/callback",
  passport.authenticate("facebook", {
    // successRedirect: process.env.CLIENT_URL_DEVELOPMENT+"/askdhkasd",
    failureRedirect: process.env.FACEBOOK_FAILED_URL,
  }),
  async function (req, res) {
    // console.log(req);
    // res.redirect('http://www.google.com');
    const userid = req.user.username;
    const profilename = req.user.profilename;
    // console.log("USER ID:   "+ req.user);
    // console.log(req.user.username);
    var options = {
      body: {
        grant_type: "password",
        username: userid,
        password: userid,
        loginMethod: "facebook",
      },
      headers: {
        "user-agent": "Thunder Client (https://www.thunderclient.com)",
        accept: "*/*",
        "content-type": "application/x-www-form-urlencoded",
        authorization: "Basic YXBwbGljYXRpb246c2VjcmV0",
        "content-length": "81",
        "accept-encoding": "gzip, deflate, br",
        host: process.env.SERVER_URL_DEVELOPMENT,
        connection: "close",
      },
      method: "POST",
      query: {},
    };
    // // console.log(res);
    // let token = await obtainToken(options);
    // // obtainToken(options);
    // let foundtoken = token;
    // console.log("from fb callback: " + token);
    // // let tokendata = JSON.stringify(token.data.accessToken);
    // // res.json("from obtain token: "+ JSON.stringify(token));
    // res.redirect(process.env.CLIENT_URL_DEVELOPMENT + `login?fusername=${userid}`);

    let token = await obtainToken(options);
    let foundtoken = token;
    // console.log(" foundtoken -----  ", foundtoken);
    // let tokendata = JSON.stringify(token.data.accessToken);
    // res.json("from obtain token: "+ JSON.stringify(token));

    let setSendResponseData = new sendResponseData(foundtoken);

    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );

    // res.send(responseToSend);

    res.redirect(
      process.env.CLIENT_URL_DEVELOPMENT +
        `login?fusername=${userid}&fobject=${JSON.stringify(
          responseToSend
        )}&fprofilename=${profilename}`
    );
  }
);

// app.get("/api/logout", (req, res) => {
//   // req.logout();
//   // req.session.destroy(function (err) {
//   // 	res.send("logged out!!");
//   // });
//   //   res.redirect(process.env.CLIENT_URL_DEVELOPMENT + "login");
//   // req.session = null;
//   // res.clearCookie();
//   // res.end();
//   //   res.redirect("/");
// });

// ! ******* Clearing previous token data *******/ (Encryption done)
app.post("/api/clearalltoken", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const { username } = req.body;
  try {
    await tokenModel
      .findOneAndDelete({
        username: username,
      })
      .then(async (data) => {
        await signUpTemplateCopy.findOneAndUpdate(
          {
            username: username,
          },
          {
            $set: {
              loggedinID: "",
            },
          }
        );
        let setSendResponseData = new sendResponseData(
          "All session is ended!",
          200,
          null
        );
        let responseToSend = encryptionOfData(setSendResponseData.success());

        res.send(responseToSend);
      })
      .catch((e) => {
        let setSendResponseData = new sendResponseData(
          null,
          404,
          "No data found!"
        );
        let responseToSend = encryptionOfData(
          setSendResponseData.successWithMessage()
        );

        res.send(responseToSend);
      });
  } catch (error) {
    let setSendResponseData = new sendResponseData(null, 500, "Server error!");
    let responseToSend = encryptionOfData(setSendResponseData.error());

    res.send(responseToSend);
  }
});

// ! ******* Email checking API *******/ (Encryption done)
app.post("/api/checkuser", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const user = await signUpTemplateCopy.findOne({
    email: req.body.email,
  });

  if (user) {
    let setSendResponseData = new sendResponseData(
      null,
      409,
      "Email exists in database"
    );
    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );
    res.send(responseToSend);
  } else {
    let setSendResponseData = new sendResponseData("Success", 200, null);
    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );
    res.send(responseToSend);
  }
});

// ! ******* Sign up API *******/ (Encryption done)
app.post("/api/signup", async (req, res, next) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const user = await signUpTemplateCopy.findOne({
    email: req.body.email,
  });

  if (user) {
    let setSendResponseData = new sendResponseData(
      null,
      409,
      "Email exists in database"
    );
    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );

    res.send(responseToSend);
  } else {
    const otpGenerated = generateOTP();
    const signUpUser = new signUpTemplateCopy({
      fullname: req.body.fullname,
      username: req.body.email,
      email: req.body.email,
      password: req.body.password,
      otp: otpGenerated,
    });

    // sendMail({
    //   to: signUpUser.email,
    //   OTP: otpGenerated,
    // });

    // sendSms({
    //   reciever: signUpUser.email,
    //   OTP: otpGenerated,
    // });
    console.log(req.body);
    let smssent = JSON.parse(await sendSms({
      reciever: req.body.phoneNumber,
      OTP: otpGenerated
    }))
    if(smssent.status_code === 200){
      signUpUser.save();
      if (signUpUser) {
        let setSendResponseData = new sendResponseData(
          "User registered!",
          202,
          null
        );
        let responseToSend = encryptionOfData(
          setSendResponseData.successWithMessage()
        );
  
        res.send(responseToSend);
        // res.send({
        //   data: {
        //     message: "User registered!",
        //     // fullname: data.fullname,
        //     // username: data.username,
        //     // email: data.email,
        //     // otp: data.otp, //temporary visible
        //     // createdOn: data.creation_date,
        //   },
        //   result: {
        //     isError: false,
        //     status: 202,
        //     errorMsg: "",
        //   },
        // });
        // })
        // .catch((error) => {
      } else {
        let setSendResponseData = new sendResponseData(null, 500, "Server error");
        let responseToSend = encryptionOfData(setSendResponseData.error());
  
        res.send(responseToSend);
      }
    } else {
      let setSendResponseData = new sendResponseData(null, smssent.status_code, "OTP service down! Please try again later.");
      let responseToSend = encryptionOfData(setSendResponseData.error());

      res.send(responseToSend);
    }
  }
});

// ! ******* verification API *******/ (Encryption done)
app.post("/api/verify", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  // res.json(user);
  let setSendResponseData = new sendResponseData(
    user,
    user.result.status,
    user.result.errorMsg
  );
  let responseToSend = encryptionOfData(
    setSendResponseData.successWithMessage()
  );

  res.send(responseToSend);
});

//! ******* Resend OTP API *******/ (encryption done)
app.post("/api/resend-otp", async (req, res) => {
  // send email adderss to DB and generate an otp then send to that email

  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const user = await signUpTemplateCopy.findOne({
    email: req.body.email,
    active: false,
  });

  if (!user) {
    res.send({
      data: {
        message: "Account not found!",
        otp: null,
      },
      result: {
        isError: false,
        status: 401,
        errorMsg: "Unauthorized",
      },
    });
  } else {
    // Checking OPT try left in user DB
    let otpretrycount = user.otpretrycount;

    if (otpretrycount > 0 && otpretrycount <= 3) {
      otpretrycount--; // Decrementing by 1 for each try
      let OTPtryleft = otpretrycount;
      const otpGenerated = generateOTP(); // Gerenrating a otp

      //   console.log(otpGenerated + "  " + resetOtpCount); // Debugging console view

      let signUpUser = await signUpTemplateCopy.findOneAndUpdate(
        {
          email: req.body.email,
          locked: false,
        },
        {
          $set: {
            otp: otpGenerated,
            otpretrycount: OTPtryleft,
            active: false,
            locked: false,
          },
        }
      ); // Updating user profile DB with new OTP and changing lock status to false

      // sendMail({
      //   to: user.email,
      //   OTP: otpGenerated,
      // }); // Sending OTP to email address

      sendSms({
        reciever: user.email,
        OTP: otpGenerated,
      });

      if (signUpUser) {
        let setSendResponseData = new sendResponseData(
          `${OTPtryleft}`,
          302,
          null
        );
        let responseToSend = encryptionOfData(setSendResponseData.success());

        res.send(responseToSend);
      } // Sending user information as response
      else {
        let setSendResponseData = new sendResponseData(
          null,
          500,
          "Internal Server Error"
        );
        let responseToSend = encryptionOfData(setSendResponseData.error());

        res.send(responseToSend);
      } // Sending Error as response
    } else {
      //   try {

      await signUpTemplateCopy
        .findOneAndDelete({
          email: req.body.email,
        })
        .then(() => {
          let setSendResponseData = new sendResponseData(
            "User account deleted!",
            406,
            "Not Acceptable"
          );
          let responseToSend = encryptionOfData(
            setSendResponseData.successWithMessage()
          );

          res.send(responseToSend);
        });
    }
  }
});

//! ******* users API *******/ (encryption done)
app.post("/api/user", async (req, res, next) => {
  let datas = await signUpTemplateCopy.find();
  try {
    // let allCoursesList = allCourses.coursesData
    let setSendResponseData = new sendResponseData(datas, 200, null);
    let responseToSend = encryptionOfData(setSendResponseData.success());

    res.send(responseToSend);
  } catch (error) {
    let setSendResponseData = new sendResponseData(null, 404, error.message);
    let responseToSend = encryptionOfData(setSendResponseData.success());

    res.send(responseToSend);
  }
});

//! ******* videologdata API *******/
app.post("/api/videologdata", async (req, res) => {
  // console.log("triggered video log");
  // console.log(req);
});

//! ******* certificate API *******/
app.get("/api/certificate", (req, res) => {
  username = "Username here";
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // The name
  // const name = req.body.name;
  const name = username;

  // Pipe the PDF into an name.pdf file
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${name}.pdf`);
  doc.pipe(res);
  // Draw the certificate image
  doc.image("./images/certificate.png", 0, 0, { width: 842 });

  // Set the font to Dancing Script
  doc.font("./fonts/DancingScript-VariableFont_wght.ttf");

  // Draw the name
  doc.fontSize(60).text(name, 20, 265, {
    align: "center",
  });

  // Draw the date
  doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -450, 470, {
    align: "center",
  });

  // Finalize the PDF and end the stream
  doc.end();
  // getCertificate("shishir");
  console.log("certificate is here");
});

//! ******* obtainToken/LOGIN API *******/
app.post("/api/oauth/token", async (req, res, next) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(recievedResponseData);

  req.headers["Content-type"] = "application/x-www-form-urlencoded";

  let object = req.body;

  let upObj = object.split("&");
  let jsonData = {};

  for (let i = 0; i < upObj.length; i++) {
    let upObject = upObj[i].split("=");
    jsonData[upObject[0]] = upObject[1];
  }

  req.body = jsonData;

  await signUpTemplateCopy
    .findOne({
      username: req.body.username,
    })
    .then(async (data) => {
      if (!data) {
        let setSendResponseData = new sendResponseData(
          null,
          401,
          "No user found!"
        );
        let responseToSend = encryptionOfData(
          setSendResponseData.successWithMessage()
        );

        res.send(responseToSend);
      } else {
        // const inMatch = await bcrypt.compare(req.body.password, data.password)
        await bcrypt
          .compare(req.body.password, data.password)
          .then((result) => {
            if (result) {
              let token = obtainToken(req, res, async (obj) => {
                let userLoginInfo = await signUpTemplateCopy.findOne({
                  username: req.body.username,
                });

                if (!userLoginInfo.loggedinID) {
                  const newId = uuidv4();
                  await userLoginInfo.updateOne({
                    loggedinID: newId,
                  });
                  console.log("\ntrying to send response", obj);
                  let setSendResponseData = new sendResponseData(
                    obj,
                    200,
                    null
                  );
                  let responseToSend = encryptionOfData(
                    setSendResponseData.successWithMessage()
                  );
                  console.log("successfull login");
                  res.send(responseToSend);
                } else {
                  let setSendResponseData = new sendResponseData(
                    obj,
                    409,
                    "An active session found!"
                  );
                  let responseToSend = encryptionOfData(
                    setSendResponseData.error()
                  );

                  res.send(responseToSend);
                }
              });
            } else {
              let setSendResponseData = new sendResponseData(
                null,
                401,
                "Password incorrect!"
              );
              let responseToSend = encryptionOfData(
                setSendResponseData.error()
              );

              res.send(responseToSend);
            }
            // let token = obtainToken(req, res, async (obj) => {
            //   let userLoginInfo = await signUpTemplateCopy.findOne({
            //     username: req.body.username,
            //   });

            //   if (!userLoginInfo.loggedinID) {
            //     const newId = uuidv4();
            //     await userLoginInfo.updateOne({
            //       loggedinID: newId,
            //     });
            //     // console.log("\ntrying to send response", obj);
            //     let setSendResponseData = new sendResponseData(
            //       obj,
            //       403,
            //       "Active Session found"
            //     );
            //     let responseToSend = encryptionOfData(
            //       setSendResponseData.successWithMessage()
            //     );
            //     console.log("Active Session found");
            //     res.send(responseToSend);
            //   } else {
            //     let setSendResponseData = new sendResponseData(
            //       obj,
            //       409,
            //       "An active session found!"
            //     );
            //     let responseToSend = encryptionOfData(setSendResponseData.error());

            //     res.send(responseToSend);
            //   }
            // });
          })
          .catch((e) => {
            let setSendResponseData = new sendResponseData(
              "Error in password decryption",
              500,
              e.message
            );
            let responseToSend = encryptionOfData(setSendResponseData.error());

            res.send(responseToSend);
          });
      }
    })
    .catch((e) => {
      console.log("Inside catch of API", e.message);
      let setSendResponseData = new sendResponseData(null, 500, e.message);
      let responseToSend = encryptionOfData(setSendResponseData.error());

      res.send(responseToSend);
    });
});

//! ******* User Profile API *******/
// app.post("/api/userprofile", async (req, res) => {
//   var request = new Request(req);
//   var response = new Response(res);

//   const fromClient = request.headers.authorization;
//   var tokenArray = fromClient.split(" ");
//   var token = tokenArray[1];
//   var tokenObj = {
//     accessToken: token,
//   };

//   revokeToken(tokenObj);

//   let anytoken = await tokenModel.findOne({ accessToken: token });

//   // await signUpTemplateCopy.findOneAndUpdate({
//   //   username: anytoken.user.username
//   // },
//   // {$set:{
//   //   loggedinID: ""
//   // }})
//   // console.log(anytoken);
//   if (anytoken) {
//     // console.log("showing if any token is available: ",anytoken);
//     res.json({
//       data: {
//         message: "Token removed!",
//       },
//       result: {
//         isError: false,
//         status: 200,
//         errorMsg: "",
//       },
//     });
//   } else {
//     res.json({
//       data: {
//         message: null,
//       },
//       result: {
//         isError: false,
//         status: 200,
//         errorMsg: "Token not found. Already logged out!",
//       },
//     });
//   }
// });


app.post("/api/userprofile", async (req, res) => {

  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));


  try {
    let userProfileData = await signUpTemplateCopy.findOne({
      username:req.body.username
    })

    if(userProfileData){

      let setSendResponseData = new sendResponseData(
        userProfileData,
        200,
        null
        );
        let responseToSend = encryptionOfData(setSendResponseData.success());
        res.send(responseToSend);
        
      } else {
        let setSendResponseData = new sendResponseData(
          null,
          404,
          "user not found!"
          );
          let responseToSend = encryptionOfData(setSendResponseData.successWithMessage());
          res.send(responseToSend);
      }
    
  } catch (error) {
    let setSendResponseData = new sendResponseData(
      "",
      500,
      error
    );
    let responseToSend = encryptionOfData(setSendResponseData.error());
    res.send(responseToSend);
  }

})

var upload = multer({ dest: "userProfilepictures/" })

app.post("/api/uploadimage",upload.single('image'), async (req, res) => {
  if(!req.file){
    res.send("failed to upload");
  } else {
    let userProfileUpdate = await signUpTemplateCopy.findOneAndUpdate({
      username:req.body.username
    },
    {$set:{
      profilephoto: req.file.path
    }})
    console.log(userProfileUpdate);
    res.send("uploaded");
  }
})
app.post("/api/updateuserprofile", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));


  try {
    let userProfileData = await signUpTemplateCopy.findOneAndUpdate({
      username:req.body.username
    },{
      $set:{
        profession: req.body.profession,
        age: req.body.age
      }
    })

    if(userProfileData){

      let setSendResponseData = new sendResponseData(
        userProfileData,
        200,
        null
        );
        let responseToSend = encryptionOfData(setSendResponseData.success());
        res.send(responseToSend);
        
      } else {
        let setSendResponseData = new sendResponseData(
          null,
          404,
          "user not found!"
          );
          let responseToSend = encryptionOfData(setSendResponseData.successWithMessage());
          res.send(responseToSend);
      }
    
  } catch (error) {
    let setSendResponseData = new sendResponseData(
      "",
      500,
      error
    );
    let responseToSend = encryptionOfData(setSendResponseData.error());
    res.send(responseToSend);
  }

})

//! ******* logout API *******/ (encryption done)
app.post("/api/logout", async (req, res) => {
  // let recievedResponseData = decryptionOfData(req, res);
  // req.body = JSON.parse(JSON.parse(recievedResponseData));

  var request = new Request(req);
  // var response = new Response(res);
  // console.log("request.headers.authorization",request);
  try {
    const fromClient = request.headers.authorization;
    console.log("fromClient", fromClient);
    if (fromClient) {
      var tokenArray = fromClient.split(" ");
      var token = tokenArray[1];
      var tokenObj = {
        accessToken: token,
      };
      console.log("tokenObj", tokenObj);
      revokeToken(tokenObj);

      let anytoken = await tokenModel.findOne({ accessToken: token });

      try {
        if (anytoken) {
          let setSendResponseData = new sendResponseData(
            "Log out successfull",
            200,
            null
          );
          let responseToSend = encryptionOfData(setSendResponseData.success());

          res.send(responseToSend);
        } else {
          let setSendResponseData = new sendResponseData(
            null,
            404,
            "Token not found. Already logged out!"
          );
          let responseToSend = encryptionOfData(
            setSendResponseData.successWithMessage()
          );

          res.send(responseToSend);
        }
      } catch (error) {
        let setSendResponseData = new sendResponseData(
          null,
          500,
          error.message
        );
        let responseToSend = encryptionOfData(setSendResponseData.error());

        res.send(responseToSend);
      }
    } else {
      let setSendResponseData = new sendResponseData(null, 404, "No token!");
      let responseToSend = encryptionOfData(setSendResponseData.error());

      res.send(responseToSend);
    }
  } catch {
    let setSendResponseData = new sendResponseData(
      null,
      500,
      "Error on server side"
    );
    let responseToSend = encryptionOfData(setSendResponseData.error());

    res.send(responseToSend);
  }
});

//! ******* Forget password API *******/
app.post("/api/forget-password", async (req, res) => {
  // console.log("send email adderss to DB and generate an otp then send to that email");

  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const user = await signUpTemplateCopy.findOne({
    email: req.body.email,
    locked: false,
  });

  if (!user) {
    let setSendResponseData = new sendResponseData(
      null,
      404,
      "Account not found or is locked"
    );
    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );
    res.send(responseToSend);
  } else {
    // Checking OPT try left in user DB
    let resetOtpCount = user.resetotpcount;

    if (resetOtpCount > 0 && resetOtpCount <= 3) {
      resetOtpCount--; // Decrementing by 1 for each try
      let OTPtryleft = resetOtpCount;
      const otpGenerated = generateOTP(); // Gerenrating a otp

      console.log(otpGenerated + "  " + resetOtpCount); // Debugging console view

      let signUpUser = await signUpTemplateCopy.findOneAndUpdate(
        {
          email: req.body.email,
          locked: false,
        },
        {
          $set: {
            otp: otpGenerated,
            resetotpcount: resetOtpCount,
            active: false,
            locked: false,
          },
        }
      ); // Updating user profile DB with new OTP and changing lock status to false

      // sendMail({
      //   to: user.email,
      //   OTP: otpGenerated,
      // }); // Sending OTP to email address

      sendSms({
        reciever: user.email,
        OTP: otpGenerated,
      });

      if (signUpUser) {
        let setSendResponseData = new sendResponseData("OTP sent!", 202, null);
        let responseToSend = encryptionOfData(setSendResponseData.success());

        res.send(responseToSend);
      } // Sending user information as response
      else {
        let setSendResponseData = new sendResponseData(
          null,
          500,
          "Internal server error"
        );
        let responseToSend = encryptionOfData(setSendResponseData.error());

        res.send(responseToSend);
      } // Sending Error as response
    } else {
      let signUpUser = await signUpTemplateCopy.findOneAndUpdate(
        {
          email: req.body.email,
          locked: false,
        },
        {
          $set: {
            resetotpcount: 3,
            active: false,
            locked: true,
          },
        }
      ); // Updating User Info in DB (Account Locked as max try done)

      if (signUpUser) {
        let setSendResponseData = new sendResponseData(
          "Account locked! You have used max OTP request",
          403,
          null
        );
        let responseToSend = encryptionOfData(
          setSendResponseData.successWithMessage()
        );

        res.send(responseToSend);
      } // Sending Max OTP try messge as response
      else {
        let setSendResponseData = new sendResponseData(
          null,
          401,
          "Unauthorized"
        );
        let responseToSend = encryptionOfData(
          setSendResponseData.successWithMessage()
        );

        res.send(responseToSend);
      } // Sending error as response
    }
  }
});

app.post("/api/request-password", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const { email, otp } = req.body; //getting data from request
  const user = await validateUserSignUp(email, otp); //validating user with OTP
  // res.json(user); //Sending response
  let setSendResponseData = new sendResponseData(user, 200, null);
  let responseToSend = encryptionOfData(setSendResponseData.success());

  res.send(responseToSend);
});
//! ******* Resend OTP API *******/ (encryption done)
app.post("/api/resend-otp-forgotpassword", async (req, res) => {
  // send email adderss to DB and generate an otp then send to that email

  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const user = await signUpTemplateCopy.findOne({
    email: req.body.email,
    active: false,
  });

  if (!user) {
    res.send({
      data: {
        message: "Account not found!",
        otp: null,
      },
      result: {
        isError: false,
        status: 401,
        errorMsg: "Unauthorized",
      },
    });
  } else {
    // Checking OPT try left in user DB
    let otpretrycount = user.otpretrycount;

    if (otpretrycount > 0 && otpretrycount <= 3) {
      otpretrycount--; // Decrementing by 1 for each try
      let OTPtryleft = otpretrycount;
      const otpGenerated = generateOTP(); // Gerenrating a otp

      //   console.log(otpGenerated + "  " + resetOtpCount); // Debugging console view

      let signUpUser = await signUpTemplateCopy.findOneAndUpdate(
        {
          email: req.body.email,
          locked: false,
        },
        {
          $set: {
            otp: otpGenerated,
            otpretrycount: OTPtryleft,
            active: false,
            locked: false,
          },
        }
      ); // Updating user profile DB with new OTP and changing lock status to false

      sendMail({
        to: user.email,
        OTP: otpGenerated,
      }); // Sending OTP to email address

      if (signUpUser) {
        let setSendResponseData = new sendResponseData(
          `${OTPtryleft}`,
          302,
          null
        );
        let responseToSend = encryptionOfData(setSendResponseData.success());

        res.send(responseToSend);
      } // Sending user information as response
      else {
        let setSendResponseData = new sendResponseData(
          null,
          500,
          "Internal Server Error"
        );
        let responseToSend = encryptionOfData(setSendResponseData.error());

        res.send(responseToSend);
      } // Sending Error as response
    } else {
      //   try {

      await signUpTemplateCopy
        .findOneAndUpdate(
          {
            email: req.body.email,
          },
          {
            $set: {
              locked: true,
            },
          }
        )
        .then(() => {
          let setSendResponseData = new sendResponseData(
            "User account deleted!",
            406,
            "Not Acceptable"
          );
          let responseToSend = encryptionOfData(
            setSendResponseData.successWithMessage()
          );

          res.send(responseToSend);
        });
    }
  }
});
app.post("/api/reset-password", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  const { email, otp } = req.body;

  let newPassword = await bcrypt.hash(req.body.password, 12);
  const user = await signUpTemplateCopy.findOneAndUpdate(
    {
      email: email,
      otp: otp,
    },
    {
      password: newPassword,
    }
  );
  if (!user) {
    let setSendResponseData = new sendResponseData(
      null,
      404,
      "Account not found or is locked"
    );
    let responseToSend = encryptionOfData(
      setSendResponseData.successWithMessage()
    );
    res.send(responseToSend);
  } else {
    let setSendResponseData = new sendResponseData(
      "Password reset successful!",
      202,
      null
    );
    let responseToSend = encryptionOfData(setSendResponseData.success());
    res.send(responseToSend);
  }
});
/**************/

//! ******** Course VIDEO API ******** (encryption done)
app.post("/api/allcourses", (req, res, next) => {
  try {
    let setSendResponseData = new sendResponseData(allCourses, 200, null);
    let responseToSend = encryptionOfData(setSendResponseData.success());

    res.send(responseToSend);
  } catch (error) {
    let setSendResponseData = new sendResponseData(null, 404, error);

    let responseToSend = encryptionOfData(setSendResponseData.error());

    res.send(responseToSend);
  }
});

app.post("/api/course", async (req, res) => {
  let recievedResponseData = decryptionOfData(req, res);
  req.body = JSON.parse(JSON.parse(recievedResponseData));

  let courseid = req.body.courseID;
  try {
    // let tokenCheckingResult = await tokenChecking(req, res);
    // console.log(tokenCheckingResult.result.isError);
    // if (!tokenCheckingResult.result.isError) {
    // let grabCourse = coursesData.coursesData;
    let result = allCourses.coursesData.find(
      (item) => item.courseID === courseid
    );
    if (result) {
      res.json({
        data: {
          message: result,
        },
        result: {
          isError: false,
          status: 200,
          errMsg: "",
        },
      });
    } else {
      res.json({
        data: {
          message: null,
        },
        result: {
          isError: false,
          status: 404,
          errMsg: "No data found!",
        },
      });
    }

    // } else {
    //   res.json({
    //     data: {
    //       courseData: null,
    //     },
    //     result: {
    //       isError: false,
    //       status: 400,
    //       errMsg: "Unauthorized Token",
    //     },
    //   });
    // }
  } catch (error) {
    res.json({
      data: {
        message: null,
      },
      result: {
        isError: true,
        status: 500,
        errMsg: error,
      },
    });
  }
});

app.post("/api/addcoursedata", async (req, res) => {
  const data = req.body; //getting data from request

  await courseIdList
    .insertMany(data)
    .then(() => {
      res.send("Data inserted!");
    })
    .catch((err) => {
      res.send(err);
    });
});

//! ********** Instructor part ***********/

app.post("/api/allinstructors", (req, res) => {
  try {
    res.json({
      data: {
        instructorData: allInstructors,
      },
      result: {
        isError: false,
        status: 200,
        errMsg: null,
      },
    });
  } catch (error) {
    res.json({
      data: {
        courseData: null,
      },
      result: {
        isError: true,
        status: 500,
        errMsg: "server error",
      },
    });
  }
});

app.post("/api/instructor", (req, res) => {
  let instructorID = req.body.instructorID;

  try {
    let result = allInstructors.instructorData.find(
      (item) => item._id === instructorID
    );
    if (result) {
      res.json({
        data: {
          message: result,
        },
        result: {
          isError: false,
          status: 200,
          errMsg: null,
        },
      });
    } else {
      res.json({
        data: {
          message: null,
        },
        result: {
          isError: false,
          status: 404,
          errMsg: "No data found for this ID",
        },
      });
    }
  } catch (error) {
    res.json({
      data: {
        message: null,
      },
      result: {
        isError: true,
        status: 404,
        errMsg: error,
      },
    });
  }
});

//! ********** Purchase A course ***********/ (Encryption done)

// app.post("/api/buy", async (req, res) => {

//   let tokenstatus = await tokenChecking(req,res);

//   console.log("token status: ---- ", tokenstatus);

//   if(tokenstatus){
//     let recievedResponseData = decryptionOfData(req, res);
//     req.body = JSON.parse(JSON.parse(recievedResponseData));

//     // const { email, courseList } = req.body; //getting data from request
//     const email = req.body.email;
//     const courseList = req.body.courseList;

//     console.log("data - ", req.body);

//     let currentDate = new Date();
//     let currentDateMiliseconds = currentDate.getTime();

//     let courseExpiresMiliseconds =
//       currentDateMiliseconds + 90 * 24 * 60 * 60 * 1000;
//     let courseExpires = new Date(courseExpiresMiliseconds);

//     await signUpTemplateCopy
//       .findOneAndUpdate(
//         {
//           email: email,
//         },
//         {
//           $push: {
//             purchasedCourses: {
//               courseid: courseList,
//               purchaseDate: currentDate,
//               expireAt: courseExpires,
//             },
//           },
//         }
//       )
//       .then(() => {
//         // res.send("inserted");
//         let setSendResponseData = new sendResponseData("Inserted", 200, null);
//         let responseToSend = encryptionOfData(
//           setSendResponseData.successWithMessage()
//         );
//         res.send(responseToSend);
//       })
//       .catch((err) => {
//         // res.send("error", err);
//         let setSendResponseData = new sendResponseData(null, 500, err.message);
//         let responseToSend = encryptionOfData(
//           setSendResponseData.error()
//         );
//         res.send(responseToSend);
//       });
//   } else {
//     let setSendResponseData = new sendResponseData(null, 401, "Unauthorized");
//     let responseToSend = encryptionOfData(
//       setSendResponseData.error()
//     );
//     res.send(responseToSend);
//   }

// });

//! ********** Token portoion ***********/

const validateUserSignUp = async (email, otp) => {
  const user = await signUpTemplateCopy.findOne({
    email,
  });
  if (!user) {
    let msg = {
      data: null,
      result: {
        isError: true,
        status: 404,
        errorMsg: "User not found",
      },
    };
    return msg;
  } else if (user && user.otp !== otp) {
    let msg = {
      data: null,
      result: {
        isError: true,
        status: 406,
        errorMsg: "Invalid OTP | Not Acceptable",
      },
    };
    return msg;
  } else {
    const updatedUser = await signUpTemplateCopy.findByIdAndUpdate(user._id, {
      $set: {
        active: true,
      },
    });
    let msg = {
      data: `${updatedUser.email} is now active!`,
      result: {
        isError: false,
        status: 202,
        errorMsg: "",
      },
    };
    return msg;
  }
};

async function tokenChecking(req, res) {
  var request = new Request(req);
  const fromClient = request.headers.authorization;

  if (fromClient) {
    var tokenArray = fromClient.split(" ");
    var token = tokenArray[1];
    let tokenObj = await tokenModel.findOne({
      accessToken: token,
    });
    if (tokenObj) {
      let currentDate = new Date().getTime();
      let tokenExpires = new Date(tokenObj.accessTokenExpiresAt).getTime();
      let expiry = (tokenExpires - currentDate) / 1000;

      if (expiry < 0) {
        let tokenExpiryStatus = {
          data: null,
          result: {
            isError: true,
            status: 400,
            errMsg: "token is expired",
          },
        };
        console.log("Token expired");
        return tokenExpiryStatus;
        // return false;
      } else {
        let tokenExpiryStatus = {
          data: tokenObj,
          result: {
            isError: false,
            status: 200,
            errMsg: "Token is still active",
          },
        };
        console.log("Token is still active");
        return tokenExpiryStatus;
        // return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

app.oauth = new OAuth2Server({
  model: require("./auth/model"),
  accessTokenLifetime: process.env.ACCESS_TOKEN_LIFETIME,
  allowBearerTokensInQueryString: true,
});

function obtainToken(req, res, callback) {
  var request = new Request(req);
  var response = new Response(res);

  return app.oauth
    .token(request, response)
    .then(function (token) {
      let tokenDetails = {
        access_token: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refresh_token: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        user: token.user.username,
        expiryTime: token.expiryTime,
      };

      let sendResponse = {
        data: tokenDetails,
        result: {
          isError: false,
          status: 200,
          errorMsg: "",
        },
      };
      console.log("Send response ---- ", sendResponse, "Re --", request.body);
      if (request.body.loginMethod === "google") {
        console.log("Inside google method", sendResponse);
        return sendResponse;
      } else if (request.body.loginMethod === "facebook") {
        // console.log("sent from fb" + sendResponse);
        return sendResponse;
      } else {
        callback(sendResponse);
      }
    })
    .catch(function (err) {
      console.log("this is inside token catch!", err.message);

      let setSendResponseData = new sendResponseData(null, 404, err.message);
      let responseToSend = encryptionOfData(setSendResponseData.error());

      // return responseToSend;
      res.send(responseToSend);
    });
}

//! Payment API's SSLcommerz

app.post("/api/buy", async (req, res) => {
  let tokenstatus = await tokenChecking(req, res);

  console.log("token status: ---- ", tokenstatus);

  if (tokenstatus) {
    let recievedResponseData = decryptionOfData(req, res);
    req.body = JSON.parse(JSON.parse(recievedResponseData));

    // const { email, courseList } = req.body; //getting data from request
    const name = req.body.user;
    const phone = "01234567891";
    const email = "test@test.com";
    const courseList = req.body.courseList;
    const total = 1000;

    console.log("data - ", req.body);

    const data = {
      total_amount: parseFloat(total),
      currency: "BDT",
      tran_id: "REF123",
      success_url: `${process.env.ROOT}/api/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/api/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/api/ssl-payment-cancel`,
      ipn_url: `${process.env.ROOT}/api/ssl-payment-notification`,
      shipping_method: "No",
      product_name: "Meditation course",
      product_category: "Courses",
      product_profile: "general",
      cus_name: name,
      cus_email: email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: phone,
      cus_fax: "01711111111",
      multi_card_name: "mastercard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    ); //true for live default false for sandbox
    sslcommerz.init(data).then((data) => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters

      // console.log("ssl data", data);

      if (data?.GatewayPageURL) {
        //     let currentDate = new Date();
        // let currentDateMiliseconds = currentDate.getTime();

        // let courseExpiresMiliseconds =
        //   currentDateMiliseconds + 90 * 24 * 60 * 60 * 1000;
        // let courseExpires = new Date(courseExpiresMiliseconds);

        // let updatedUserData = signUpTemplateCopy.findOneAndUpdate(
        //   {
        //     email: email,
        //   },
        //   {
        //     $set: {
        //       purchasedCourses:  courseList,
        //         // purchaseDate: currentDate,
        //         // expireAt: courseExpires,
        //       // },
        //     },
        //   }
        // );
        console.log(" Not inside ");
        console.log(data?.GatewayPageURL);

        let setSendResponseData = new sendResponseData(data, 202, null);
        let responseToSend = encryptionOfData(setSendResponseData.success());
        res.send(responseToSend);

        // return res.send(data?.GatewayPageURL)
      } else {
        return res.status(400).json({
          message: "Session was not successful",
        });
      }
    });

    // let currentDate = new Date();
    // let currentDateMiliseconds = currentDate.getTime();

    // let courseExpiresMiliseconds =
    //   currentDateMiliseconds + 90 * 24 * 60 * 60 * 1000;
    // let courseExpires = new Date(courseExpiresMiliseconds);

    // let updatedUserData = await signUpTemplateCopy.findOneAndUpdate(
    //   {
    //     email: email,
    //   },
    //   {
    //     $push: {
    //       purchasedCourses: {
    //         courseid: courseList,
    //         purchaseDate: currentDate,
    //         expireAt: courseExpires,
    //       },
    //     },
    //   }
    // );
  } else {
    let setSendResponseData = new sendResponseData(null, 401, "Unauthorized");
    let responseToSend = encryptionOfData(setSendResponseData.error());
    res.send(responseToSend);
  }
});

app.post("/api/ssl-payment-notification", async (req, res) => {
  /**
   * If payment notification
   */

  return res.status(200).json({
    data: req.body,
    message: "Payment notification",
  });
});

app.post("/api/ssl-payment-success", async (req, res) => {
  /**
   * If payment successful
   */
  //  let recievedResponseData = decryptionOfData(req, res);
  //  req.body = JSON.parse(JSON.parse(recievedResponseData));
  // console.log("payment success response : ", req.body);

  return res.status(200).json({
    data: req.body,
    message: "Payment success",
  });
});

app.post("/api/ssl-payment-fail", async (req, res) => {
  /**
   * If payment failed
   */
  //  console.log("payment fail response : ", req.body);

  return res.status(200).json({
    data: req.body,
    message: "Payment failed",
  });
});

app.post("/api/ssl-payment-cancel", async (req, res) => {
  /**
   * If payment cancelled
   */

  return res.status(200).json({
    data: req.body,
    message: "Payment cancelled",
  });
});

//! ********** Review part ***********/
app.post("/api/give-a-review", async (req, res) => {
  try {
    let recievedResponseData = decryptionOfData(req, res);
    req.body = JSON.parse(JSON.parse(recievedResponseData));

    let reviewData = new reviews({
      courseID: req.body.courseID,
      username: req.body.username,
      review: req.body.review,
    });

    reviewData.save();

    if (reviewData) {
      let setSendResponseData = new sendResponseData(
        "review submitted",
        200,
        ""
      );
      let responseToSend = encryptionOfData(setSendResponseData.success());
      res.send(responseToSend);
    } else {
      let setSendResponseData = new sendResponseData(
        "review submission failed",
        400,
        ""
      );
      let responseToSend = encryptionOfData(setSendResponseData.success());
      res.send(responseToSend);
    }
  } catch (error) {
    //* For postman response
    let setSendResponseData = new sendResponseData(null, 500, error);
    let responseToSend = encryptionOfData(setSendResponseData.error());
    res.send(responseToSend);
  }
});

//! ********** get a users all reviews part ***********/

app.post("/api/user-reviews", async (req, res) => {
  try {
    let recievedResponseData = decryptionOfData(req, res);
    req.body = JSON.parse(JSON.parse(recievedResponseData));

    let reviewData = await reviews.find({
      username: req.body.username
    })

    if (reviewData) {
      let setSendResponseData = new sendResponseData(
        reviewData,
        200,
        ""
      );
      let responseToSend = encryptionOfData(setSendResponseData.success());
      res.send(responseToSend);
    } else {
      let setSendResponseData = new sendResponseData(
        "review submission failed",
        400,
        ""
      );
      let responseToSend = encryptionOfData(setSendResponseData.success());
      res.send(responseToSend);
    }
  } catch (error) {
    let setSendResponseData = new sendResponseData(null, 500, error);
    let responseToSend = encryptionOfData(setSendResponseData.error());
    res.send(responseToSend);
  }
});

//! Testing point

app.get("/api/atesting", async (req, res) => {
res.send("I'm on!")
});
app.post("/api/keepalive", async (req, res) => {
res.send("I'm on!")
});
app.post("/api/atestingpoint", async (req, res) => {

  const id = crypto.randomBytes(10).toString("hex");

  let smssent = JSON.parse(await sendSms({
    reciever: "8801515212628",
    OTP: id
  }))
  // console.log((smssent).status_code);
  if(smssent.status_code === 200){

    res.send("sms is sent")
  } else {
    res.send(`Failed with status code `+smssent.status_code)
  }
});

// app.use(encryptionService);

let port = process.env.PORT;
app.listen(port, () => {
  console.log("server is up and running " + port);
});

// module.exports = router

// ! updated 3 sep
