import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllAdministrators, fetchAllStudents } from "./ReduxApi";
import { RootState } from "../../../../redux/store"; // Adjust the import path according to your project structure
import Student from "../../../../types/StudentsDetailsType";
import Administrators from "../../../../types/administrators";

interface DashboardState {
    students: Student[];
    administrators: Administrators[];
    status: "idle" | "loading" | "failed";
    error: string | null;
}

const initialState: DashboardState = {
    students: [],
    administrators:[],
    status: "idle",
    error: null,
};

export const fetchAllStudentsAsync = createAsyncThunk<
    Student[], 
    void, 
    { rejectValue: string }
>(
    "students/fetchAllStudents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchAllStudents();
            console.log(response);
            
            return response; 
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
export const fetchAllAdministratorsAsync = createAsyncThunk<
    Administrators[], 
    void, 
    { rejectValue: string }
>(
    "administrators/fetchAllAdministrators",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchAllAdministrators();
            console.log(response);
            
            return response; 
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStudentsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchAllStudentsAsync.fulfilled,
                (state, action: PayloadAction<Student[]>) => {
                    state.status = "idle";
                    state.students = action.payload;
                }
            )
            .addCase(
                fetchAllStudentsAsync.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.status = "failed";
                    state.error = action.payload ?? "Unknown error";
                }
            )
            .addCase(fetchAllAdministratorsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchAllAdministratorsAsync.fulfilled,
                (state, action: PayloadAction<Administrators[]>) => {
                    state.status = "idle";
                    state.administrators = action.payload;
                }
            )
            .addCase(
                fetchAllAdministratorsAsync.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.status = "failed";
                    state.error = action.payload ?? "Unknown error";
                }
            );
    },
});

export const selectAllStudents = (state: RootState): Student[] =>
    state.dashboard.students;
export const selectAllAdministrators = (state: RootState): Administrators[] =>
    state.dashboard.administrators;
export const selectStudentStatus = (
    state: RootState
): DashboardState["status"] => state.dashboard.status;
export const selectStudentError = (state: RootState): string | null =>
    state.dashboard.error;

export default dashboardSlice.reducer;
