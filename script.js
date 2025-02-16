document.addEventListener("DOMContentLoaded", function () {
    /* --- 🎂 ФУНКЦІЯ ТАЙМЕРА (Скільки минуло часу після 16.02.2025) --- */
    function updateTimer() {
        const startDate = new Date("2025-02-18T00:00:00");
        const now = new Date();

        let diff = now - startDate;
        if (diff < 0) {
            document.getElementById("timer").innerHTML = "Тобі ще не виповнилося 25 🎉";
            return;
        }

        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours = hours % 24;
        minutes = minutes % 60;
        seconds = seconds % 60;

        document.getElementById("timer").innerHTML =
            `${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    /* --- 🎡 3D-КАРУСЕЛЬ З ПІДСВІТКОЮ ТА ТЕКСТОМ --- */
    const rotateDiv = document.querySelector('.rotate-div');
    const imgs = rotateDiv.getElementsByTagName('img');
    const textContainer = document.getElementById("photo-text"); // Блок з текстом
    let arr = [...imgs];
    let radius = 420; /* Більший радіус */
    let currentAngle = 0; /* Поточний кут обертання */
    let stepAngle = 360 / arr.length; /* Кут повороту між фото */
    let rotationDelay = 5000; /* Час зупинки (3 секунди) */
    let activeIndex = 0; /* Індекс активного фото */

    /* Тексти для кожного фото */
    const texts = [
        "🍷 Нехай у житті буде більше приводів підняти келих, ніж його опустити!🍷",
        "💖 Будь сильною, як тигриця, і граційною, як киця! 💖",
        "🤩 Сподіваюсь ти виростиш Леона краще, ніж мене 🤩",
        "😎 Щоб їжа продовжувала сама зʼявлятись в холодильнику 😎",
        "💜 В світі був дефіцит на твою красу, тому ти народила копію себе 💜",
        "🐺 Краще один раз упасти, ніж сто разів упасти 🐺",
        "🤓 Бачиш? А ти казала, що я тобі більше не сестра 🤓"
    ];

    function init() {
        for (let i = 0; i < arr.length; i++) {
            let angle = i * stepAngle;
            arr[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            arr[i].style.transition = "transform 1s, opacity 1s ease-in-out, box-shadow 1s ease-in-out";
        }
        updateOpacity(); // Встановити правильну прозорість при старті
    }

    setTimeout(init, 1000);

    function updateOpacity() {
        for (let i = 0; i < arr.length; i++) {
            if (i === activeIndex) {
                arr[i].classList.add("active"); // Додаємо клас активного фото
            } else {
                arr[i].classList.remove("active"); // Видаляємо клас у інших
            }
        }

        /* Оновлення тексту */
        textContainer.style.opacity = "0"; // Приховуємо перед зміною
        setTimeout(() => {
            textContainer.innerText = texts[activeIndex]; // Міняємо текст
            textContainer.style.opacity = "1"; // Плавно показуємо новий текст
        }, 500);
    }

    function rotateCarousel() {
        activeIndex = (activeIndex + 1) % arr.length; // Оновлення активного фото
        currentAngle -= stepAngle; /* Повертаємо карусель */
        rotateDiv.style.transform = `rotateY(${currentAngle}deg)`;
        rotateDiv.style.transition = "transform 1s";

        updateOpacity(); // Оновити прозорість та текст

        /* Чекаємо перед наступним обертанням */
        setTimeout(rotateCarousel, rotationDelay);
    }

    /* Запускаємо обертання */
    setTimeout(rotateCarousel, rotationDelay);
});
