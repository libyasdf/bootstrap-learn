(() => {
  // let:      块级作用域
  for (let i = 0; i < 3; i++) {
    console.log(i) // 0 1 2
  }
  console.log(i) // Uncaught ReferenceError: i is not      defined
})()
(() => {
  //      const: 常量 块级作用域
  const t2 = {
    a: 1
  }
  t2.a = 3
  console.log(t2.a) // 3    **引用类型 存放的是地址
  const t1 = 1
  t1 = 2
  console.log(t1) // Uncaught TypeError: Assignment to      constant variable.
})()
