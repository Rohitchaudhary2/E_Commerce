const arr =[
    {x: 1},
    {y: 2},
    {z: 3}
]

let res = {}

arr.reduce((res, val) => {
    res = {...res, ...val}
    return res
})

console.log(res)