const menu = document.querySelector('.header__menu');
const btn = document.querySelector('.fa-solid');

function ocultar(){
    menu.classList.toggle('active')
}

btn.addEventListener('click', ()=> {
    menu.classList.toggle('active')
})

