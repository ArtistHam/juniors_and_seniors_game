const start = () => {
  const numberOfDigits = +prompt("Enter number of digits");
  if (
    Number.isNaN(numberOfDigits) ||
    numberOfDigits < 2 ||
    numberOfDigits > 9
  ) {
    alert("Enter number between 2 and 9 inclusively");
    start();
    return;
  }

  let answer = [];

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for(let i =0; i < numberOfDigits; i++) {
    const number = digits.splice(-getRandomIndex(), 1);
    answer.push(number);
  }

  alert(answer);

};

const getRandomIndex = () => {
  return +Math.random().toFixed(1) * 10;
}

start();
