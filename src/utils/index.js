function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
}
// function debounce(fn, delay){
//   let timer = null;
//   return function() {
//     if(timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(fn, delay)
//   }
// }

export default debounce;