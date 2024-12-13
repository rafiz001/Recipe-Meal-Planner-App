import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearch = createAsyncThunk("search/fetch",
    async (payload, { getState, dispatch }) => {
        const state = getState();
        const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch" , {
            params: {
              apiKey: "49f7336d27bf4c6bb6a288f8f97cc6d6",
              query: state.search.query,
              cuisine: state.search.cuisine.toString(),
              diet: state.search.diet.toString(),
              maxReadyTime: state.search.maxReadyTime.isAvailable?state.search.maxReadyTime.value:null,
              offset: state.search.offset,
              number: state.search.number,
            },
          });
        return res.data;
    });

export const searchSlice = createSlice(
    {
        name: "search",
        initialState:
        {
            query: "",
            cuisine: [],
            diet: [],
            maxReadyTime: { isAvailable: false, value: 20 },
            offset: 0,
            number: 6,
            data: {
                offset: 0,
                number: 6,
                results: [],
                totalResults: 0

            },
            trigger:false,
            loading: false,
        },
        reducers:
        {
            setQuery: (state, action) => { state.query = action.payload },
            setCuisine: (state, action) => {
                const location = state.cuisine.indexOf(action.payload);
                if (location > -1) state.cuisine.splice(location, 1);
                else state.cuisine.push(action.payload);
            },

            setDiet: (state, action) => {
                const location = state.diet.indexOf(action.payload);
                if (location > -1) state.diet.splice(location, 1);
                else state.diet.push(action.payload);
            },

            setMaxReadyTimeAvailable: (state, action) => { state.maxReadyTime.isAvailable = Boolean(action.payload) },
            setMaxReadyTime: (state, action) => { state.maxReadyTime.value = parseInt(action.payload); state.maxReadyTime.isAvailable = true },
            setPagination: (state,action) =>{
                if(action.payload.value) state.offset = (action.payload.value-1) * state.number;
                if(action.payload.trigger) state.trigger=true;
            },
            setTrigger: (state,action) => {state.trigger=action.payload}
        }
        ,
        extraReducers: (builder) => {
            builder.addCase(fetchSearch.pending, (state) => {state.loading=true;})
            builder.addCase(fetchSearch.fulfilled, (state, action) => {state.data= action.payload; state.loading=false;})
            builder.addCase(fetchSearch.rejected, (state,action) => {state.loading=true;alert(action.payload)})
        }

    }
)

export const { setMaxReadyTime, setMaxReadyTimeAvailable, setQuery, setCuisine, setDiet, setPagination, setTrigger } = searchSlice.actions;

export default searchSlice.reducer;