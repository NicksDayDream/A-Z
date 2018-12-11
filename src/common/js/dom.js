// 添加className
export function addClass( el, className ){
	if(hasClass( el, className )) return
	// 如果没有，那么添加
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

// 判断是否有这个className
export function hasClass( el, className ){
	let reg = new RegExp( '(^|\\s)' + className + '(\\s|$)' )
	return reg.test(el.className)
}

// 获取/设置自定义属性
export function getData(el, name, val) { 
	name = 'data-' + name
	if (val) {
		return el.setAttribute(name, val)
	} else {
		return el.getAttribute(name)
	}
}