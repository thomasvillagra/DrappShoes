
//const pintarProductos = (data) =>{
const contenedor = document.getElementById('producto-contenedor')

fetch('../data/stock.json')
.then(Response => Response.json())
.then(data =>(
    data.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML += `<div class="card-image">
                         <img src=${producto.imagen}>
                         <span class="card-title">${producto.marca}</span>
                         <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                         </div>
                         <div class="card-content">
                         <p>${producto.nombre}</p>
                         <p>${producto.precio}</p>
                         </div>
                        `
        contenedor.appendChild(div);
        
    })
    ))    
//};