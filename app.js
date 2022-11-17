var inputRange = document.getElementsByClassName('btn__swipe__pullee')[0],
    maxValue = 100, // the higher the smoother when dragging
    speed = 12, // thanks to @pixelass for this
    currValue, rafID;
var fake = document.querySelector('.btn__swipe__fake');
var label = document.querySelector('.btn__swipe__literal .literal');

// set min/max value
inputRange.min = 0;
inputRange.max = maxValue;

// listen for unlock
function unlockStartHandler() {
    // clear raf if trying again
    window.cancelAnimationFrame(rafID);
    
    // set to desired value
    currValue = +this.value;
    animateFake();
}

function unlockEndHandler() {
    
    // store current value
    currValue = +this.value;
    
    // determine if we have reached success or not
    if(currValue >= maxValue) {
        successHandler();
    }
    else {
        rafID = window.requestAnimationFrame(animateHandler);
    }
    animateFake();
}

// handle range animation
function animateHandler() {
    
    // update input range
    inputRange.value = currValue;
    
    // determine if we need to continue
    if(currValue > -1) {
    	window.requestAnimationFrame(animateHandler);   
    }
    
    // decrement value
    currValue = currValue - speed;
    animateFake();
}

// handle successful unlock
function successHandler() {
    location.replace('https://brandandvisual.com')
    
    // reset input range
    inputRange.value = 0;
    inputRange.closest('.btn__swipe').classList.add('success');
    // animateFake();
};

function animateFake() {
  const thumbSize = 45;
  const value = inputRange.value;
  const valueMax = inputRange.max;
  const valueMin = inputRange.min;
  const totalInputWidth = 254;
  const thumbHalfWidth = 55 / 2;
  const ratio = (value - valueMin) / (valueMax - valueMin); //el max value es 1
  
 
  
  console.info("ratio-->", ratio);
  
  const left = (((value - valueMin) / (valueMax - valueMin)) * ((totalInputWidth - thumbHalfWidth) - thumbHalfWidth)) + thumbHalfWidth;
  fake.style.left = `${left}px`;
  // fake.style.transform = `translateX(-50%) rotate(${360*ratio}deg)`;
  label.style.opacity = (1 - ratio);
};

// bind events
animateFake(); // para colocar en la posicion correcta
inputRange.addEventListener('mousedown', unlockStartHandler, false);
inputRange.addEventListener('mousestart', unlockStartHandler, false);
inputRange.addEventListener('mouseup', unlockEndHandler, false);
inputRange.addEventListener('touchend', unlockEndHandler, false);
inputRange.addEventListener('input', animateFake);