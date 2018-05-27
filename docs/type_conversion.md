# JS 里的类型转换

这里记些 `js` 隐式类型转换里容易被坑的点。[代码在这里](../code/type_conversion.js)。

## 显式类型转换


1. Number

 	
 	1. 值得注意的例子
	
		```
		空字符串或字符串都为空，返回 0
		
		Number('')     // 0
		
		Number('   ')  // 0
		
		Number(undefined) // NaN
		
		Number(null)  // 0
		
		```
	2. 转换对象

		优先调用 `valueOf` ，再调用 `toString`
		
		
		```
		let obj = {
		  toString: () => '2',
		  valueOf: () => '12N',
		}
		
		log(Number(obj)) // NaN
		
		obj = {
		  toString: () => '2',
		}
		
		log(Number(obj)) // 2
		```

2. parseInt

	1. 值得注意的例子

	
		```
		// 对空字符串的态度，与Number不一样
		parseInt('') // NaN
		parseInt(' ') // NaN
		
		```
	
	2. 其他进制

		`paseInt` 第二个参数 `radix`， 第一个参数是 `n` (2 - 36之间, MDN) 进制的， 但还是会以 `10` 进制方式返回结果。
		
				
		`radix` 不在 `2 - 26` 范围的，返回结果是 `NaN`。 除了 `0`， 其效果和默认值 `10` 的效果一样。
		
		
		```
		parseInt('12', 1)  // NaN
		parseInt('12', 0)  // 12
		```
	
3. parseFloat

	没有和 `parseInt` 一样的进制问题




## 隐式类型转换

1. `+`、`-` 既是二元操作符，也是一元操作符。就是说，下面的表示式是有效的：

	
	```
	1 + - '1' + '2' // '02'
	```

	应用于数值，`+` 无影响，`-` 会将之转为负数；
	
	应用非数值，会先应用转换数值的方法，然后应用数值规则。
	
	
2. `null` 、`undefined` 、 `NaN` 的字符串形式就是他们的表面形式

	
	```
	null + '1' // 'null1'
	
	NaN + '1'  // 'NaN1'
	
	undefined + '1' // 'undefined1'
	
	```
	

3. `null`, `undefined` 比较时不进行转换

4. `null == undefined` 返回 `true`

5. 关系操作比较

		
	```
	1. 如果都是数值，比较数值
	2. 都是字符串，比较对应的字符编码值
	3. 一个是数值，另一个是字符串，进行数字比较
	4. 一般数字，和 NaN 的任何关系比较，都是false
	5. 有布尔值，则按数字比较
	6. 如果有对象，则调用 valueOf, 没有就调用toString 方法，再按上述规则比较
	```








