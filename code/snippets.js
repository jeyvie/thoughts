/* 
  add(1)(2)(3)...
  
  1. 每次执行的返回值是得是个`函数`，这样才可以继续用 `()` 执行;
	2. 但最后返回的结果必须是 `数字`;

*/

// 1. 需要转换
{
  function add(a) {
    function sum(b) {
      a += b;
      return sum;
    };

    sum.valueOf = function () { return a };

    return sum;
  }
  console.log(+add(1)(2)(3))
}

// 2. 需要二次执行
{
  function add(x) {
    return function sum (y) {
      if (typeof y !== 'undefined') {
        x = x + y;
        return sum;
      } else {
        return x;
      }
    };
  }

  console.log(add(1)(2)(3)())
}


// 3. 添加属性
{
  function add(a) {
    return function sum(b) {
      a += b;
      sum.result = a;
      return sum;
    };
  }
  console.log(add(1)(2)(3).result)
}