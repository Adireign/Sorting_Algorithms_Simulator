export function Change(array, i, j) {
    let arr = array[i];
    array[i] = array[j];
    array[j] = arr;
    return arr;
}