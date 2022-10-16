import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios"

import { Button, Container } from "@mui/material";
import {add} from '../Store/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../components/CourseCard/CourseCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SideCart from "../components/SideCart/SideCart";
import StepContext, { multiStepContext } from "./StepContext";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Courses = (props) => {
  const {
    userRef,
    emailRef,
    errRef,
    renderer,
    userobj,
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
    handleSubmitRegistration,
    theme,
    username,
    setUser,
    matchPwd,
    setMatchPwd,
    registerapiresponse,
  } = useContext(multiStepContext);
  let mail= props.mail;

  console.log("registration_er_user",userobj)

 
  AOS.init();

  const [courses, setCourses] = useState([]);
  const [load, setLoad] = useState(true);

  let fetchData = async () => {
    
    await api.post(`${process.env.REACT_APP_API_URL}/api/allcourses`)
      // .then((res) => res.json())
      .then((data) => {
        // console.log(" THis is the data -----  "+data.data.data.coursesData);
        setCourses(data.data.data.coursesData)
        setLoad(false);
      });
  };

  useEffect(() => {
   
     fetchData();
  }, []);

  const navigate = useNavigate();

  


  return (
    <Box
    >
      <Container>
        <Typography
          sx={{
            fontSize: "2rem",
            m: "5px",
          }}
        >
          Browse all our courses
        </Typography>
      

      <Grid spacing={4} sx={{display:"flex"}}>
        <Grid
          container
          // columns={{ xs: 10, sm: 10, md: 10, lg: 10 }}
          xs={11}
          justifyContent="center"
        >
          {load ? (
            <CircularProgress sx={{
              color:"primary.main"
            }} />
          ) : (
            <>
              {courses.map((course) => {
                return (
                  <Box key={course.courseID} 
                  sx={{ maxWidth: 345, mb:"15px" }}
                
                  >
                    <CourseCard                    
                    title={course.title}
                    id={course.courseID}
                    img={course.thumbnail}
                    instructor={course.instructor.name}
                    price={course.price}
                    hour={course.courseLength}
                    lecture={course.totalLecture}
                    fullObject={{...course}}                    
                    />
                    {/* <Button variant="contained" 
                    onClick={()=>handleAdd(course)}
                    //  disabled=
                    >
                   <ShoppingCartIcon/>
                    </Button> */}
                   
                  </Box>
                );
              })}
            </>
          )}
        </Grid>
        <Grid 
        // columns={{ xs: 2, sm: 2, md: 1, lg: 1 }}
        xs={1}>
        <Box>
         {/* <StepContext> */}
          <>
          <SideCart 
          mail={mail}
          /></>
          
          {/* </StepContext>        */}
        </Box>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default Courses;