import { PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import api from "../api/Axios";
import WebCam from "../components/Webcam/WebCam";
import axios from "axios";


const USER_URL="/api/userprofile"
const UPDATE_USER_URL="/api/updateuserprofile"

const UserProfile = () => {
  // const [file, setFile] = useState(
  //   "https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg"
  // );
  // function uplaodImage(e) {
  //   // console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  const [image, setImage] = useState('')
  const [username, setUsername] = useState('istiak.shish5@gmail.com')
  const [userInfo, setUserInfo]= useState({})
  const [profession, setProfession]= useState()
  const [age, setAge]= useState()

  
  let handleGetUser=async()=>{
    const response =await api.post(USER_URL,
      JSON.stringify({username }),
      {
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Credentials': true
      }          
  );
  setUserInfo(response.data.data)
//  console.log("username",userInfo.username)
return response.data.data

}

useEffect(() => {  
  handleGetUser();
 }, []);


 let handleUpdateUserProfile=async()=>{
  const response =await api.post(UPDATE_USER_URL,
    JSON.stringify({username, profession, age }),
    {
        headers: { 'Content-Type': 'application/json' },
        'Access-Control-Allow-Credentials': true
    }          
);
setUserInfo(response.data.data)
//  console.log("username",userInfo.username)
return response.data.data

}


  const handleChange = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }

  const handleApi = () => {
    //call the api
    const url = `${process.env.REACT_APP_API_URL}/api/uploadimage`

    const formData = new FormData()
    formData.append('image', image)
    axios.post(url, formData).then(result => {
      console.log(result.data)
      alert('success')
    })
      .catch(error => {
        alert('service error')
        console.log(error)
      })
  }
  


  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        User Profile
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          display: {
            xs: "flex",
            sm: "flex",
            md: "flex",
          },
          flexDirection: {
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
          },
          alignContent: "center",
        }}
      >
        <Grid item xs={6} md={8}>
          <Container>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={userInfo.username?userInfo.username:"name"}
                  name="name"
                  autoComplete="name"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    maxLength: 320,
                  }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  value={userInfo.email?userInfo.email:"email"}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="profession"
                  label="Profession"
                  id="profession"
                  defaultValue={userInfo.profession?userInfo.profession:""}
                  onChange={(e)=>{setProfession(e.target.value)}}
                />
                <TextField 
                margin="normal" 
                name="age" 
                label="Age" 
                id="age" 
                fullWidth
                // value={userInfo.age?userInfo.age:""}
                onChange={(e)=>{setAge(e.target.value)}}
                />
               
                <input  accept="image/*" type="file" onChange={handleChange}/>
                <Button
                  variant="outlined"
                  component="label"
                  // sx={{
                    //   display: {
                      //     xs: "none",
                  //     md: "flex",
                  //   },
                  // }}
                  onClick={handleApi}
                >
                  Upload
                </Button>
                {/* <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    display: {
                      xs: "flex",
                      md: "none",
                    },
                  }}
                > */}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  {/* <PhotoCamera /> <Typography>Upload an image</Typography> */}
                {/* </IconButton> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: "1rem" }}
                   onClick={handleUpdateUserProfile}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid
          item
          xs={6}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image?
          <img src={image === ''? '' : URL.createObjectURL(image)} alt="user profile" width={200} height={200}/>
          :
          <Avatar
            alt="ss"
            sx={{ width: 200, height: 200, objectFit: "cover" }}
          />
          }
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default UserProfile;