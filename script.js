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
// console.log(timezones.length)
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
  const hourString = new Intl.DateTimeFormat("en-US", options).format(
    new Date()
  );
  return parseInt(hourString, 10);
}
function getMinutes(timeZone) {
  const options = { timeZone, minute: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}
function getSeconds(timeZone) {
  const options = { timeZone, second: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function sclock() {
  let h = document.getElementsByClassName("hr")[0];
  let m = document.getElementsByClassName("mn")[0];
  let s = document.getElementsByClassName("ss")[0];
  let cur = document.getElementsByClassName("digital")[0];

  let selected_time = document.getElementById("timeZoneSelect");
  let country = selected_time.options[selected_time.selectedIndex].value;

  let date = getDate(timezones[country]);
  let hours = getHours(timezones[country]);
  let hours_formatted = hours.toString().padStart(2, "0");
  let minutes = getMinutes(timezones[country]);
  let minutes_formatted = minutes.toString().padStart(2, "0");
  let seconds = getSeconds(timezones[country]);
  let seconds_formatted = seconds.toString().padStart(2, "0");

  let time_period = date.slice(-2);
  h.style.transform = `rotate(${30 * hours + minutes / 2}deg)`;
  m.style.transform = `rotate(${6 * minutes}deg)`;
  s.style.transform = `rotate(${6 * seconds}deg)`;
  cur.innerHTML = `<p>${hours_formatted} : ${minutes_formatted} : ${seconds_formatted}  ${time_period}</p>`;
}

setInterval(sclock, 100);

let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

startBtn.addEventListener("click", function () {
  timer = true;
  stopWatch();
});

stopBtn.addEventListener("click", function () {
  timer = false;
});

resetBtn.addEventListener("click", function () {
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

function stopWatch() {
  if (timer) {
    count++;

    if (count == 100) {
      second++;
      count = 0;
    }

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    let hrString = hour;
    let minString = minute;
    let secString = second;
    let countString = count;

    if (hour < 10) {
      hrString = "0" + hrString;
    }

    if (minute < 10) {
      minString = "0" + minString;
    }

    if (second < 10) {
      secString = "0" + secString;
    }

    if (count < 10) {
      countString = "0" + countString;
    }

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
    document.getElementById("count").innerHTML = countString;
    setTimeout(stopWatch, 10);
  }
}
let input = document.getElementById("inputbox");
let buttons = document.querySelectorAll("input[type=button]");
let string = "";
let arr = Array.from(buttons);
let calc = document.getElementsByClassName("calculator");
console.log(calc[0]);

arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    try {
      if (e.target.value == "=") {
        string = eval(string);
        input.value = string;
      } else if (e.target.value == "sin") {
        let a = (input.value * 3.14) / 180;
        string = Math.sin(a).toFixed(2);
        input.value = string;
      } else if (e.target.value == "cos") {
        let a = (input.value * 3.14) / 180;
        string = Math.cos(a).toFixed(2);
        input.value = string;
      } else if (e.target.value == "tan") {
        let a = (input.value * 3.14) / 180;
        string = Math.tan(a).toFixed(2);
        input.value = string;
      } else if (e.target.name == "cube") {
        let a = input.value;
        string = Math.pow(a, 1 / 3).toFixed(2);
        input.value = string;
      } else if (e.target.name == "sqrt") {
        let a = input.value;
        string = Math.pow(a, 1 / 2).toFixed(2);
        input.value = string;
      } else if (e.target.value == "AC") {
        string = "";
        input.value = string;
      } else if (e.target.value == "DE") {
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

let clk_btn = document.getElementsByClassName("clocktag")[0];
let cal_btn = document.getElementsByClassName("caltag")[0];

clk_btn.addEventListener("click", () => {
  let con1 = document.getElementsByClassName("dropdown-container")[0];
  let con2 = document.getElementsByClassName("stopwatch")[0];
  let con3 = document.getElementsByClassName("container")[0];
  let con4 = document.getElementsByClassName("container2")[0];

  con1.style.display = "block";
  con2.style.display = "block";
  con3.style.display = "flex";
  con4.style.display = "none";
});

cal_btn.addEventListener("click", () => {
  let con1 = document.getElementsByClassName("dropdown-container")[0];
  let con2 = document.getElementsByClassName("stopwatch")[0];
  let con3 = document.getElementsByClassName("container")[0];
  let con4 = document.getElementsByClassName("container2")[0];

  con1.style.display = "none";
  con2.style.display = "none";
  con3.style.display = "none";
  con4.style.display = "flex";
});
