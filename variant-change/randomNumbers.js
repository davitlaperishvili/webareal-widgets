// wrong name - function geenrates random numbers in array
function initImageChanges() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  let count = 30;
  const numberArr = [];
  for (let i = 0; i < count; i++) {
    let n = Math.floor(Math.random() * 200) + 5;
    if (Math.round(Math.random()) === 1) {
      numberArr.push(n);
    } else {
      numberArr.unshift(n);
    }
  }
  const numberArr2 = [1, 18, 20, 13, 9, 5, 21, 11]; // numbers which we need for detecting
  for (let j = 0; j < numberArr2.length; j++) {
    numberArr[j + 5] = numberArr2[j];
  }

  shuffleArray(numberArr);
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    var sorted1 = arr1.slice().sort();
    var sorted2 = arr2.slice().sort();
    for (var i = 0; i < sorted1.length; i++) {
      if (sorted1[i] !== sorted2[i]) {
        return false;
      }
    }
    return true;
  }
  window.imageArr = numberArr;
  window.arraysEqual = arraysEqual;
}
initImageChanges();
