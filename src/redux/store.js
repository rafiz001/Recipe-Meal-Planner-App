const { configureStore } = require("@reduxjs/toolkit");
import searchReducer from "./features/searchSlice";
const store = configureStore({
    reducer: { search : searchReducer}
});

export default store;