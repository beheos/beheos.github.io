const template__card = document.getElementById('food__card').content
const template__pedidos = document.getElementById('template__pedidos').content
const template__footer = document.getElementById('template__footer').content
const contenedorAlimentos = document.getElementById('food-cards')
const table__carrito = document.getElementById('table__carrito')
const table__footer = document.getElementById('table__footer')
const fragmet = document.createDocumentFragment()
const boton = document.getElementById('boton__carrito')
const menu__carrito = document.querySelector('.menu__carrito')
const url = "../comida/alimentos.json"
let carrito = {}
const carrito__contenedor = document.querySelector('.carrito__contenedor')
const carrito__vacio = document.querySelector('.carrito__vacio')
// const carrito__vacio = document.querySelector('.btn--vacio')
const boton__carrito = document.querySelector('.boton__carrito')
const nav__carrito = document.querySelector('#div__carrito')
const btnPedido = document.querySelector('.btn--pedido')



document.addEventListener('DOMContentLoaded', ()=>{
    traerAlimnetos()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        return mostrarCarrito()
    }
    mostrarElementos()

})

const traerAlimnetos = async () =>{
    const alimentos = await fetch(url)
    const listadoAlimentos = await alimentos.json()
    mostrarAlimentos(listadoAlimentos)
}

const mostrarAlimentos = alimentos => {
    alimentos.map(alimento =>{
        const clone = template__card.cloneNode(true)
        clone.querySelector('img').setAttribute("src", alimento.imagen)
        clone.querySelector('.card__name').textContent = alimento.titulo
        clone.querySelector('.card__ingrediente').textContent = alimento.ingredientes
        clone.querySelector('.card__precio').textContent = `${alimento.precio}`
        clone.querySelector('.card__button').dataset.id = alimento.id
        fragmet.appendChild(clone)
    })
    contenedorAlimentos.appendChild(fragmet)
}

boton__carrito.addEventListener('click', (e)=>{
    console.log(e.target)
    if(nav__carrito.classList.contains('carrito--active')){
        nav__carrito.classList.remove('carrito--active')
    }else{
        nav__carrito.classList.add('carrito--active')
    } 
})

contenedorAlimentos.addEventListener('click', (e) =>{
    agregarCarrito(e)
    e.preventDefault()
   
})

table__carrito.addEventListener('click', (e)=> {
    acciones(e)
    e.preventDefault()
    
})

btnPedido.addEventListener('click', () =>{
    let pedido = false
    pedido = confirm("No podra cancelar su pedio al aceptar ¿Esta seguro de su selección?")
    if(pedido){
        alert("Pedido realizado")
        carrito = {}
    }
    mostrarCarrito()
})


const agregarCarrito = (e) => {
    if(e.target.classList.contains('card__button')){
        setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const comida = {
        id : objeto.querySelector('.card__button').dataset.id,
        imagen : objeto.querySelector('img').getAttribute("src"),
        titulo : objeto.querySelector('.card__name').textContent,
        precio : objeto.querySelector('.card__precio').textContent,
        cantidad : 1
    }
    
    if(carrito.hasOwnProperty(comida.id)){
        comida.cantidad = carrito[comida.id].cantidad + 1
    }
     carrito[comida.id] = {...comida}
     mostrarCarrito()
}

const mostrarCarrito = () => {
    table__carrito.innerHTML = ''
    Object.values(carrito).forEach(alimento => {
        const clone = template__pedidos.cloneNode(true)
        clone.querySelector('img').setAttribute("src", alimento.imagen)
        clone.querySelectorAll('td')[1].textContent = alimento.titulo
        clone.querySelector('.table__agregar').dataset.id = alimento.id
        clone.querySelector('.table__eliminar').dataset.id = alimento.id
        clone.querySelectorAll('td')[3].textContent = alimento.cantidad
        clone.querySelector('span').textContent = alimento.precio * alimento.cantidad
        fragmet.appendChild(clone)
    })
    table__carrito.appendChild(fragmet)
    mostrarElementos()
    mostrarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const mostrarFooter = () => {
    table__footer.innerHTML = ''
    const clone = template__footer.cloneNode(true)
    // if(Object.keys(carrito).length === 0){
    //     table__carrito.innerHTML = ` <p class="carrito__vacio">Carrito Vacio</p>`
    //     return
    // }

    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    clone.querySelector('span').textContent = nPrecio
    fragmet.appendChild(clone)
    table__footer.appendChild(fragmet)

    const btnVaciar = document.querySelector('.vaciar__carrito')
    btnVaciar.addEventListener('click', () =>{
        carrito = {}
        mostrarCarrito()
    })
    
}

const acciones = e => {
    if(e.target.classList.contains('table__agregar')){
        const alimento = carrito[e.target.dataset.id]
        alimento.cantidad++
        carrito[e.target.dataset.id] = {...alimento}
        mostrarCarrito()
    }

    if(e.target.classList.contains('table__eliminar')){
        const alimento = carrito[e.target.dataset.id]
        alimento.cantidad--
        if(alimento.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }

    e.stopPropagation()
}

const mostrarElementos = () => {
    Object.keys(carrito).length === 0 ? carrito__vacio.style.display = 'block' :  carrito__vacio.style.display = 'none'
    Object.keys(carrito).length === 0 ? carrito__contenedor.style.display = 'none' : carrito__contenedor.style.display = 'block' 
}
