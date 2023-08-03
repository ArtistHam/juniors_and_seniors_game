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

  for (let i = 0; i < numberOfDigits; i++) {
    const number = digits.splice(-getRandomIndex(), 1)[0];
    answer.push(number);
  }

  const input = document.getElementById("guess");
  const btn = document.getElementById("guessBtn");
  const table = document.getElementById("history");
  const score = document.getElementById("score");
  const high_score = document.getElementById("highscore");

  let history = [];

  const highScore = localStorage.getItem("highScore");

  if (highScore) {
    high_score.innerText = highScore;
  }

  let currentScore = 1000 * numberOfDigits;

  score.innerText = currentScore;

  btn.addEventListener("click", () => {
    if (
      +input.value.length === +numberOfDigits &&
      input.value.match(/\d/) &&
      !input.value.match(/0/) &&
      checkUnique(+input.value)
    ) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      const [juniors, seniors] = juniorsAndSeniorsAlgorithm(answer, [
        ...input.value,
      ]);

      if (!history.includes(input.value)) {
        if (currentScore > 10 * history.length) {
          currentScore = currentScore - 10 * history.length;
        }

        score.innerText = currentScore;

        history.push(input.value);

        td1.innerText = input.value;
        td2.innerText = `${juniors}J${seniors}S`;

        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
        input.value = "";
      } else {
        alert("This number already used");
      }
    } else {
      alert(
        `You should enter number with ${numberOfDigits} unique non-zero digits!`
      );
    }
  });
};

const getRandomIndex = () => {
  return +Math.random().toFixed(1) * 10;
};

const checkUnique = (number) => {
  let arr = `${number}`.split("");
  let uniqueSet = [];
  for (let i = 0; i < arr.length; i++) {
    if (uniqueSet.includes(arr[i])) {
      return false;
    }
    uniqueSet.push(arr[i]);
  }
  return true;
};

const juniorsAndSeniorsAlgorithm = (answer, guess) => {
  let juniors = 0;
  let seniors = 0;

  for (let i = 0; i < answer.length; i++) {
    if (+answer[i] === +guess[i]) {
      seniors++;
      continue;
    }
    if (answer.includes(+guess[i])) {
      juniors++;
    }
  }

  if (seniors === answer.length) {
    const score = document.getElementById("score");
    localStorage.setItem("highScore", +score.innerText);
    alert("You win!");
    location.reload();
  }

  return [juniors, seniors];
};

start();
