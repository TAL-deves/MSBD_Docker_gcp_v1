import * as React from "react";
// import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
// import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";

// import './Banner.css';
import { Container, Paper, Stack } from "@mui/material";
import bannerimage from "./bannersample.gif";
import { multiForgotContext } from "../../pages/ForgotContext";
import { globalContext } from "../../pages/GlobalContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  AOS.init({duration:2000});
   const {t}= React.useContext(globalContext)

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid container spacing={2} sx={{
                
              
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
              
              }}>
          {/* <Grid xs={4}> */}
            <Grid
              xs={12}
              md={10}
              lg={5}
              xl={3}
              sx={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              data-aos="fade-right"
            >
              <Grid >
                <Typography
                  variant="h6"
                  sx={{ color: "primary.main", fontSize: "2.5rem" }}
                >
                  {t("quiet_the_mind")}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: "other.black",
                    fontSize: "1.2rem",
                    lineHeight: "2rem",
                  }}
                >
                  {t("when_meditation_mastered")}
                </Typography>
              </Grid>
              <Grid sx={{
                mt:4
              }}>
                <Button href="/registration" size="large" variant="contained">
                  {t("sign_up_now")}
                </Button>
              </Grid>
            </Grid>
          {/* </Grid> */}
          <Grid
            // xs={12}
            // md={10}
            lg={7}
            xl={9}
            sx={{
              backgroundImage: `url(${bannerimage})`,
              height: "40vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Banner;
