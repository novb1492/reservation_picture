import { forwardRef, useImperativeHandle, useRef } from "react";

function PaymentCompo(prop, ref) {
    const nameRef = useRef();
    const priceRef = useRef();
    const paymentIdRef = useRef();
    useImperativeHandle(ref, () => ({
        // 부모 컴포넌트에서 사용할 함수를 선언
        on_pay
    }))
    /**
     * name:"상품이름"
     * price:"결제가격"
     * paymentid:"주문번호"
     * @param {object} data 
     */
    function on_pay(data) {
        nameRef.current.value=data.name;
        priceRef.current.value=data.price;
        paymentIdRef.current.value=data.paymentid;
        var myform = document.mobileweb; 
        myform.action = "https://mobile.inicis.com/smart/payment/";
        myform.target = "_self";
        myform.submit(); 
    }
    return (
        <form name="mobileweb" method="post" accept-charset="euc-kr" hidden >
            <input type="text" name="P_NEXT_URL" value={`${process.env.REACT_APP_API_URL}/api/auth/payment`} />
            <input type="text" name="P_INI_PAYMENT" value="CARD" />
            <input type="text" name="P_RESERVED" value="twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N" />
            <input type="text" name="P_MID" value="INIpayTest" />
            <input type="text" name="P_OID" ref={paymentIdRef} value="" />
            <input type="text" name="P_GOODS" ref={nameRef} value="" />
            <input type="text" name="P_AMT" ref={priceRef} value="" />
            <input type="text" name="P_UNAME" value="테스터" />
            <input type="text" name="P_NOTI_URL" value="" />
            <input type="text" name="P_HPP_METHOD" value="1" />
        </form>
    )
}
export default forwardRef(PaymentCompo);