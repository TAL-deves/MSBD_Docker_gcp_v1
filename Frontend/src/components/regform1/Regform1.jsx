import {
  Alert,
  AlertTitle,
  Collapse,
  CssBaseline,
  IconButton,
  Stack,
} from "@mui/material";
import MuiPhoneInput from 'material-ui-phone-number';
import { Box, Container } from "@mui/system";
import { React, useState } from "react";
import { useContext } from "react";
import { multiStepContext } from "../../pages/StepContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import "./Regform1.css";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import { MuiTelInput } from "mui-tel-input";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Regform1 = () => {
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
    email,
    setEmail,
    emailFocus,
    setEmailFocus,
    password,
    setPwd,
    validPwd,
    setValidPwd,
    pwdFocus,
    setPwdFocus,
    validMatch,
    setValidMatch,
    matchFocus,
    setMatchFocus,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
    handleSubmit,
    theme,
    username,
    setUser,
    matchPwd,
    setMatchPwd,phone, setPhone,validPhone, phoneFocus,setPhoneFocus
  } = useContext(multiStepContext);

  const [open, setOpen] = useState(true);
  
  // const googleAuth = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/api/google/callback`,
  //     "_self"
  //   );
  // };
  // const facebookAuth = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/api/facebook/callback`,
  //     "_self"
  //   );
  // };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/api/google`,
      "",
      "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,top=400, left=500, width=620,height=575"
    );
  };
  const facebookAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/api/facebook/callback`,
      "",
      "toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no,top=400, left=500, width=620,height=575"
    );
  };

  // mui telnet
  const handleChange = (newPhone) => {
    setPhone(newPhone);
    // console.log(phone)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        // maxWidth="xs"
      >
        {/* <CssBaseline /> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "70%", lg: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            container
            // className="SocialContainer"
            // xs={12} lg={8} md={10} xl={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Grid item xs >
              <Typography sx={{ textAlign:"center", color:"var(--black)" }} mt={2}>Or sign in with social accounts</Typography>
            </Grid> */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                display: "flex",
                flexDirection: "row",
                bgcolor: "primary.main",
              }}
              onClick={googleAuth}
            >
              {/* <Link target={"_blank"} style={{display:"flex", flexDirection:"row", alignItems:'center', justifyContent:"center", paddingRight:"10px"}}> */}
              <GoogleIcon
                className="Icons"
                sx={{
                  color: "other.dark",
                  fontSize: "2rem",
                  margin: "0px 10px",
                }}
              />
              <Typography sx={{ color: "other.dark", fontSize: "1rem" }}>
                Sign up with google
              </Typography>
              {/* </Link> */}
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                display: "flex",
                flexDirection: "row",
                bgcolor: "primary.main",
              }}
              onClick={facebookAuth}
            >
              <FacebookIcon
                className="Icons"
                sx={{
                  color: "other.dark",
                  fontSize: "2rem",
                  margin: "0px 10px",
                }}
              />
              <Typography sx={{ color: "other.dark", fontSize: "1rem" }}>
                Sign up with facebook
              </Typography>
            </Button>

            <Typography component="p" variant="p" sx={{ textAlign: "center" }}>
              Or <br />
              Sign Up with Email
            </Typography>
          </Grid>
          {errMsg ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Collapse in={open}>
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
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Error</AlertTitle>
                  {errMsg}
                </Alert>
              </Collapse>
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

            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>          */}
            <label htmlFor="username">
              {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
            </label>

            {/* MUI phone added */}
            <MuiTelInput 
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
            />
           
            <TextField
              required
              fullWidth
              id="username  "
              label="User name "
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                maxLength: 24,
              }}
              onSubmit={(e) => setUser(e.target.value)}
              // aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              // onBlur={() => setUserFocus(false)}
             
              error={userFocus && username && !validName
                ? true
                : false}
                helperText={
                  userFocus && username && !validName
                ? <>4 to 24 characters <br />
                 Must begin with a letter <br />
                 Letters, numbers, underscores, hyphens allowed</>
                : false
                }
            />
            {/* <p
              id="uidnote"
              className={
                userFocus && username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p> */}



            <label htmlFor="email">
              {/* <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} /> */}
            </label>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // error={errMsg}
              autoComplete="email"
              // autoFocus
              value={email}
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                maxLength: 320,
              }}
              onChange={(e) =>
                 setEmail(e.target.value)}
              // aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              // onBlur={() => setEmailFocus(false)}
              error={emailFocus && email && !validEmail ? true : false}
              helperText={
                emailFocus && email && !validEmail
                  ? "Please provide a valid email"
                  : ""
              }
            />
            {/* <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              Please provide a valid email
              <br />
            </p> */}
            {/* <label htmlFor="password">
                         
        </label> */}
            {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            autoComplete="current-password"
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
           
          /> */}
            {/* <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                         
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p> */}
            {/* <label htmlFor="confirm_pwd">
                          

          </label> */}
            {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            autoComplete="confirm-password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
          
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
           <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          Must match the first password input field.
                      </p> */}

            {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </Button> */}
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </Box>
  );
};

export default Regform1;
