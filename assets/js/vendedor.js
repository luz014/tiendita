document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarProductos() {
  const select = document.getElementById("productoSelect");
  const productos = obtenerProductos();

  select.innerHTML = "";

  productos.forEach(producto => {
    select.innerHTML += `
      <option value="${producto.id}">
        ${producto.nombre} (Stock: ${producto.stock})
      </option>
    `;
  });
}

function registrarVenta() {
  const idProducto = parseInt(document.getElementById("productoSelect").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const tipoPago = document.querySelector('input[name="tipoPagoV"]:checked').value;

  let productos = obtenerProductos();
  let producto = productos.find(p => p.id === idProducto);

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  if (cantidad <= 0) {
    alert("Cantidad inválida");
    return;
  }

  if (producto.stock < cantidad) {
    alert("Stock insuficiente");
    return;
  }

  // Actualizar stock
  producto.stock -= cantidad;
  guardarProductos(productos);

  // Calcular total
  const total = producto.precio * cantidad;

  // Registrar venta
  let ventas = obtenerVentas();
  const nuevaVenta = {
    id: Date.now(),
    producto: producto.nombre,
    cantidad: cantidad,
    total: total,
    tipoPago: tipoPago,
    fecha: new Date()
  };

  ventas.push(nuevaVenta);
  guardarVentas(ventas);

  generarFactura(nuevaVenta);

  alert("Venta registrada correctamente");
}

function generarFactura(venta) {
  const facturaDiv = document.getElementById("factura");

  facturaDiv.innerHTML = `
    <h3>Factura #${venta.id}</h3>
    <p><strong>Producto:</strong> ${venta.producto}</p>
    <p><strong>Cantidad:</strong> ${venta.cantidad}</p>
    <p><strong>Total:</strong> $${venta.total}</p>
    <p><strong>Tipo de Pago:</strong> ${venta.tipoPago}</p>
    <p><strong>Fecha:</strong> ${new Date(venta.fecha).toLocaleString()}</p>
  `;
}