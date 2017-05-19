export default function allPermutationsOf(array, callback, level=0) {
    array = array.slice(0);
    const calling = (level === array.length-1);
    let index = level;
    do {
        if (calling) callback(array);
        else allPermutationsOf(array, callback, level+1);

        if (index > 0) {
            const tmp = array[index];
            array[index] = array[index-1];
            array[index-1] = tmp;
        }
    } while (index-- > 0);
};
