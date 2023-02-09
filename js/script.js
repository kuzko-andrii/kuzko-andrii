window.addEventListener("scroll", () => {
    const header = document.body.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
    const menuItem = header.querySelector(".menu__item");
    menuItem.style.display = window.scrollY > 0 ? "" : "none";

    if (!isPlaying && !isPlayingNow && window.scrollY != 0) {
        playTrack();
        isPlayingNow = true;
    }
});

document.addEventListener("click", (e) => {
    const heart = document.createElement("i");
    heart.classList = "fa-solid fa-heart heart_click";
    const x = e.pageX;
    const y = e.pageY;
    heart.style.left = x - 13 + "px";
    heart.style.top = y - 13 + "px";

    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 1000);
});

function clock() {
    const date1 = new Date(2022, 12 - 1, 14, 03, 42, 0);
    let date2 = new Date();
    let date_diff = new Date(date2 - date1);

    let day = document.querySelectorAll(".date__time_day");
    let hour = document.querySelectorAll(".date__time_hour");
    let minute = document.querySelectorAll(".date__time_minute");
    let second = document.querySelectorAll(".date__time_second");

    let s = Math.round(date_diff / 1000);
    let m = Math.round(s / 60);
    let h = Math.round(m / 60);
    let d = Math.round(h / 24);

    h = date2.getHours() - date1.getHours();
    if (h < 0) h += 24;
    m = date2.getMinutes() - date1.getMinutes();
    if (m < 0) m += 60;
    s = date2.getSeconds() - date1.getSeconds();
    if (s < 0) s += 60;

    day[0].innerHTML = d;
    day[1].innerHTML = d;
    h < 10 ? (h = "0" + h) : null;
    m < 10 ? (m = "0" + m) : null;
    s < 10 ? (s = "0" + s) : null;
    hour[0].innerHTML = h;
    hour[1].innerHTML = h;
    minute[0].innerHTML = m;
    minute[1].innerHTML = m;
    second[0].innerHTML = s;
    second[1].innerHTML = s;
}

let interval = setInterval(clock, 1000);

const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// async function placeReason() {
//     let reason = await fetch("js/reason.json");
//     reason = await reason.json();
//     let reasons = document.body.querySelector(".reasons");
//     let x = { 0: [0, 0] };
//     let y = { 0: [0, 0] };

//     for (let i in reason) {
//         let span = document.createElement("span");
//         span.className = "reasons__reason";
//         span.innerHTML = reason[i];
//         reasons.append(span);
//         span.style.setProperty("--bf-width", span.offsetWidth - 3 + "px");
//         span.style.setProperty("--bf-height", span.offsetHeight - 3 + "px");

//         let parentReasons = document.body.querySelector(".reasons");
//         let maxX = parentReasons.offsetWidth - span.offsetWidth;
//         let maxY = parentReasons.offsetHeight - span.offsetHeight;

//         let randomX = [0, 0];
//         let randomY = [0, 0];
//         let isNotPos = true;
//         let isX = false,
//             isY = false;
//         while (isNotPos) {
//             for (let a = 0; a < Object.keys(x).length; a++) {
//                 if (randomX[0] >= x[a][0] && randomX[0] <= x[a][1]) {
//                     randomX[0] = Math.floor(Math.random() * maxX);
//                     console.log(randomX[0]);
//                 } else {
//                     let newX = [randomX[0], randomX[0] + span.offsetWidth];
//                     x[Object.keys(x).length] = newX;
//                     span.style.left = newX[0] + "px";
//                     isX = true;
//                 }
//             }
//             console.log(randomX);

//             for (let a = 0; a < Object.keys(y).length; a++) {
//                 if (randomY[0] >= y[a][0] && randomY[0] <= y[a][1]) {
//                     randomY[0] = Math.floor(Math.random() * maxY);
//                 } else {
//                     let newY = [randomY[0], randomY[0] + span.offsetHeight];
//                     y[Object.keys(y).length] = newY;
//                     span.style.top = newY[0] + "px";
//                     isY = true;
//                 }
//             }
//             console.log(randomY);

//             if (isX && isY) isNotPos = false;
//             setTimeout(() => {
//                 console.log("#");
//             }, 1000);
//         }
//     }

//     console.log(reason);
// }

// placeReason();
