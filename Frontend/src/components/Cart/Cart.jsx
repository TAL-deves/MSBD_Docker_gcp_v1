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
import {motion} from "framer-motion";
import api from "../../api/Axios";



// import * as React from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
// import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from '@mui/material/Typography';
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Container, CssBaseline } from "@mui/material";
import { CardActionArea } from "@mui/material";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../CourseCard/CourseCard";
import { remove } from "../../Store/cartSlice";
import { globalContext } from "../../pages/GlobalContext";
import swal from "sweetalert";
import { multiStepContext } from "../../pages/StepContext";


const PAYMENT_URL = "/api/buy";

const Cart = (props) => {
  const {
    userobj
  } = useContext(multiStepContext);
  let user= userobj.user
  const {t}= useContext(globalContext)

  
  const dispatch= useDispatch();

  const handleRemove=(course)=>{
    dispatch(remove(course))
}

  const courses= useSelector(state=>state.cart)
  console.log(courses)
  
   //  course list for api 
   let courseList=[];
   for(let i=0; i<courses.length;i++){
     courseList.push(courses[i].id);      
   }
   //
  // total cost 
  let total=0;
  for(const courseCost of courses){
    total= total+Number(courseCost.price)  
  }
  console.log("cart er course",courses)


  const response =()=>{  api.post(PAYMENT_URL,
    JSON.stringify({  user, courseList}),
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
      <Typography sx={{margin:"5rem"}} variant="h5"></Typography>
      <Container>
      <Box 
      sx={{display:"flex",
       flexDirection:"column",
       alignItems:"center"}}>
      <Grid spacing={4} sx={{display:"flex"}}>
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 10, lg: 10 }}
          justifyContent="center"
          alignItems="flex-start"
        >
          {courses.map((course) => {
            return (
              // <Box key={course.courseID} sx={{ maxWidth: 345, mb:"15px", display:"flex" }}>
              //   <CourseCard 
              //   title={course.title}
              //   img={course.img}
              //   instructor={course.instructor}
              //   price={course.price}
              //   hour={course.hour}
              //   lecture={course.lecture}
              //   fullObject={course}
              //   />
              //   <Button  
              //   onClick={()=>handleRemove(course.title)}>X</Button>
              // </Box>

              <>
              
              <motion.div whileHover={{scale:1.03}}>
              <Box data-aos="fade-right" key={course.courseID} sx={{ maxWidth: "40rem", mb:"15px", display:"flex", justifyContent:"flex-start" }} >
              <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {course.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {course.instructor}
          </Typography>
          <Typography variant="h6" color="text.primary" component="div">
          ৳{course.price}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" component="div">
          Total {course.hour} Hours || Total {course.lecture} Lectures
          </Typography>
          <Link to={"/course-details"} state={{ courseId: course}} style={{
              textDecoration:"none"
            }}>
              <Button size="small" variant="contained">
                <Typography
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  {t("course_details")}
                </Typography>
              </Button>
            </Link>
       
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
            </>
            );
          })}
        </Grid>
        </Grid>
        <Box sx={{margin:"5rem"}} >
        <Typography  variant="h5">Total: ${total}</Typography>
        {user? 
          ( 
          <Button
             onClick={response}
             disabled={(courseList.length===0)?true:false}
              variant="contained">Proceed to Payment</Button>
             
         )
           :
          (
          
          <Link to={"/login"} style={{
            textDecoration:"none"
          }}>
            <Button 
            onClick={response} 
            disabled={(courseList.length===0)?true:false}
            variant="contained">Proceed to Payment</Button>
          </Link>
          )} 
        </Box>
      </Box>
      </Container>
     
    </>
  );
};

export default Cart;