import {Change} from './Change';

const bs = (array, position, arraySteps, css) => {
	
    let colorKey = css[css.length - 1].slice();
    let cc = array.length;
	for (let i = 0; i < cc - 1; i++) {
		for (let j = 0; j < cc - i - 1; j++) {
            if (array[j + 1] < array[j]) {
                array = Change(array, j, j + 1);
            }
            arraySteps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            css.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }

        let asl = arraySteps.length;
        colorKey[asl - 1 - i] = 2;
        css.push(colorKey.slice());
        arraySteps.push(array.slice());
	}
    
    css[css.length - 1] = new Array(array.length).fill(2);
    return;
};

export default bs;