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

  let history = [];

  btn.addEventListener("click", () => {
    if (+input.value.length === +numberOfDigits && input.value.match(/\d/)) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      const [juniors, seniors] = juniorsAndSeniorsAlgorithm(answer, [
        ...input.value,
      ]);

      if (!history.includes(input.value)) {
        history.push(input.value);

        td1.innerText = input.value;
        td2.innerText = `${juniors}J${seniors}S`;

        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
      } else {
        alert("This number already used");
      }
    } else {
      alert(`You should enter number with ${numberOfDigits} digits!`);
    }
  });
};

const getRandomIndex = () => {
  return +Math.random().toFixed(1) * 10;
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
    alert("You win!");
    location.reload();
  }

  return [juniors, seniors];
};

start();
