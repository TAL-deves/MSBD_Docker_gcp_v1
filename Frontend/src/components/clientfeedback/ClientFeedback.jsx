import { styled, alpha } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { clientData } from "../../data/clientData";
import Slider from "react-slick";
import { Box, display } from "@mui/system";
import { Link } from "react-router-dom";
import InstructorCard from "../InstructorCard/InstructorCard";
import { Height } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useRef } from "react";
import ClientCard from "./ClientCard/ClientCard";
import { globalContext } from "../../pages/GlobalContext";
import { multiStepContext } from "../../pages/StepContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClientFeedback = () => {
  AOS.init({duration:3000});
  const {t}= useContext(globalContext)
  const sliderRef = useRef(null);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,

    // centerMode: true, // enable center mode
    // centerPadding: '50px', // set center padding
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [clientState, setclientState] = useState(clientData);

  return (
    <Box
      sx={{
        mt: 5,
        mb: 5
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb:5
          }}
          
        >
          <Typography
            gutterBottom
            // gutter
            sx={{
              fontSize: "1.8rem",
              color: "primary.main",
              fontWeight: "500",
            }}
          >
            {t("why_love_mindschool")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ArrowBackIosNewIcon
              onClick={() => {
                sliderRef.current.slickPrev();
                console.log(sliderRef.current);
              }}
              sx={{
                fontSize: "2rem",
                marginRight: "10px",
                cursor: "pointer",
                bgcolor: "secondary.main",
                borderRadius: "50%",
                color: "other.white",
                padding: "5px",
              }}
            />
            <ArrowForwardIosIcon
              onClick={() => {
                sliderRef.current.slickNext();
                // console.log(sliderRef.current);
              }}
              sx={{
                fontSize: "2rem",
                cursor: "pointer",
                bgcolor: "secondary.main",
                borderRadius: "50%",
                color: "other.white",
                padding: "5px",
              }}
            />
          </Box>
        </Box>
        <Slider {...settings} ref={sliderRef}>
          {clientState.map((obj) => {
            return (
              <div key={obj.id}>
                <ClientCard
                  name={obj.name}
                  img={obj.image}
                  feedback={obj.feedback}
                />
              </div>
            );
          })}
        </Slider>
      </Container>
    </Box>
  );
};

export default ClientFeedback;
