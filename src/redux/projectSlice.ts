import { createSlice } from "@reduxjs/toolkit";

interface State {
    user: object;
    loading: boolean;
    authStatus:boolean;
}
const initialState: State = {
    user:{},
    loading: false,
    authStatus:false,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.user = action.payload;
        },
        setAuthStatus: (state, action) => {
            state.authStatus = action.payload;
        },
    },
});

export default projectSlice.reducer;

export const { setUserDetails, setLoading,setAuthStatus } = projectSlice.actions;
