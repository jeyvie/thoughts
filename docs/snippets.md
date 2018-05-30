# JS 代码片段


1. add(1)(2)(3)...

	可以一直加下去，最后要返回计算结果
	
	我们知道，`()` 之前必须是个函数，也就是说，
	
	
	```
	1. 每次执行的返回值是得是个 函数，这样才可以继续用 () 执行;
	2. 但最后返回的结果必须是 数字。
	```
	
	1. 二次转换
	
		这两者好像有点矛盾，但 `js` 神奇的点是，二者好像可以结合:
		
		```
		function add(a) {
		  function sum(b) {
		    a += b;
		    return sum;
		  };
		
		  sum.valueOf = function () { return a };
		
		  return sum;
		}
		```
		
		
		其调用的返回结果是:
		
		```
		add(1)(2)(3)
		
		// f 6
		```
		
		意思是一个 **值为6的函数**！
		
		先分析为什么会这样：
		
		
		> 	js 输出对象时，会调用其上面的 `valueOf` 或 `toString` 方法，我们重写了 `valueOf` 方法，使其返回数字。但函数的 valueOf 必须是 funtion, 所以被转换成了 **数字形式的函数**
		
		以上其实是我的推测(后期验证吧)，但数字形式的对象，也不是不存在，如:
		
		```
		new Number (3)
		
		// Number {3}
		```
		
		其值就是**对象3**。`js` 就是这么神奇！
		
		
		回到刚在的点, `add(1)(2)(3)` 返回的是函数，我们可以转换一下:
		
		```
		+add(1)(2)(3)
		// 6
		```
		
		用了隐式类型转换，将之转换成了真的数字。
		
		但这个终究是有点奇怪，返回值需要转换，不是非常符合第二点需求。而且这也是个 `奇技淫巧`， 可阅读性不好。
	
	
	2. 二次调用
		
		再要取计算结果的时候，再执行一下函数返回值: 
		
		```
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
		
		add(1)(2)(3)()
		// 6
		```
		
		这种做法，多了一次函数调用，还是不够直接。
	
	3. 属性取值

		再返回的函数上添加一个属性，记录计算结果:
	
		```
		function add(a) {
		  return function sum(b) {
		    a += b;
		    sum.result = a;
		    return sum;
		  };
		}
		
		add(1)(2)(3).result
		// 6
		```
		
		
		
	既要满足返回的结果是函数，又要满足它是数字，就这点来看，第一种方法是最为接近的，但需要做一个转换。
	
	三种都需要多做一些事，目前还没有找到很直接的方法。上面的方法中，第一种虽然使用的时候代码最少，但我比较推荐第三种，因为它的可读性更好些。
		
	
	

