import React, { useContext, useEffect, useState } from "react";
// import Course from '../components/course/Course';
// import coursesData from "../data/coursesData";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { width } from "@mui/system";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../Store/cartSlice";
import {motion} from "framer-motion";
import api from "../../api/Axios"
import { multiStepContext } from "../../pages/StepContext";
import swal from "sweetalert";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, TextField } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const PAYMENT_URL = "/api/buy";

const SideCart = (props) => {
  const {
    userRef,
    emailRef,
    errRef,
    validName,
    setValidName,
    userobj,
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  let user=localStorage.getItem("user")
  AOS.init({duration:500});
  let mail= userobj.user
  const [flag, setFlag] = useState(true);
 
  console.log("mail",mail)
  const dispatch= useDispatch();

  const handleRemove=(course)=>{
    // console.log(course.id)
    dispatch(remove(course))
  setFlag(false)
}


  const courses= useSelector(state=>state.cart)
  
  const LScourses= JSON.parse(localStorage.getItem("course"))
  
   
     console.log("lets see", courses)
     
    //  course list for api 
    let courseList=[];
    for(let i=0; i<courses.length;i++){
      courseList.push(courses[i].id);      
    }
    //

    let coursesList =props.courseList;
   
    // total cost 
    let total=0;
    let LStotal=0;
   
    for(const courseCost of courses){
      total= total+Number(courseCost.price)
      
    }
    // for(const lscourseCost of LScourses){
    //   LStotal= LStotal+Number(lscourseCost.price)
      
    // }
    // let allTotal=LStotal+total;

    // console.log(JSON.stringify(email))

    // payment api
    const response =()=>{  api.post(PAYMENT_URL,
      JSON.stringify({  mail, courseList}),
      {
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Credentials': true,         
      }

  ).then((res)=>{
    
    if (res.data.result.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      swal("Session expired", "Redirecting to login page" ,'success');
      setTimeout(function(){
        window.location.href = '/login';
     }, 1000);

    }
     
  }); }



  // payment api for gift 
  const responseForGift =()=>{  api.post(PAYMENT_URL,
    JSON.stringify({  email, courseList}),
    {
        headers: { 'Content-Type': 'application/json' },
        'Access-Control-Allow-Credentials': true,         
    }

).then((res)=>{
  if (res.data.result.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    swal("Session expired", "Redirecting to login page" ,'success');
    setTimeout(function(){
      window.location.href = '/login';
   }, 1000);

  }
}); }
  
  
   
  return (
    <>
      <Box   sx={{overflow:"hidden"}}>
      <Typography sx={{margin:"5rem"}} variant="h5">Selected courses list:</Typography>
          {courses[0]=== undefined ?
           <>{courses.map((course) => {
            return (
              <motion.div whileHover={{scale:1.03}}>
              <Box key={course.courseID} sx={{ maxWidth: "40rem", mb:"15px", display:"flex", justifyContent:"flex-start" }} >
              <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {course.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {course.instructor}
          </Typography>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={course.img}
        alt="Live from space album cover"
      />
    </Card>
                <Button  
                onClick={()=>handleRemove(course.title)
                }>X</Button>
              </Box>
              </motion.div>
            );
          })}</> : 
           <>{LScourses.map((course) => {
            return (
              <>
              
              <motion.div whileHover={{scale:1.03}}>
              <Box data-aos="fade-right" key={course.id} sx={{ maxWidth: "40rem", mb:"15px", display:"flex", justifyContent:"flex-start" }} >
              <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {course.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {course.instructor}
          </Typography>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={course.img}
        alt="Live from space album cover"
      />
    </Card>
                <Button  
                onClick={()=>handleRemove(course.title)
                }>X</Button>

              </Box>
              </motion.div>
            </>);
          })}</>
          
        }
          <Typography>Total:৳{total}</Typography>
         {user? 
          (<>
          
          <Button
             onClick={response}
             disabled={(courseList.length===0)?true:false}
           
              variant="contained">Proceed to Payment
          </Button>
          <Button 
            disabled={(courseList.length===0)?true:false}
            variant="contained" sx={{marginLeft:"1rem", marginTop:{ xs:"1rem", md:"0rem", lg:"0rem",xl:"0rem"}, overflow:"hidden"}}
            onClick={handleOpen}>Gift
          </Button>
          

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" color="text.secondary" component="h2">
            Please enter the email of the person you want to gift this course below
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
          </Typography>
          <Button 
            onClick={responseForGift} 
            disabled={!validEmail}
            variant="contained">Proceed to Payment</Button>
        </Box>
        
      </Modal>
              </>)
           :
          (
          <Box 
          // sx={{display:"flex"}}
          >
          <Link to={"/login"} style={{
            textDecoration:"none"
          }}>
            <Button 
            onClick={response} 
            disabled={(courseList.length===0)?true:false}
            variant="contained">Proceed to Payment</Button>
             <Button 
            disabled={(courseList.length===0)?true:false}
            variant="contained" sx={{marginLeft:"1rem"}}
            onClick={handleOpen}>
          Gift</Button>
          </Link>
          
            
          </Box>
          )} 
        
      </Box>
      
    </>
  );
};

export default SideCart;