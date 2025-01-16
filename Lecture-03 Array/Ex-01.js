let values1 = ['Apple', 1, false];
let values2 = ['Fries', 2, true];
let values3 = ['Mars', 9, 'Apple'];


function findCommonElements(values1, values2, values3) {
    return values1.filter(item => values2.includes(item) && values3.includes(item));
}

const commonElements = findCommonElements(values1, values2, values3);
console.log("Common elements:", commonElements);

