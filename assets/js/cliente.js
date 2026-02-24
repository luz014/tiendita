let carrito = [];

function mostrarCatalogo() {
  const catalogoDiv = document.getElementById("catalogo");
  const productos = obtenerProductos();

  catalogoDiv.innerHTML = "";

  productos.forEach(producto => {
    catalogoDiv.innerHTML += `
      <div>
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
        <button onclick="agregarAlCarrito(${producto.id})">
          Agregar al carrito
        </button>
        <hr>
      </div>
    `;
  });
}

function agregarAlCarrito(id) {
  const productos = obtenerProductos();
  const producto = productos.find(p => p.id === id);

  if (producto.stock <= 0) {
    alert("No hay stock disponible");
    return;
  }

  carrito.push(producto);
  mostrarCarrito();
}

function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "";

  carrito.forEach(item => {
    carritoDiv.innerHTML += `
      <p>${item.nombre} - $${item.precio}</p>
    `;
  });
}

function confirmarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const tipoPago = document.querySelector('input[name="tipoPago"]:checked').value;

  let productos = obtenerProductos();
  let total = 0;

  carrito.forEach(item => {
    let producto = productos.find(p => p.id === item.id);
    producto.stock--;
    total += item.precio;
  });

  guardarProductos(productos);

  let ventas = obtenerVentas();

  const nuevaVenta = {
    id: Date.now(),
    productos: carrito,
    total: total,
    tipoPago: tipoPago,
    fecha: new Date()
  };

  ventas.push(nuevaVenta);
  guardarVentas(ventas);

  generarFacturaPDF(nuevaVenta);

  carrito = [];
  mostrarCatalogo();
  mostrarCarrito();

  alert("Compra realizada correctamente");
}

function generarFacturaPDF(venta) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Tienda de Música", 20, 20);

  doc.setFontSize(12);
  doc.text(`Factura #${venta.id}`, 20, 30);
  doc.text(`Fecha: ${new Date(venta.fecha).toLocaleString()}`, 20, 40);

  let y = 60;

  doc.text("Productos:", 20, 50);

  venta.productos.forEach((producto) => {
    doc.text(
      `${producto.nombre} - $${producto.precio}`,
      20,
      y
    );
    y += 10;
  });

  doc.text(`Total: $${venta.total}`, 20, y + 10);
  doc.text(`Tipo de Pago: ${venta.tipoPago}`, 20, y + 20);

  doc.save(`Factura_${venta.id}.pdf`);
}

mostrarCatalogo();