import { createSlice } from "@reduxjs/toolkit";


let init = {
    floor: [],
    drawing:null,
    seatInfoArr:[]
}
const ReserSlice = createSlice({
    name: 'ReserSlice',
    initialState: init,
    reducers: {
        setFloor(state, action){
            let payload = action.payload;
            state.floor=payload.floor;
        },
        setDrawing(state,action){
            let payload = action.payload;
            state.drawing=payload.drawing;
        },
        setSeatInfoArr(state,action){
            let payload = action.payload;
            state.seatInfoArr=payload.seatInfoArr;
        }
    }
})
export default ReserSlice.reducer;
export const ReserAction = ReserSlice.actions;