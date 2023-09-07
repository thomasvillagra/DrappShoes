let carrito = [];

const productoContenedor = document.getElementById("producto-contenedor");

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id);
    }
});

const validarProductoEnCarrito = async (id) => {
    try {
        const response = await fetch('../data/stock.json');
        const data = await response.json();

        const estaRepetido = carrito.some(item => item.id == id);

        if (!estaRepetido) {
            const producto = data.find(item => item.id == id);
            producto.cantidad = 1; // Agregar la propiedad 'cantidad' al producto
            carrito.push(producto);
        } else {
            const producto = carrito.find(item => item.id == id);
            producto.cantidad++;
        }

        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);

        swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha agregado un producto al carrito'
        });
    } catch (error) {
        console.error('Error al obtener datos del producto: ', error);
    }
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');
    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');

        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$ ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-light boton-eliminar" value="${producto.id}">X</button>
        `;

        contenedor.appendChild(div);
    });
};

const eliminarProductoCarrito = (id) => {
    const productoIndex = carrito.findIndex(producto => producto.id == id);
    carrito.splice(productoIndex, 1);
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);

    swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Éxito',
        text: 'Se ha eliminado un producto del carrito'
    });
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precio-total');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    return carritoStorage;
};

const cargarCarrito = () => {
    carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

// Agregar manejadores de eventos a los botones de eliminación de productos
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-eliminar')) {
        const productoId = e.target.value;
        eliminarProductoCarrito(productoId);
    }
});

