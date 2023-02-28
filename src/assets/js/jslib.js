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
        return 0;
    }
}
export function checkContinueTime(arr) {
    let start = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (start + i !== arr[i]) {
            return false;
        }
    }
    return true;
}
export function sortAsc(arr) {
    arr.sort((a, b) => a - b);
    return arr;
}
export function getNowUrl(location) {
    return `${location.pathname}${location.search}`;
}
export function initKakaoLogin() {
    try {
        window.Kakao.init('ec6b5c5e681c307d9d1576ee7fbf2edf');
    } catch (error) {
        consoleLog(error);
    }
}
export function checkNullAndUnde(value) {
    if (value === undefined || value === null || value === 'null' || value === 'undefined') {
        return true;
    }
    return false;
}