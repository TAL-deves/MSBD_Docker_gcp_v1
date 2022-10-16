import React, { useEffect, useState } from "react";
// import Course from '../components/course/Course';
import coursesData from "../data/coursesData";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { width } from "@mui/system";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import * as React from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
// import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Container, CssBaseline, TextField } from "@mui/material";
import { CardActionArea } from "@mui/material";
import ReactPlayer from "react-player";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from "../api/Axios";
import { Reviews } from "@mui/icons-material";
import swal from "sweetalert";


const COURSE_URL = "/api/give-a-review";

const VideoGridWrapper = styled(Grid)(({ theme }) => ({
    marginTop: "30%",
  }));
  
  const VdoPlayerStyle = styled("div")(({ theme }) => ({
    width: {sm:"100%", md:"100%", xs:"100%", lg:"100%"},
    height: {sm:"100%", md:"100%", xs:"100%", lg:"100%"},
  }));
  




const Coursedemo = () => {
    const [courses, setCourses] = useState([]);
    const [played, setPlayed] = useState(0);
    const [videolink, setVideolink]= useState(`<iframe width="560" height="315" src="https://www.youtube.com/embed/qFYcwbu-H-s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
    const[review, setReview]= useState("");
    const[username, setUser]= useState("shishir");

    let location = useLocation();

    let courseID = location.state.courseId;
  
    // console.log("demo page er state", state)
    const textstyle = {
      textDecoration: "none",
    };
    const navigate = useNavigate();

let handleSubmitReview=async()=>{
    const response =await api.post(COURSE_URL,
      JSON.stringify({username, courseID, review }),
      {
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Credentials': true
      }  
  ).then();
  
  console.log("response",response)
}

    return (
        <>
        {/* <Typography>are dada</Typography> */}
  <Container sx={{marginTop:"5%", marginBottom:"10%"}}>
  <Box container rowSpacing={1} 
  sx={{display:"flex", alignItems:"center", 
  flexDirection:{sm:"columnReverse", xs:"column-reverse", md:"row", lg:"row"}}}
  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Box item xs={6} sx={{marginRight:"2%"}}>
        
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>title 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.<br/>
              Link: <Button onClick={()=>
                  {setVideolink(`<iframe width="560" height="315" src="https://www.youtube.com/embed/XnxbL1-kBpU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)}}>Click Here</Button>
              
              {/* {course?.link} */}
            </Typography>
          </AccordionDetails>
        </Accordion>
                  <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>title 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.<br/>
              Link: <Button onClick={()=>
                  {setVideolink(`<iframe width="560" height="315" src="https://www.youtube.com/embed/XnxbL1-kBpU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)}}>Click Here</Button>
              
              {/* {course?.link} */}
            </Typography>
          </AccordionDetails>
        </Accordion>
                  <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>title 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.<br/>
              Link: <Button onClick={()=>
                  {setVideolink(`<iframe width="560" height="315" src="https://www.youtube.com/embed/TUp43xiLeyQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)}}>Click Here</Button>
              
              {/* {course?.link} */}
            </Typography>
          </AccordionDetails>
        </Accordion>
                 
                </Box>
                <Box >
                {/* <VideoGridWrapper> */}
             
          <VdoPlayerStyle>
          {/* <div className="player-wrapper"> */}
          <div>
              <ReactPlayer 
              url= {videolink}
            // className="react-player"
              controls={false}
              
              loop={true}
              playing={true}
              onProgress={(progress)=>{
                setPlayed(progress.playedSeconds);
                
              }}
             
            /> </div>
            {/* </div> */}
            </VdoPlayerStyle>
      
      {/* </VideoGridWrapper> */}
                </Box>
                </Box>
        </Container>
        <Container sx={{display:"flex", flexDirection:"column"}}>
            <Typography variant="h4">Write your Feedback below</Typography>
        <TextField
        sx={{margin:"2%"}}
        id="outlined-basic"
        fullWidth
        multiline
        rows={4}
        label="My Feedback"
        variant="outlined"
        onChange={(e) => setReview(e.target.value)}
      />
      <Button sx={{margin:"2%"}}
       variant="contained"
       onClick={handleSubmitReview}
       >
        Submit</Button>
        </Container>
      </>
  
    );
};

export default Coursedemo;