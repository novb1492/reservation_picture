import { createSlice } from "@reduxjs/toolkit";


let init = {
    floor: [],
    drawing:null,
    seatInfoArr:[],
    counter:null,
    products:[],
    time:[],
    seatInfo:[],
    choiceProducts:[]
}
const ReserSlice = createSlice({
    name: 'ReserSlice',
    initialState: init,
    reducers: {
        setFloor(state, action){
            let payload = action.payload;
            console.log(payload);
            state.floor=payload.floor;
        },
        setDrawing(state,action){
            let payload = action.payload;
            state.drawing=payload.drawing;
        },
        setSeatInfoArr(state,action){
            let payload = action.payload;
            state.seatInfoArr=payload.seatInfoArr;
        },
        setCounter(state,action){
            let payload = action.payload;
            state.counter=payload.counter;
        },
        setProducts(state,action){
            let payload = action.payload;
            state.products=payload.products;
        },
        setChoiceProducts(state,action){
            let payload = action.payload;
            let product=payload.product;
            let ocp=state.choiceProducts;
            let flag=false;
            for(let i in ocp){
                if(ocp[i].id===product.id){
                    flag=true;
                    break;
                }
            }
            if(!flag){
                state.choiceProducts=[...ocp,product];
            }else{
                alert('이미 선택한 상품입니다');
                return;
            }
        },
        removeProduct(state,action){
            let payload = action.payload;
            let productId=payload.productId;
            let ocp=state.choiceProducts;
            for(let i in ocp){
                if(ocp[i].id===productId){
                    ocp.splice(i,1);
                    state.choiceProducts=ocp;
                    break;
                }
            }
        }
    }
})
export default ReserSlice.reducer;
export const ReserAction = ReserSlice.actions;