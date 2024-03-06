(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const burger = document.querySelector(".icon-menu");
    const doc = document.querySelector("html");
    const list = document.querySelector(".menu__list");
    burger.addEventListener("click", (e => {
        if (!doc.classList.contains("menu-open")) list.classList.add("list-active"); else list.classList.remove("list-active");
    }));
    const itemMenu = document.querySelectorAll(".menu__link");
    const listMen = document.querySelector(".menu__list");
    const docHtml = document.querySelector("html");
    itemMenu.forEach((e => {
        e.addEventListener("click", (event => {
            event.preventDefault();
            listMen.classList.remove("list-active");
            docHtml.classList.remove("lock");
            docHtml.classList.remove("menu-open");
        }));
    }));
    const timerDays = document.querySelectorAll(".timer__days");
    const timerHours = document.querySelectorAll(".timer__hours");
    const timerMinutes = document.querySelectorAll(".timer__minutes");
    const timerSeconds = document.querySelectorAll(".timer__seconds");
    const targetDate = new Date("2024-6-20");
    function updateTimer() {
        const currentDate = new Date;
        let difference = targetDate - currentDate;
        if (difference < 0) difference = 0;
        let days = Math.floor(difference / (1e3 * 60 * 60 * 24));
        let hours = Math.floor(difference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        let minutes = Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60));
        let seconds = Math.floor(difference % (1e3 * 60) / 1e3);
        if (difference === 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        timerDays.forEach((e => {
            e.innerHTML = days + "days";
        }));
        timerHours.forEach((e => {
            e.innerHTML = hours + "hrs";
        }));
        timerMinutes.forEach((e => {
            e.innerHTML = minutes + "min";
        }));
        timerSeconds.forEach((e => {
            e.innerHTML = seconds + "sec";
        }));
    }
    setInterval(updateTimer, 1e3);
    updateTimer();
    window["FLS"] = true;
    isWebp();
    menuInit();
})();