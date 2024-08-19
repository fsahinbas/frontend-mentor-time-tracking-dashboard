const container = document.querySelector(".container");
const linkWrapper = document.querySelector(".profile .body");
const links = document.querySelectorAll(".profile .body .link");
let interval = "daily";

const fetchData = async () => {
  const response = await fetch("/data.json");
  const data = await response.json();
  const cards = data;
  cards.forEach((card) => {
    const { title, className, color, image, timeframes } = card;
    const { daily, weekly, monthly } = timeframes;
    let { current, previous } = daily;
    const { current: weeklyCurrent, previous: weeklyPrevious } = weekly;
    const { current: monthlyCurrent, previous: monthlyPrevious } = monthly;

    const cardEl = document.createElement("div");
    if (interval === "daily") {
      current = daily.current;
      previous = daily.previous;
    } else if (interval === "weekly") {
      current = weeklyCurrent;
      previous = weeklyPrevious;
    } else if (interval === "monthly") {
      current = monthlyCurrent;
      previous = monthlyPrevious;
    }
    cardEl.innerHTML = `
       
        <div class="header">
          <h2 class="title">${title}</h2>
          <img src="images/icon-ellipsis.svg" alt="work">
        </div>
        <div class="body">
          <p class="current-value">${current}hrs</p>
          <p class="previous-value">Last Week - <span>${previous}hrs</span></p>
        </div>
      `;
    cardEl.className = `card ${className}`;
    cardEl.style.setProperty("--bgColor", color);
    cardEl.style.setProperty("--bgImage", image);
    container.appendChild(cardEl);
  });
};

fetchData().then((data) => {});

linkWrapper.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("link")) {
    interval = target.textContent.toLowerCase();
    fetchData();
    links.forEach((link) => {
      link.classList.remove("active");
    });
    target.classList.add("active");
  }
});
