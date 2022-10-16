import {React, useContext, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import { globalContext } from "../../pages/GlobalContext";
import {add} from '../../Store/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AOS from 'aos';
import 'aos/dist/aos.css';


const CourseCard = (props) => {
  let mail= props.mail;  
  AOS.init({duration:2000});
  const {t}= useContext(globalContext)
  const [flag, setFlag] = useState(true);
  
  let title = props.title;
  let id= props.courseID;
  let instructor = props.instructor;
  let price = props.price;
  let hour = props.hour;
  let lecture = props.lecture;
  let img = props.img;
  let fullObject = props.fullObject;
  let fullObjectToggle = props.fullObject.toggle;



  const dispatch= useDispatch()

  // course id finder
  const courses= useSelector(state=>state.cart)
  let courseList=[];
  for(let i=0; i<courses.length;i++){
    courseList.push(courses[i].id);
    
  }
 
  
//
//  const [toggle, setToggle]=("x")
 const[found, setFound]=useState(false)
  const handleAdd=(course)=>{
  dispatch(add({...course}));
  setFlag(false);
  
  // console.log("ekta course", course)

  if(courseList.find((e)=>e===course.id)){
     setFound(true)
     
    // console.log("found")
  }
  else{
     setFound(false)
  } 
}
 localStorage.setItem("course", JSON.stringify(courses));



  return (
    <motion.div whileHover={{scale:1.03}}>
    <Card sx={{ margin: "0 5px" ,
    "&:hover":{boxShadow:"5"}}} data-aos="zoom-in"  >
      <CardMedia
        component="img"
        height="140"
        image={
          img
            ? `${img}`
            : "https://images.unsplash.com/photo-1659242536509-04df338adfea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
        }
        alt="image"
      />
      <CardContent sx={{display:"flex",
       flexDirection:"column",
       justifyContent:"flex-start",
      //  alignItems:"center"
       }}>
        <Typography
          gutterBottom
          height={60}
          sx={{
            fontSize: "1.2rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontWeight:"500"
          }}
        >
          {title ? <>{title}</> : <>Course title</>}
        </Typography>
        <Typography variant="body2" noWrap color="text.secondary">
          {instructor ? <>{instructor}</> : <>Course instructor</>}
        </Typography>
        <Typography variant="h6">
          {price ? <>&#x9F3;{price}</> : <>&#x9F3;Course price</>}
        </Typography>
        <Typography variant="body2">
          {hour ? <>Total {hour} hours</> : <>Course hour</>} |{" "}
          {lecture ? <>{lecture} lessons</> : <>Course lecture</>}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          sx={{
            display: {
              lg: "flex",
              // alignItems:"center",
              // justifyContent:"center"
            },
          
            justifyContent:"center"
            

          }}
        >
          <Grid item mb={1} mr={1}>
            <Button size="small" variant="outlined"
             onClick={()=>handleAdd(props)
              
             }
            color={flag ? "primary" : "success"}
            //  disabled={found}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                }}
              >
                {/* {t("buy")} */}
               {flag?<>{t("buy")}</>:<>{t("selected")}</>} 
               {/* {fullObjectToggle==="y"?<>{t("buy")}</>:<>{t("selected")}</>}  */}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Link to={"/course-details"} state={{ courseId: fullObject }} style={{
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
            {/* <Button variant="contained" sx={{margin:".5rem", padding:".3rem"}} onClick={()=>handleAdd(props)}>
            <ShoppingCartIcon/>
            </Button> */}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    </motion.div>
  );
};

export default CourseCard;
