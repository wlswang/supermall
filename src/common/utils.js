// //1.防抖函数:减少多次请求服务次
// export function debounce(func, delay) {
//   let timer=null
//   return function(...args){
//     if(timer) clearTimeout(timer)
//     timer=setTimeout(()=>{
//       func.apply(this,args)
//     },delay)
//   }
// }

// //2.时间戳格式转换
// export function formatDate(date, fmt) {
//   //1.获取年份  y-9,yy-19,yyy-019,yyyy-2019
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace('yyyy', (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }

//     //2.获取月份，天数，小时，分钟，秒数
//   let o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   };
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + '';
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//   return fmt;
// }

// //补0  :4:4:4---04:04:04
// function padLeftZero(str) {
//   return ('00' + str).substr(str.length);
// }



//1.防抖函数:减少多次请求服务次
export function debounce(func, delay) {
  let timer=null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

//2.时间戳格式转换
export function formatDate(date, fmt) {
//1.获取年份  y-9,yy-19,yyy-019,yyyy-2019
if (/(y+)/.test(fmt)) {
  fmt = fmt.replace('yyyy', (date.getFullYear() + '').substr(4 - RegExp.$1.length));
}

  //2.获取月份，天数，小时，分钟，秒数
let o = {
  'M+': date.getMonth() + 1,
  'd+': date.getDate(),
  'h+': date.getHours(),
  'm+': date.getMinutes(),
  's+': date.getSeconds()
};
for (let k in o) {
  if (new RegExp(`(${k})`).test(fmt)) {
    let str = o[k] + '';
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
  }
}
return fmt;
}

//补0  :4:4:4---04:04:04
function padLeftZero(str) {
return ('00' + str).substr(str.length);
}
