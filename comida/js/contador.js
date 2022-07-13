const contadorProductos = listaObjetos => {
    let cantidadTotal = 0
    Object.values(listaObjetos).forEach(producto => {
        cantidadTotal += producto.cantidad
    });
    return cantidadTotal
}

export {contadorProductos}