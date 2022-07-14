
var numberOfDrumButtons = document.querySelectorAll(".drum").length;
var drumsList = document.querySelectorAll(".drum");

drumsList.forEach(drum => drum.addEventListener('click', function() {
  findAudio(drum.className.charAt(0));
  buttonAnimation(drum.className.charAt(0));
}));

document.addEventListener('keydown', (event)=>{
  findAudio(event.key);
  buttonAnimation(event.key);
})


function findAudio(key) {
  switch (key) {
    case 'w':
      var wSound = new Audio("./sounds/crash.mp3");
      wSound.play();
      break;
    case 'a':
      var aSound = new Audio("./sounds/kick-bass.mp3");
      aSound.play();
      break;
    case 's':
      var sSound = new Audio("./sounds/snare.mp3");
      sSound.play();
      break;
    case 'd':
      var dSound = new Audio("./sounds/tom-1.mp3");
      dSound.play();
      break;
    case 'j':
      var jSound = new Audio("./sounds/tom-2.mp3");
      jSound.play();
      break;
    case 'k':
      var kSound = new Audio("./sounds/tom-3.mp3");
      kSound.play();
      break;
    case 'l':
      var lSound = new Audio("./sounds/tom-4.mp3");
      lSound.play();
      break;
  } 
}

function buttonAnimation(btnKey) {
  var activeButton = document.querySelector('.' + btnKey);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100)
}