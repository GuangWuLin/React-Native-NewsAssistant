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
 let outputdollars = function (number) {
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
 let  outputcents = function(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
// 排序
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