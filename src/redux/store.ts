import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import dashboardSlice from "../pages/admin/components/redux/ReduxSlice"; // Import default reducer

export const store = configureStore({
    reducer: {
        project: projectSlice,
        dashboard: dashboardSlice,
    },
});
export type app = ReturnType<typeof store.getState>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
