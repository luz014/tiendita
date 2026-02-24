if (!localStorage.getItem("productos")) {
  const productosIniciales = [
    { id: 1, nombre: "Guitarra Acústica", precio: 200, stock: 5 },
    { id: 2, nombre: "Batería Profesional", precio: 800, stock: 3 },
    { id: 3, nombre: "Teclado Digital", precio: 400, stock: 0 }
  ];

  localStorage.setItem("productos", JSON.stringify(productosIniciales));
}

if (!localStorage.getItem("ventas")) {
  localStorage.setItem("ventas", JSON.stringify([]));
}

// Funciones para obtener datos
function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos"));
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function obtenerVentas() {
  return JSON.parse(localStorage.getItem("ventas"));
}

function guardarVentas(ventas) {
  localStorage.setItem("ventas", JSON.stringify(ventas));
}