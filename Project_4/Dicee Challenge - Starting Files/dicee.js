
diceRandom();

function diceRandom() {
  var randomNumber1 = getRandomArbitrary(1, 7);
  var img1 = document.getElementsByClassName('img1');
  img1[0].src = 'images/dice' + randomNumber1 + '.png';
  // alert();

  var randomNumber2 = getRandomArbitrary(1, 7);
  var img2 = document.getElementsByClassName('img2');
  img2[0].src = 'images/dice' + randomNumber2 + '.png';

  var headingMessage = document.getElementById('heading_message');
  if(randomNumber1 == randomNumber2) {
    headingMessage.innerHTML = 'Draw!';
  } else if (randomNumber1 > randomNumber2) {
    headingMessage.innerHTML = '<i class="fa-solid fa-flag-checkered"></i>' + ' Player 1 Wins';
  } else {
    headingMessage.innerHTML = 'Player 2 Wins ' + '<i class="fa-solid fa-flag-checkered"></i>';
  }
}


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
