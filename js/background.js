const images = [
    {
        image: "0.jpg",
        textcolor: "white",
    },
    {
        image: "1.jpg",
        textcolor: "black",
    },
    {
        image: "2.jpg",
        textcolor: "white",
    },
    {
        image: "3.jpg",
        textcolor: "black",
    },
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
const firstScript = document.querySelector("script");

bgImage.src = `img/${chosenImage.image}`;
bgImage.classList.add("background");

// document.body.appendChild(bgImage);
document.body.insertBefore(bgImage, firstScript);
document.body.classList.add(chosenImage.textcolor);

// Color of input and input::placeholder do not automatically change. whuy?
const formInput = document.querySelectorAll("input");
formInput.forEach((item) => {
    item.classList.add(chosenImage.textcolor);
    // item.
});

const inputPlaceholder = document.querySelectorAll("input::placeholder");
inputPlaceholder.forEach((item) => {
    item.classList.add(chosenImage.textcolor);
    // item.
});
