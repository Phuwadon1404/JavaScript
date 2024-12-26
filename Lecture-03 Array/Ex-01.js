let values1 = ['Apple', 1, false];
let values2 = ['Fries', 2, true];
let values3 = ['Mars', 9, 'Apple'];


function findCommonElements(arr1, arr2, arr3) {
    return arr1.filter(item => arr2.includes(item) && arr3.includes(item));
}

const commonElements = findCommonElements(values1, values2, values3);
console.log("Common elements:", commonElements);

