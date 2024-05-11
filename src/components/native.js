const fruits = [
    { name: 'apple', quantity: 2 },
    { name: 'banana', quantity: 3 },
    { name: 'orange', quantity: 1 },
];

let totalQuantity = fruits.reduce((acc, fruit) => {

    return acc + fruit.quantity
}, 0)

console.log(totalQuantity)