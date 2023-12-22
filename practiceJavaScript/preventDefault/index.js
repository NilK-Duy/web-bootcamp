const form = document.querySelector('#shelterForm');
const input = document.querySelector('#inputName');
const list = document.querySelector('#inputs');

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value;
    const newLi = document.createElement("LI");
    newLi.innerText = text;
    list.append(newLi);
    input.value = "";
})

list.addEventListener('click', function (e) {
    e.target.nodeName === 'LI' && e.target.remove();
})