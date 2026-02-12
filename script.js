const productos = [];

for(let i=1; i<=50; i++){
    productos.push({
        nombre: "Producto Camarón Exportación " + i,
        desc: "Camarón de alta calidad clasificado para exportación internacional."
    });
}

const contenedor = document.getElementById("listaProductos");

productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `<h3>${p.nombre}</h3><p>${p.desc}</p>`;
    contenedor.appendChild(div);
});

