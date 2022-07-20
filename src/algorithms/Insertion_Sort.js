
const is = (array, position, arraySteps, css) => {

    let colorIndex = css[css.length - 1].slice();

    let i, j, key;
    let cc = array.length;
    for (i = 1; i < cc; i++) {
        key = array[i];
        j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            arraySteps.push(array.slice());
            colorIndex[i] = 3;
            if (i === j + 1) {
                colorIndex[j + 1] = 3;
            } else {
                colorIndex[j + 1] = 1;
            }
            colorIndex[j] = 1;
            css.push(colorIndex.slice());
            colorIndex[j + 1] = 0;
            colorIndex[i] = 0;
            colorIndex[j] = 0;
            j = j - 1
        }
        array[j + 1] = key;
        arraySteps.push(array.slice());
        css.push(colorIndex.slice());

    }
    css[css.length - 1] = new Array(array.length).fill(2);
}

export default is;