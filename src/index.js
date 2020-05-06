import printMe from './js/print.js';;

console.log("module:", module);
if (module.hot) {
  module.hot.accept('./js/print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}
(() => {
  for (let i = 0; i < 4; i++) {
    console.log(i) // 0 1 2
  }
})()
// (() => {
//   //      const: 常量 块级作用域
//   const t2 = {
//     a: 1
//   }
//   t2.a = 3
//   console.log(t2.a) // 3    **引用类型 存放的是地址
//   const t1 = 1
//   t1 = 2
//   // console.log(t1) // Uncaught TypeError: Assignment to      constant variable.
// })()
