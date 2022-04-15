export function delay(delay) {
    return new Promise(res => setTimeout(res, delay))
}