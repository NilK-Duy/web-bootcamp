const button = document.querySelector('button');
const h1 = document.querySelector('h1');

button.addEventListener('click', function() {
    const newColor = makeRandColor();
    const randColor =  `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    document.body.style.backgroundColor = randColor;
    h1.innerText = randColor;

    //Change the font color to white, when the background color is too dark.
    if (newColor[0] < 100 && newColor[1] < 100 && newColor[2] < 100)
    {
        h1.style.color = "white";
    } else {
        h1.style.color = "black";
    }
})

const makeRandColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
}
