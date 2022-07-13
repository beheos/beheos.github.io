import {contadorProductos} from './contador.js'
const templateProductos = document.getElementById('templateProductos').content
const contenedorProductos = document.getElementById('contenedorProductos')
const carrito__contenedor = document.getElementById('carrito__contenedor')
const fragment = document.createDocumentFragment()
const compras = document.getElementById('compras')
const url = "https://fakestoreapi.com/products?limit=12"
const seccion_productos = document.getElementById('seccion_productos')
let productosApi = []
let carrito = {}
const action = document.getElementById('busqueda')
const indice = document.getElementById('indice')

document.addEventListener('DOMContentLoaded', () => {
    conectarApi()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        let cantidadTotal = localStorage.getItem('cantidadTotal')
        mostrarIndiceCarrito(cantidadTotal)
    }
})

function displayloader(){
    const load = document.createElement('div')
    load.classList.add('loading')
    seccion_productos.appendChild(load)
}

function hideloading(){
    const load = document.querySelector('.loading')
    seccion_productos.removeChild(load)
}

action.addEventListener('submit', (e)=>{
    const campo_busqueda = document.querySelector('.form-control').value
    let productoBusqueda = []
    if(campo_busqueda.trim()=="" || campo_busqueda == null){
       return alert("El campo de búsqueda esta vacío")
    }else{
        productoBusqueda = productosApi.filter(producto => producto.title.includes(campo_busqueda))
        renderProductos(productoBusqueda)
    }
    e.preventDefault()
})

contenedorProductos.addEventListener('click', e =>{
         agregarCarrito(e)
         e.preventDefault() 
})
    

compras.addEventListener('click', ()=>{

    if(carrito.length>0){
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
    window.location="carrito.html"
})

const conectarApi = async () => {
    try {
        displayloader()
        const apiProductos = await fetch(url)
        const productos = await apiProductos.json()
        productosApi = productos
        hideloading()
        renderProductos(productos) 
    } catch (error) {
        alert("ocurrio un error con la api " + error)
    }

  
}

const renderProductos = productos => {
    contenedorProductos.innerHTML = ''
    if(productos.length > 0){
        productos.map(producto => {
            const clone = templateProductos.cloneNode(true)
            let descripcion = descripcionCaracteres(producto.description)
            let titulo = tituloCaracteres(producto.title)
            clone.querySelector('img').setAttribute("src", producto.image)
            clone.querySelector('.card-title').textContent = titulo
            clone.querySelector('.price').textContent = producto.price
            clone.querySelector('.description').textContent = descripcion
            clone.querySelector('.btn-warning').dataset.id = producto.id
            fragment.appendChild(clone)
        })
        contenedorProductos.appendChild(fragment)
    }else{
        contenedorProductos.innerHTML = `<div class="contenedor_vacio mt-3">No se encontraron resultados</div>`
    }
    
}

const agregarCarrito = e =>{
    if(e.target.classList.contains('btn-warning')){
        setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id : objeto.querySelector('.btn-warning').dataset.id,
        imagen : objeto.querySelector('img').getAttribute("src"),
        titulo : objeto.querySelector('.card-title').textContent,
        precio : objeto.querySelector('.price').textContent,
        cantidad : 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    let cantidadTotal = contadorProductos(carrito)
    mostrarIndiceCarrito(cantidadTotal)
    localStorage.setItem('cantidadTotal', cantidadTotal)
    localStorage.setItem('carrito', JSON.stringify(carrito))
   
}


const descripcionCaracteres = cadena => {
    if(cadena.length > 130){
        cadena = cadena.substr(0, 130)
    }
    return cadena
}

const tituloCaracteres = cadena => {
    if(cadena.length > 40){
        cadena = cadena.substr(0, 40)
    }
    return cadena
}

const mostrarIndiceCarrito = (cantidadTotal=0) => {
    indice.innerHTML = ''
    if(cantidadTotal > 0){
        indice.classList.add('indice-active')
        indice.innerHTML = cantidadTotal
    }else{
        if( indice.classList.contains('indice-active')){
            indice.classList.remove('indice-active')
        }
    }
   
}



