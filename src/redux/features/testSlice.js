import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice(
    {
        name: "test",
        initialState: {testiState: 123},
        reducers: 
                    {
                        update: (state,action) => { state.testiState = (new Date()).getTime() + action.payload}
                    }
    }
)

export const {update} = testSlice.actions;

export default testSlice.reducer;