import {contadorProductos} from './contador.js';
const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')
const mensajes = document.querySelectorAll('#formulario small')
let carrito = {}
let autorizado =false
let valTarjeta = /^(([0-9]{4}\s){3}[0-9]{3,4})$/
const valFecha = /^(0[8-9]|1[012])[/](2[2])|(0[1-9]|1[012])[/](2[345])$/
const valCvv = /^[0-9]{3}$/

const validarFormulario = objeto => {
    console.log(objeto)
    if(valTarjeta.test(objeto.tarjeta) 
        &&valFecha.test(objeto.fecha)
        &&valCvv.test(objeto.cvv)){
        autorizado = true
    }else{
        console.log("es falso")
        autorizado = false
    }
}

const macaras = e =>{
    let valor = e.target.value
    switch(e.target.name){
        case "tarjeta":
            inputs[0].value = valor.replace(/\s/g,'')
            .replace(/\D/d,'')
            .replace(/([0-9]{4})/g,'$1 ')
            .trim()
        break
        case "fecha":
            inputs[1].value = valor.replace(/\s/g,'')
            .replace(/\D/d,'')
            .replace(/([0-9]{2})/,'$1/')
            .trim()
        break
        case "cvv":
            inputs[2].value = valor.replace(/\s/g,'')
            .replace(/\D/d,'')
            .trim()
        break
    }
}

mensajes.forEach(mensaje => {
    mensaje.style.display = 'none'
})

inputs.forEach(input =>{
    console.log("entre a los inputs")
    input.addEventListener('keyup', macaras)
    input.addEventListener('blur', macaras)
})

formulario.addEventListener('submit', e =>{
    let tarjeta = document.getElementById('tarjeta').value
    let fecha = document.getElementById('fecha').value
    let cvv = document.getElementById('cvv').value
    const formulario = {
        "tarjeta": tarjeta,
        "fecha": fecha,
        "cvv": cvv
    }
    validarFormulario(formulario)
    setTimeout(() => {
        if(autorizado){
             swal({
                title: "Se realizará el pago indicado",
                text: "¿Está de acuerdo con la transacción?",
                icon: "warning",
                buttons: true,
                buttons: ["Cancelar", "Pagar"],
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Gracias por su compra", {
                    icon: "success",
                  }).then(()=>{
                    let cantidadTotal = contadorProductos(carrito)
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                    localStorage.setItem('cantidadTotal', cantidadTotal)
                    location.reload()
                  });
                } else {
                  swal("No se realizó ninguna transacción", {
                    icon: "error",
                  });
                }
              });
        }else{
            swal("Pago No Autorizado", "No se pudo realizar la transacción", "error");
        }
    }, 1000);
    e.preventDefault()
})

