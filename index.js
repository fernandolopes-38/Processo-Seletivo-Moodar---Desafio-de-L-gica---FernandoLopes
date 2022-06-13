const form = document.querySelector("form");
const input = document.querySelector("input");
const div = document.querySelector("div");
let interval;

const printHourglass = (n, sec, line) => {
  let hourglass = ``;
  for (let i = 0; i < n; i++) {
    hourglass += `<p>`;
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === n - 1 || j === 0 || j === n - 1) {
        hourglass += "#";
      } else if (j === i || j === n - 1 - i) {
        hourglass += "#";
      } else if (j < i && j >= n - i) {
        if (i > n - line - 1) {
          hourglass += "#";
        } else {
          if (j - line < sec && n - line - 1 === i) {
            hourglass += "#";
          } else hourglass += "&nbsp;";
        }
      } else if (j < i || j >= n - i) {
        hourglass += "&nbsp;";
      } else {
        if (i < line) {
          hourglass += "&nbsp;";
        } else {
          if (j - line < sec && line === i) {
            hourglass += "&nbsp;";
          } else hourglass += "#";
        }
      }
    }

    hourglass += `</p>`;
  }
  div.innerHTML = hourglass;
};

const init = () => {
  form.addEventListener("submit", handleSubmit);
};

const handleSubmit = (e) => {
  e.preventDefault();
  clearInterval(interval);

  const n = input.value;
  let sec = 0;
  let line = 0;

  interval = setInterval(() => {
    if (sec % (n - 2 * line) === 0) {
      sec = 0;
      line++;
    }
    printHourglass(n, sec, line);
    sec += 1;
    if (line === Math.floor(n / 2)) {
      clearInterval(interval);
    }
  }, 100);
};

init();
