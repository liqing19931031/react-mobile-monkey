const baseIp = 'http://10.0.92.157:3000/'
let createXHR = function () {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	} else {
	}
}
let params = function (data) {
	let arr = []
	for (let i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
	}
	return arr.join('&')
}
let ajax = function (obj) {
	return new Promise(function (resolve, reject) {
		let xhr = createXHR()
		obj.url = obj.url //  + '?rand=' + Math.random()
		obj.data = params(obj.data)
		if (obj.method === 'get') {
	        obj.url += obj.url.indexOf('?') === -1 ? '?' + obj.data : '&' + obj.data
	  }
	  if (obj.async === true) {
	  	xhr.onreadystatechange = function () {
	  		if (xhr.readyState === 4) {
	  			resolve(JSON.parse(xhr.responseText))
	  		}
	  	}
	  }
	  xhr.open(obj.method, obj.url, obj.async)
	  if (obj.method === 'post') {
	      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	      xhr.send(obj.data)
	  } else {
	      xhr.send(null)
	  }
	  if (obj.async === false) {
	      resolve(JSON.parse(xhr.responseText))
	  }
	})
}

let $ajax = function (method, url, data) {
	return ajax({
		method: method,
		url: baseIp + url,
		data: data || '',
		async: true
	})
}

export default $ajax
