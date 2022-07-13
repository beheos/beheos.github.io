import {contadorProductos} from './contador.js';
const template_carrito = document.getElementById('template_carrito').content
const template_resumen = document.getElementById('template_resumen').content
const productos_carrito = document.getElementById('productos_carrito')
const contenedor_resumen = document.getElementById('contenedor_resumen')
const contenedor_principal = document.getElementById('contenedor_principal')
const contenedor_vacio = document.querySelector('.contenedor')
const fragment = document.createDocumentFragment()
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        if(Object.values(carrito).length > 0){
            accionesContenedor(true)
        }else{
            accionesContenedor(false)
        }
        mostrarCarrito()
    }else{
        accionesContenedor(false)
    }
})

const mostrarCarrito = () => {
    productos_carrito.innerHTML = ''
    Object.values(carrito).map(producto => {
        const clone = template_carrito.cloneNode(true)
        clone.querySelector('img').setAttribute("src", producto.imagen)
        clone.querySelectorAll('td')[1].textContent = producto.titulo
        clone.querySelector('.btn-outline-primary').dataset.id = producto.id
        clone.querySelector('.btn-outline-danger').dataset.id = producto.id
        clone.querySelectorAll('td')[3].textContent = producto.cantidad
        clone.querySelectorAll('td')[4].textContent = producto.precio
        clone.querySelector('span').textContent = producto.precio * producto.cantidad
        fragment.appendChild(clone)
    })
    productos_carrito.appendChild(fragment)
    mostrarResumen()
    let cantidadTotal = contadorProductos(carrito)
    localStorage.setItem('cantidadTotal', cantidadTotal)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    Object.values(carrito).length > 0 ? accionesContenedor(true) : accionesContenedor(false)
}

productos_carrito.addEventListener('click', e =>{
    acciones(e)
    e.preventDefault()
})

const acciones = e => {
    if(e.target.classList.contains('btn-outline-primary')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
    }

    if(e.target.classList.contains('btn-outline-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
          if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }

    e.stopPropagation()
}

const mostrarResumen = () => {
    contenedor_resumen.innerHTML = ''
    const clone = template_resumen.cloneNode(true)

    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    clone.querySelector('.subtotal').textContent = Number.parseFloat(nPrecio).toFixed(2)
    clone.querySelector('.total').textContent = Number.parseFloat(nPrecio).toFixed(2)
    fragment.appendChild(clone)
    contenedor_resumen.appendChild(fragment)   
}

function accionesContenedor(accion){
    if(accion){
        contenedor_principal.style.display = 'block'
        contenedor_vacio.style.display = 'none'
    }else{
        contenedor_principal.style.display = 'none'
        contenedor_vacio.style.display = 'block'
    }
}
