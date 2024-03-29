const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = `~!@#$%^&*(0-+)";=/*<,>`;

let password = "";
let passwordLength = 10;
let checkCount = 0;
handSlider();
//  set strength colour grey
setIndicator("#ccc")
function handSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // shadow wala thing dalne h bhai ko
  indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
  return getRndInteger(0, 9);
}
function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbol() {
  const random = getRndInteger(0, symbols.length);
  return symbols.charAt(random);
}
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSum = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSum = true;
  if (hasUpper && hasLower && (hasNum && hasSum)&&passwordLength >= 8) {
    setIndicator("#0f0");
  } else if ((hasLower || hasUpper) && (hasNum|| hasSum)&&passwordLength >= 6) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
console.log("yha chlra");
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  // to make span wala visible
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
  console.log(" or yha");
}
console.log("kyo ni chlra ");
function shufflePassword(array){

    //fisher shakes 
    for(let i=array.length-1;i>0;i--){
        const j =Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str ="";
    array.forEach((el)=>(str+=el));
    return str;
}
function handleCheckboxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) 
       checkCount++;
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handSlider();
  }
}
console.log("yha dikkat h or ok");

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckboxChange);
})
inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handSlider();
})
copyBtn.addEventListener('click', () => {
  if (passwordDisplay.value) 
          copyContent();
})
generateBtn.addEventListener('click',()=>{
    // agar koi check box hmne dbaya ni
    if(checkCount==0) 
       return;
    if (passwordLength<checkCount){
        passwordLength=checkCount;
        handSlider();
    } 
    // ab hm password nikalenge
    //remove old password
    password ="";
    //lets put the stuff mentioned in check box
    // if(uppercaseCheck.checked){
    //     password+=generateUperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numbersChec.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();

    // }
    console.log("chlja vrooo");
    let funcArr =[];
    if(uppercaseCheck.checked){ 
           funcArr.push(generateUpperCase);
        }
        if(lowercaseCheck.checked){
            funcArr.push(generateLowerCase);
        }
        console.log("kya dikkat h jnab");
        if(numbersCheck.checked){
           funcArr.push(generateRandomNumber);
        }
        if(symbolsCheck.checked){
            funcArr.push(generateSymbol);
        }
        //compulsory addition
        for (let i=0;i<funcArr.length;i++){
            password+=funcArr[i]();
        }
        // remaining addition
        console.log("chlja bhai plzz");
        for (let i=0;i<passwordLength-funcArr.length;i++){
            let randIndex  = getRndInteger(0, funcArr.length);
            password+=funcArr[randIndex]();
        }
        // shuffle the password
        password= shufflePassword(Array.from(password));
        //show krdo ui me
        passwordDisplay.value =password;
        //calculate strenght
        calcStrength();
        console.log("bhot mehnat kri h");

    
});
