import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Icon from "@mui/material/Icon";
import { useState, useContext } from "react";
import api, { login } from "../../api/Axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import "./LoginForm.css";
import LocalStorageService from "../../api/localstorage";
import { useEffect } from "react";
import {
  Alert,
  AlertTitle,
  InputAdornment,
  Collapse,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { globalContext } from "../../pages/GlobalContext";
import JsonFormatter from "../../api/jsonFormatter";
import swal from "sweetalert";
import { multiStepContext } from "../../pages/StepContext";
import { MuiTelInput } from "mui-tel-input";

var CryptoJS = require("crypto-js");

// Generate random 16 bytes to use as IV
var IV = CryptoJS.enc.Utf8.parse("1583288699248111");

var keyString = "thisIsAverySpecialSecretKey";
// finds the SHA-256 hash for the keyString
var Key = CryptoJS.SHA256(keyString);

const LOGIN_URL = `/api/oauth/token`;
const SESSION_CLEAR = `/api/clearalltoken`;

const theme = createTheme();

const LoginForm = (props) => {
   
  const { t } = useContext(globalContext);
  const {
    userRef,
    emailRef,
    errRef,
    validName,
    setValidName,
    userFocus,
    setUserFocus,
    validEmail,
    setValidEmail,
    setPwd,
    validPwd,
    setValidPwd,
    pwdFocus,
    setPwdFocus,
    validMatch,
    setValidMatch,
    matchFocus,
    setMatchFocus,   
    setUser,
    matchPwd,
    setMatchPwd,addUserobj,phone, setPhone,validPhone, phoneFocus,setPhoneFocus
  } = useContext(multiStepContext);

    // mui telnet
    const handleChange = (newPhone) => {
      setPhone(newPhone);
      // console.log(phone)
    }
  const search = useLocation().search;
  const nameg = new URLSearchParams(search).get("gusername");
  const gobject = new URLSearchParams(search).get("gobject");
  const gprofilename = new URLSearchParams(search).get("profilename");
  const namef = new URLSearchParams(search).get("fusername");
  const fobject = new URLSearchParams(search).get("fobject");
  const fprofilename = new URLSearchParams(search).get("fprofilename");

  const [currentuser, setCurrentuser] = useState("");
  const [gName, setGname] = useState("");
  const [fName, setFname] = useState("");
  // const [fName, setfname] = useState('');

  let obj = JSON.parse(JSON.parse(JSON.stringify(gobject)));
  let fbObj = JSON.parse(JSON.parse(JSON.stringify(fobject)));

  // console.log("nameg Object is ------ ", nameg);
  // console.log("gobject Object is ------ ", gobject);


  // console.log("namef Object is ------ ", namef);
  // console.log("fobject Object is ------ ", fbObj);

  if (obj) {
    obj.request.ct = obj.request.ct.replaceAll(" ", "+");
    console.log("updated gobject Object is ------ ", obj);

    if (gobject !== null) {
      const { request, passphase } = obj;

      let decryptedFromText = CryptoJS.AES.decrypt(
        JsonFormatter.parse(JSON.stringify(request)),
        Key,
        { iv: IV }
      );

      // console.log("decryptedFromText   -------   ", decryptedFromText);

      let recievedData = decryptedFromText.toString(CryptoJS.enc.Utf8);

      // console.log("recievedData   -------   ", JSON.parse(recievedData));

      let googleData = JSON.parse(recievedData);

      const localStorageService = LocalStorageService.getService();
      // console.log("Google data : ", googleData.data.result.isError);

      if (googleData.data.result.isError === false) {
        console.log("accesstoken  data : ", googleData.data.data.access_token);
        setCurrentuser(gprofilename);
        setGname(setGname);
        localStorageService.setToken(googleData.data.data);
        console.log(googleData.reslut);
        window.opener.location.reload();
        window.close();
      }
    }
  } else if (fbObj) {
    fbObj.request.ct = fbObj.request.ct.replaceAll(" ", "+");
    // console.log("updated gobject Object is ------ ", obj);

    if (fobject !== null) {
      const { request, passphase } = fbObj;

      let decryptedFromText = CryptoJS.AES.decrypt(
        JsonFormatter.parse(JSON.stringify(request)),
        Key,
        { iv: IV }
      );

      // console.log("decryptedFromText   -------   ", decryptedFromText);

      let recievedData = decryptedFromText.toString(CryptoJS.enc.Utf8);

      // console.log("recievedData   -------   ", JSON.parse(recievedData));

      let facebookData = JSON.parse(recievedData);

      const localStorageService = LocalStorageService.getService();
      // console.log("facebook data : ", facebookData.data);

      if (facebookData.data.result.isError === false) {
        // console.log("accesstoken  data : ", facebookData.data.data.access_token);
        setCurrentuser(fprofilename);
        setGname(setFname);
        localStorageService.setToken(facebookData.data.data);
        // console.log(facebookData.reslut);
        window.opener.location.reload();
        window.close();
      }
    }
  }

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(true);
  const [sessionFound, setSessionFound] = useState(false);
  //to show pass
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //

  const googleAuth = () => {
    var w = 620;
    var h = 575;
    var left = (window.screen.width - w) / 2;
    var top = (window.screen.height - h) / 2;

    window.open(
      `${process.env.REACT_APP_API_URL}/api/google`,
      "",
      `width=${w}, 
      height=${h}, 
      top=${top}, 
      left=${left}`
    );
  };
  const facebookAuth = () => {
    var w = 620;
    var h = 575;
    var left = (window.screen.width - w) / 2;
    var top = (window.screen.height - h) / 2;
    window.open(
      `${process.env.REACT_APP_API_URL}/api/facebook/callback`,
      "",
      `width=${w}, 
      height=${h}, 
      top=${top}, 
      left=${left}`
    );
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(username, password, (response) => {
      const localStorageService = LocalStorageService.getService();
      // console.log("response ", response);

      if (response.data.result.status === 409) {
        setSessionFound(true);
        setErrMsg(response.data.result.errMsg);
      } else if (response.data.result.status === 200) {
        setCurrentuser(response.data.data.data.user);
        localStorageService.setToken(response.data.data.data);
        if (response.data.data.data.user) {
          // setMail(username)
          // window.location.href = "/courses";
          addUserobj(response.data.data.data);
          navigate("/courses")
          // <Navigate to="/courses" />
        }
      } else if (response.data.result.status === 401) {
        setErrMsg(response.data.result.errMsg);
        swal("Invalid!", `${response.data.result.errMsg}`, "warning");
      } else {
        setErrMsg(response.data.result.errMsg);
        swal("Error!", `${response.data.result.errMsg}`, "error");
      }
    });
  };

  const clearSession = async () => {
    const response = await api
      .post(SESSION_CLEAR, JSON.stringify({ username }), {
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Credentials": true,
      })
      .then((response) => {
        setSessionFound(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        swal("You are already logged out!", "Please login again!", "error");
        setTimeout(function () {
          window.location.href = "/login";
        }, 2000);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mb: 35 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "primary.main", p: 3 }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("login")}
          </Typography>
          <Grid
            container
            className="SocialContainer"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, display: "flex", flexDirection: "row" }}
              onClick={googleAuth}
            >
              <GoogleIcon
                className="Icons"
                style={{ color: "white", fontSize: "2rem", margin: "0px 10px" }}
              />
              <Typography sx={{ color: "white", fontSize: "1rem" }}>
                {t("login_with_gmail")}
              </Typography>
              {/* </Link> */}
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={facebookAuth}
            >
              <FacebookIcon
                className="Icons"
                style={{ color: "white", fontSize: "2rem", margin: "0px 10px" }}
              />
              <Typography sx={{ color: "white", fontSize: "1rem" }}>
                {t("login_with_facebook")}
              </Typography>
            </Button>
            <Typography component="p" variant="p" sx={{ textAlign: "center" }}>
              {t("or")} <br />
              {t("login_with_email")}
            </Typography>
          </Grid>
          {errMsg ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    {/* <CloseIcon fontSize="inherit" /> */}
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                <Typography>{errMsg}</Typography>
                {sessionFound ? (
                  <>
                    <Typography>
                      Do you want to logout from all other devices?
                    </Typography>
                    <Button onClick={clearSession}>Clear</Button>
                  </>
                ) : (
                  ""
                )}
              </Alert>
            </Stack>
          ) : (
            ""
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
             {/* <MuiTelInput 
            sx={{width:"100%", marginY:"1rem", color:"blue"}} 
            label="Phone Number"
            defaultCountry="BD" 
            
            value={phone} 
            onChange={handleChange} 
            required
            onFocus={() => setPhoneFocus(true)}
            error={
              phoneFocus && !validPhone ? 
              true : 
              false
            }
            helperText={phoneFocus && !validPhone?
              "Enter valid phone number"
              : false
            }
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("email")}
              name="username"
              error={errMsg}
              autoComplete="username"
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                maxLength: 320,
              }}
              autoFocus
              onChange={(e) => {setUsername(e.target.value);
                props.setMail=username;
                
              }
                }
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              error={errMsg}
              type={showPassword ? "text" : "password"}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              //
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: "1rem" }}
            >
              {t("login")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  {t("forgot_password")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {t("no_account")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
