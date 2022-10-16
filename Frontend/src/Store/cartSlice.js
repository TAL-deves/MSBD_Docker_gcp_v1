const { createSlice } = require("@reduxjs/toolkit")



const cartSlice= createSlice({
  name:"cart",
  initialState:[],
   reducers:{
    add(state, action){
      // console.log(action)
      if(action?.payload?.fullObject?.courseID!==null){
        let findObj =state.find((obj)=>{return action?.payload?.fullObject?.courseID=== obj.fullObject?.courseID})
        // console.log(findObj)

        if(findObj===null || findObj===undefined){
          state.push(action.payload)
        }
      }
       
    },
    remove(state, action){
         
        return state.filter((item)=>item.title !== action.payload)
      //   return state.filter((item)=>item.courseID !== action.payload)

     },
    // selectedCourse(state, action){

    // }
   }

})

export const {add, remove, check} =cartSlice.actions;
export default cartSlice.reducer;

