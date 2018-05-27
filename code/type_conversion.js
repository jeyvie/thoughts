/* 
  整理的文档，在 ../docs/type_conversion.md 里
*/

let log

{
  let timeid = null
  log = (arg, lastone = true) => {
    if (lastone) clearTimeout(timeid)
    timeid = setTimeout(() => console.log(arg), 100) 
  }
}


/* 
  1. 一元操作符

  1.1 
    前置 ++、--
    后置 ++、--

    前置，在语句求值前执行，
    后置，在语句求值后执行
*/

let str = '12'

/* 可以放在变量前，而不能放在字符串前 */
// log(++'12') // error

log(++str) // 13

str = '12N'

log(++str) // NaN

/* 
  先对变量执行数字转换，
  能转换，在递增
  否则，NaN
*/

let obj = { // 不能是 const
  valueOf: () => '12',
  toString: () => 2
}

log(++obj) // 13

obj = { // 不能是 const
  valueOf: () => '12N',
  toString: () => '2'
}

log(++obj) // NaN , 红宝书书的是 3， 实际是 NaN
log(Number(obj)) // NaN,  照红宝书，先调用 valueOf, 是NaN, 则调用 toString, 那应该是 2
log(obj.toString()) // NaN, 照理说，应该返回 '2


/* 

  1.2 

    +
    -

    前置，在语句求值前执行，
        应用于数值，+ 无影响，- 会将之转为负数
        应用非数值，会先应用转换数值的方法(红宝书的先valueOf, 后toString方法，有误)，然后应用前者规则

    
    后置，在语句求值后执行, error
*/

str = '1'


log(+'1') // 1,  可以直接作用于字符串
log(-'1')  // -1

log(+str) // 1,  
log(-str)  // -1

obj = {
  valueOf: () => '12',
  toString: () => '2'
}

log(+obj) // 12

obj = {
  valueOf: () => '12N',
  toString: () => '2'
}

log(+obj) // NaN

// log(str+) // error

log(1 - - 12) // 优先级比表达式高


/* 
  2. 布尔操作符

  2.1 逻辑非，先将操作数转换为布尔值，在取反

      数字 0, null. NaN, undefined: true
      对象，非空字符串，非 0 数字(包括infinity): false

  2.2 逻辑与， &&

      在有一个操作数不是布尔值时，逻辑与 不一定返回布尔值
      
      两个的布尔值都为真时，会返回第二个值(返回它的本来值，不管是不是布尔值)

  
  2.3 逻辑或， ||， 计算出真值就停止

      只要有真值，返回第一个布尔值为真的值的本来值

      两个值的布尔值都为假，返回第二个值
*/


/* 
  3. 乘性操作符

    非数值，会被转为数值

  3.1  乘
  
    有 NaN， 返回 NaN
    Infinity 与 0 乘，结果是 NaN
    Infinity 与 非0 乘， 结果是 Infinity 或  -Infinity ，视操作数而定

    遇到不是数字的值，转为数值然后按上面操作来

  3.2  除

    有 NaN， 返回 NaN
    Infinity / Infinity, NaN
    0 / 0, NaN

    非0 / 0, 结果是Infinity/-Infinity, 取决于操作数的符号
    
    Infinity / 非零， 结果是Infinity/-Infinity, 取决于操作数的符号

  3.3 模

    非数值，后台调用 Number 转换

    Infinity|-Infinity % 有限大的值， NaN

    有限大的值 % Infinity|-Infinity， 结果是被除数
*/



/* 
  4. 加性操作符

  对于数值
    有一个是 NaN, 结果就是 NaN
    Infinity + Infinity, Infinity
    -Infinity + -Infinity, -Infinity
    Infinity + -Infinity, NaN

    +0 + +0, 0
    -0 + -0, -0
    0 + -0, 0
  
  如果有字符串
    两个都是字符串，直接拼接
    其中一个是，把另一个也转为字符串

  如果有一个值对象，布尔值，则转为字符串

  undefined => 'undefined;
  null => 'null;
  NaN => 'NaN';
*/

obj = {
  toString: () => '2',
  valueOf: () => '12N',
}

log(obj + 1) // '12N1' 还是会优先调用 valueOf

log(Number(obj))

/* 
  5. 关系操作符

  如果都是数值，比较数值
  都是字符串，比较对应的字符编码值
  一个是数值，另一个是字符串，进行数字比较
  一般数字，和 NaN 的任何关系比较，都是false

  有布尔值，则按数字比较 ***

  如果有对象，则调用 valueOf, 没有就调用toString 方法，再按上述规则比较

*/

/* 
  6. 相等操作符

  6.1 ==, !=, 先转换类型，再比较值

      有布尔值，按数字比较
      字符串和数字，按数字比
      对象和非对象，调用对象的 valueOf， 得到基本类型再按上面规则比较

      null == undefined

      null, undefined 比较时不进行转换  ********

      NaN 不等于任何数据，包括自己

      两对象，引用比较

  6.2 先类型比较，再值比较

  6.2 ===, !== 先比较类型，再比较值

*/







