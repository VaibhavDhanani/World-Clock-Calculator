const timezones = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
  "Africa/Cairo",
  "Asia/Shanghai",
  "America/Chicago",
  "America/Toronto",
  "Europe/Paris",
  "Africa/Johannesburg",
  "Asia/Hong_Kong",
  "America/Mexico_City",
  "Asia/Singapore",
  "America/Sao_Paulo",
  "Europe/Moscow",
  "America/Buenos_Aires",
  "Asia/Jerusalem",
  "Pacific/Auckland",
  "Pacific/Honolulu",
  "Asia/Seoul",
  "Asia/Bangkok",
  "America/Phoenix",
  "America/Denver",
  "Africa/Nairobi",
  "Asia/Riyadh",
  "Europe/Stockholm",
  "Asia/Kuwait",
  "America/Anchorage",
  "Europe/Istanbul",
  "Asia/Kuala_Lumpur",
  "Asia/Taipei",
  "Australia/Perth",
  "America/Vancouver",
  "Asia/Manila",
  "Europe/Amsterdam",
  "America/Lima",
  "Asia/Dhaka",
  "America/Bogota",
  "America/Montreal",
  "Asia/Kolkata",
  "Asia/Baghdad",
];

function getDate(timeZone) {
  const options = {
    timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date().toLocaleString("en-US", options);
}

function getHours(timeZone) {
  const options = { timeZone, hour: "numeric" };
  return parseInt(
    new Intl.DateTimeFormat("en-US", options).format(new Date()),
    10
  );
}

function getMinutes(timeZone) {
  const options = { timeZone, minute: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function getSeconds(timeZone) {
  const options = { timeZone, second: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function updateClock() {
  const h = document.querySelector(".hr");
  const m = document.querySelector(".mn");
  const s = document.querySelector(".ss");
  const cur = document.querySelector(".digital");
  const selectedTimezone = document.querySelector("#timeZoneSelect").value;

  const date = getDate(timezones[selectedTimezone]);
  const hours = getHours(timezones[selectedTimezone])
    .toString()
    .padStart(2, "0");
  const minutes = getMinutes(timezones[selectedTimezone]);
  const minutesFormatted = minutes.toString().padStart(2, "0");
  const seconds = getSeconds(timezones[selectedTimezone]);
  const secondsFormatted = seconds.toString().padStart(2, "0");

  const timePeriod = date.slice(-2);

  h.style.transform = `rotate(${30 * hours + minutes / 2}deg)`;
  m.style.transform = `rotate(${6 * minutes}deg)`;
  s.style.transform = `rotate(${6 * seconds}deg)`;
  cur.innerHTML = `<p>${hours} : ${minutesFormatted} : ${secondsFormatted}  ${timePeriod}</p>`;
}

setInterval(updateClock, 100);

let timer = false;
let timerInterval;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

function stopWatch() {
  if (timer) {
    count++;
    if (count === 100) {
      second++;
      count = 0;
    }
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    document.getElementById("hr").innerHTML = hour.toString().padStart(2, "0");
    document.getElementById("min").innerHTML = minute
      .toString()
      .padStart(2, "0");
    document.getElementById("sec").innerHTML = second
      .toString()
      .padStart(2, "0");
    document.getElementById("count").innerHTML = count
      .toString()
      .padStart(2, "0");

    timerInterval = setTimeout(stopWatch, 10);
  }
}

document.getElementById("start").addEventListener("click", function () {
  timer = true;
  stopWatch();
});

document.getElementById("stop").addEventListener("click", function () {
  timer = false;
  clearTimeout(timerInterval);
});

document.getElementById("reset").addEventListener("click", function () {
  timer = false;
  hour = 0;
  minute = 0;
  second = 0;
  count = 0;
  document.getElementById("hr").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("count").innerHTML = "00";
});

// Calculator 

const input = document.getElementById("inputbox");
const buttons = document.querySelectorAll("input[type=button]");
let string = "";
const arr = Array.from(buttons);

arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    try {
      if (e.target.value === "=") {
        string = eval(string);
        input.value = string;
      } else if (
        e.target.value === "sin" ||
        e.target.value === "cos" ||
        e.target.value === "tan"
      ) {
        const a = (input.value * Math.PI) / 180;
        string = Math[e.target.value](a).toFixed(2);
        input.value = string;
      } else if (e.target.name === "cube" || e.target.name === "sqrt") {
        string = Math.pow(
          input.value,
          1 / (e.target.name === "cube" ? 3 : 2)
        ).toFixed(2);
        input.value = string;
      } else if (e.target.value === "AC") {
        string = "";
        input.value = string;
      } else if (e.target.value === "DE") {
        string = string.substring(0, string.length - 1);
        input.value = string;
      } else {
        string += e.target.value;
        input.value = string;
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        string = "ERROR!";
        input.value = string;
      }
    }
  });
});

document.querySelector(".clocktag").addEventListener("click", () => {
  document.querySelector(".dropdown-container").style.display = "block";
  document.querySelector(".stopwatch").style.display = "block";
  document.querySelector(".container").style.display = "flex";
  document.querySelector(".container2").style.display = "none";
});

document.querySelector(".caltag").addEventListener("click", () => {
  document.querySelector(".dropdown-container").style.display = "none";
  document.querySelector(".stopwatch").style.display = "none";
  document.querySelector(".container").style.display = "none";
  document.querySelector(".container2").style.display = "flex";
});
