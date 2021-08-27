const data = [
    {name: 'as', age: 13},
    {name: 'as1', age: 123},
    {name: 'as2', age: 133}
]

const tmp = data.map((ele, index) => (
    {a: ele.name, b: index}
))
console.log(tmp)