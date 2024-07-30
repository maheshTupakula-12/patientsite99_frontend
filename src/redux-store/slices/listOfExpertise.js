import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list:[]
}

const expertiseSlice = createSlice({
    name:"expertise list",
    initialState,
    reducers:{
        setList:(state,action)=>{
            state.list = action.payload.list;
        }
    }
})

export const {setList} = expertiseSlice.actions;

export default expertiseSlice.reducer;