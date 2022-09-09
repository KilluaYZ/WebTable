var arr = [1,2,3,4];
var sum =0;
arr.forEach((value,index) => {

//  array[index] == value; //结果为true

 sum+=value; 
 console.log(index + " : " + value)

 });

console.log(sum); //结果为 10
