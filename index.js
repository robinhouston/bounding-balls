import enclose from "./enclose-no-mtf";

const B1 = {name: "B1", x: 400, y: 200, r: 100},
      B2 = {name: "B2", x: 400, y: 420, r: 9},
      B3 = {name: "B3", x: 270, y: 200, r: 6},
      B4 = {name: "B4", x: 490, y: 140, r: 3},
      B5 = {name: "B5", x: 490, y: 260, r: 3};

const a = {name: "a", x: 365, y: 90, r: 5},
      b = {name: "b", x: 430, y: 90, r: 5},
      c = {name: "c", x: 400, y: 150, r: 10},
      d = {name: "d", x: 400, y: 100, r: 30},
      D = {name: "D", x: 400, y: 500, r: 10};

// const input_circles = [B1,B2,B3,B4,B5];
const input_circles = [ d, D, c, b, a ];

function allPermutationsOf(array, callback, level=0) {
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
}

// allPermutationsOf(input_circles, circles => {
// 	console.log("< " + circles.map(c => c.name).join(",") + " >");
// 	console.log(enclose(circles))
// });

console.log(enclose(input_circles));
