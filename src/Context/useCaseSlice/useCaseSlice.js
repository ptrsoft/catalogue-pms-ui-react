import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== 'undefined';
const initialState = {
  useCaseId:isBrowser ? JSON.parse(localStorage.getItem("useCaseId")) || [] : [],
  UseCaseNames:isBrowser ? JSON.parse(localStorage.getItem("useCaseName")) || [] : [],
  StagesToggleValue:""
};

const useCaseSlice = createSlice({
  name: "useCaseSlice",
  initialState,
  reducers: {
    addUsecaseId(state, action) {
      state.useCaseId = action.payload;

      let setUseCaseId = JSON.stringify(state.useCaseId);
      localStorage.setItem("useCaseId", setUseCaseId);
    },
    addUseCaseName(state, action) {
      state.UseCaseNames = action.payload;
    
      let setUseCaseName = JSON.stringify(state.UseCaseNames);
      localStorage.setItem("useCaseName", setUseCaseName);
  },

    addToggleValue(state, action) {
      state.StagesToggleValue = action.payload;
    console.log("toggleValue",action.payload)}
  },
});

export default useCaseSlice.reducer;
export const { addUsecaseId,addUseCaseName, addToggleValue } = useCaseSlice.actions;
