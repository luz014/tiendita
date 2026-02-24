document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});

function mostrarProductos(filtro = "") {
  const lista = document.getElementById("listaProductos");
  const productos = obtenerProductos();

  lista.innerHTML = "";

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (productosFiltrados.length === 0) {
    lista.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  productosFiltrados.forEach(producto => {
    lista.innerHTML += `
      <div class="card">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
        <button onclick="editarProducto(${producto.id})">Editar</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </div>
    `;
  });
}

function buscarProducto() {
  const texto = document.getElementById("busqueda").value;
  mostrarProductos(texto);
}

function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (stock < 0) {
    alert("No se permiten cantidades negativas");
    return;
  }

  let productos = obtenerProductos();

  const nuevoProducto = {
    id: Date.now(),
    nombre,
    precio,
    stock
  };

  productos.push(nuevoProducto);
  guardarProductos(productos);

  limpiarFormulario();
  mostrarProductos();
}

function editarProducto(id) {
  let productos = obtenerProductos();
  let producto = productos.find(p => p.id === id);

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  let nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
  if (nuevoNombre === null || nuevoNombre.trim() === "") {
    alert("El nombre no puede estar vacío");
    return;
  }

  let nuevoPrecio = prompt("Nuevo precio:", producto.precio);
  if (nuevoPrecio === null) return;

  nuevoPrecio = parseFloat(nuevoPrecio);
  if (isNaN(nuevoPrecio) || nuevoPrecio < 0) {
    alert("Precio inválido");
    return;
  }

  let nuevoStock = prompt("Nuevo stock:", producto.stock);
  if (nuevoStock === null) return;

  nuevoStock = parseInt(nuevoStock);
  if (isNaN(nuevoStock) || nuevoStock < 0) {
    alert("Cantidad inválida");
    return;
  }

  // Actualizar datos
  producto.nombre = nuevoNombre.trim();
  producto.precio = nuevoPrecio;
  producto.stock = nuevoStock;

  guardarProductos(productos);
  mostrarProductos();

  alert("Producto actualizado correctamente");
}

function eliminarProducto(id) {
  let productos = obtenerProductos();
  let producto = productos.find(p => p.id === id);

  if (!producto) {
    alert("Producto no existe");
    return;
  }

  if (producto.stock > 0) {
    alert("No se puede eliminar producto con stock disponible");
    return;
  }

  if (!confirm("¿Seguro que desea eliminar este producto?")) return;

  productos = productos.filter(p => p.id !== id);
  guardarProductos(productos);
  mostrarProductos();
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
}