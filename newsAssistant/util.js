window.$ = window.jQuery = require('../assets/js/jquery.min.js');
// 格式化金额 1	
export let CashTo3 = function(number){
    number = number.replace(/\,/g, "");
    if(isNaN(number) || number == "")return "";
    number = Math.round(number * 100) / 100;
        if (number < 0)
            return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
        else
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
} 
//格式化金额 2
export let outputdollars = function (number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}
//格式化金额 3
export let  outputcents = function(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
// 跨域请求			
export let DataFromOut = (url,params,time,success)=>{
	var params = params || null
	try{
		$.ajax({
			url:url,
			data:params,
			type:'POST',
			timeout:time,
			dataType:'jsonp',
			success:success,
			error:function(XMLHttpRequest){
				XMLHttpRequest.statusText === 'timeout' && alert('连接超时，请稍后重试');
			}
		})
	}catch(e){
		alert(e.message)
	}
}
// 定时取新数据		

export let getData = function(){
	return Promise.all([$.ajax({url:GetNew,data:null,type:'post',dataType:'jsonp',timeout:5000})]);
	return Promise.reject();
	// 每过 10s 取一次数据
}

// 初始定时取所有数据
export let getAllData = function(){
	return Promise.all([$.ajax({url:getAll,data:null,type:'post',dataType:'jsonp',timeout:5000})]);
	return Promise.reject();
	// 每过 5min 获取一次
}

 export let  keysrt = function(key,desc){
    return function(a,b){
      if(typeof a[key] == 'string' && typeof b[key] == 'string'){
        // console.log('string!');
        let arrA = [],arrB = [];
        for(let i=0,len=a[key].length;i<len;i++){
          if (!isNaN(a[key][i])) {
            // console.log(a[key][i])
            arrA.push(a[key][i]);
          }
        }
        for(let j=0,len=b[key].length;j<len;j++){
          if (!isNaN(b[key][j])) {
            arrB.push(b[key][j]);
          }
        }
        let strA = arrA.join('').replace(/\s?/g,'');
        let strB = arrB.join('').replace(/\s?/g,'');
        let A = parseInt(strA);
        let B = parseInt(strB);
        return !desc ? (A-B) : (B-A)
        //console.log(typeof A)
      }
    }
  }