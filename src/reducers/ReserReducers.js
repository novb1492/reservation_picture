import { createSlice } from "@reduxjs/toolkit";


let init = {
    floor: [],
    drawing: null,
    seatInfoArr: [],
    counter: null,
    products: [],
    time: [],
    seatInfo: [],
    choiceProducts: [],
    totalPrice: 0,
    times:[],
    choiceTimes:[]
}

const ReserSlice = createSlice({
    name: 'ReserSlice',
    initialState: init,
    reducers: {
        setFloor(state, action) {
            let payload = action.payload;
            state.floor = payload.floor;
        },
        setDrawing(state, action) {
            let payload = action.payload;
            state.drawing = payload.drawing;
        },
        setSeatInfoArr(state, action) {
            let payload = action.payload;
            state.seatInfoArr = payload.seatInfoArr;
        },
        setCounter(state, action) {
            let payload = action.payload;
            state.counter = payload.counter;
        },
        setProducts(state, action) {
            let payload = action.payload;
            state.products = payload.products;
        },
        setChoiceProducts(state, action) {
            let payload = action.payload;
            let product = payload.product;
            let ocp = state.choiceProducts;
            let flag = false;
            for (let i in ocp) {
                if (ocp[i].id === product.id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                state.choiceProducts = [...ocp, product];
                let choiceProductArr = state.choiceProducts;
                let tp = state.totalPrice;
                /*
                    기존금액 에서 +
                */
                for (let i in choiceProductArr) {
                    tp = state.totalPrice * 1 + choiceProductArr[i].price.replace(",", "") * choiceProductArr[i].count;
                }
                state.totalPrice = tp;
            } else {
                alert('이미 선택한 상품입니다');
                return;
            }
        },
        removeProduct(state, action) {
            let payload = action.payload;
            let productId = payload.productId;
            let ocp = state.choiceProducts;
            for (let i in ocp) {
                if (ocp[i].id === productId) {
                    /*
                        해당 제품 삭제 및 총액 에서 해당금액 마이너스
                    */
                    let tp = state.totalPrice;
                    tp = tp * 1 - ocp[i].price.replace(",", "") * ocp[i].count;
                    state.totalPrice = tp;
                    ocp.splice(i, 1);
                    state.choiceProducts = ocp;
                    break;
                }
            }
        },
        changeCount(state, action) {
            let payload = action.payload;
            let productId = payload.productId;
            let ocp = state.choiceProducts;
            /*
                변동된 수량으로 금액 재계산
            */
            for (let i in ocp) {
                if (ocp[i].id === productId) {
                    ocp[i].count = payload.count;
                    state.choiceProducts = ocp;
                    let choiceProductArr = ocp;
                    let tp = 0;
                    for (let i in choiceProductArr) {
                        tp += (choiceProductArr[i].price.replace(",", "") * choiceProductArr[i].count);
                    }
                    state.totalPrice = tp;
                    break;
                }
            }
        },
        setTimes(state, action){
            let payload = action.payload;
            state.times = payload.times;
        },
        setChoiceTime(state, action){
            let payload = action.payload;
            let selectTime=payload.time;
            let ct=state.choiceTimes;
            let index=ct.indexOf(selectTime);
            if(index===-1){
                state.choiceTimes=[...ct,selectTime];
                return;
            }
            ct.splice(index,1)
            state.choiceTimes=ct;
        }
    }
})

export default ReserSlice.reducer;
export const ReserAction = ReserSlice.actions;