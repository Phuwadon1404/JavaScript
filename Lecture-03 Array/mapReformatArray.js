const kvArray = [
    { key: 1, Value: 10},
    { key: 2, Value: 20},
    { key: 3, Value: 30},
];

const reformattedArray = kvArray.map(({key, value}) => ({[key]: value}));

console.log(reformattedArray);
console.log(kvArray);

