import { Change } from './Change';

const ss = (array, position, arraySteps, css) => {
    let colorIndex = css[css.length - 1].slice();
    for (let i = 0; i < array.length - 1; i ++) {
        let min_index = i;
        for (let j = i + 1; j < array.length; j ++) {
            if (array[j] < array[min_index]) {
                min_index = j;
            }
            colorIndex[min_index] = 1;
            colorIndex[j] = 1;
            arraySteps.push(array.slice());

            css.push(colorIndex.slice());
            colorIndex[min_index] = 0;
            colorIndex[j] = 0;
        }
        Change(array, min_index, i);
        colorIndex[i] = 2;
        arraySteps.push(array.slice());
        css.push(colorIndex.slice());
    }
    css[css.length - 1] = new Array(array.length).fill(2);
}

export default ss;