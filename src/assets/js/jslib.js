export function zoomIn(event) {
    event.target.style.transform = "scale(1.2)"; //1.2배 확대
    event.target.style.zIndex = 1;
    event.target.style.transition = "all 0.5s";// 속도
}
export function zoomOut(event) {
    event.target.style.transform = "scale(1)";
    event.target.style.zIndex = 0;
    event.target.style.transition = "all 0.5s";
}
export function consoleLog(data) {
    console.log(data);
}
export function isMobile() {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
}
export function priceComma(price) {
    try {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (error) {
        consoleLog(error);
        return 0 ;
    }
}