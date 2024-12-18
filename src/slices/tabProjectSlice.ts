import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabProjectState {
  isTeamTabSelected: boolean;
}

const initialState: TabProjectState = {
  isTeamTabSelected: true,
};

const tabSlice = createSlice({
  name: "tabProject",
  initialState,
  reducers: {
    setIsTeamTabSelected(state, action: PayloadAction<boolean>) {
      state.isTeamTabSelected = action.payload;
    },
  },
});

export const { setIsTeamTabSelected } = tabSlice.actions;
export default tabSlice.reducer;
