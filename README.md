<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>MARFIGAN - Camaronera</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

<style>
:root {
    --azul:#0b3c5d;
    --celeste:#1ca3ec;
    --oscuro:#1e1e1e;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{
    color:var(--oscuro);
}

/* ANIMACIÓN */
@keyframes fadeUp{
    from{opacity:0; transform:translateY(40px);}
    to{opacity:1; transform:translateY(0);}
}

section, .product-card{
    animation:fadeUp 1s ease;
}

/* HEADER */
header{
    height:100vh;
    background:
    linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),
    url("https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1600&q=80");
    background-size:cover;
    background-position:center;
    color:white;
    display:flex;
    flex-direction:column;
}

nav{
    display:flex;
    justify-content:space-between;
    padding:20px 8%;
}

nav h1{
    font-size:28px;
}

nav ul{
    list-style:none;
    display:flex;
    gap:25px;
}

nav ul li a{
    color:white;
    text-decoration:none;
}

.hero{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    padding:0 10%;
}

.hero h2{
    font-size:48px;
    margin-bottom:15px;
}

/* SECCIONES */
section{
    padding:80px 10%;
}

.section-title{
    text-align:center;
    margin-bottom:50px;
}

.section-title h2{
    color:var(--azul);
    font-size:36px;
}

/* PRODUCTOS */
.products{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:30px;
}

.product-card{
    background:white;
    border-radius:12px;
    box-shadow:0 10px 25px rgba(0,0,0,.1);
    overflow:hidden;
}

.product-card img{
    width:100%;
    height:220px;
    object-fit:cover;
}

.product-card .content{
    padding:20px;
}

.product-card a{
    display:inline-block;
    margin-top:10px;
    padding:8px 18px;
    background:var(--celeste);
    color:white;
    text-decoration:none;
    border-radius:6px;
}

/* FOOTER */
footer{
    background:#111;
    color:white;
    text-align:center;
    padding:25px;
}
</style>
</head>

<body>

<header>
<nav>
<h1>MARFIGAN</h1>
<ul>
<li><a href="#productos">Productos</a></li>
<li><a href="#contacto">Contacto</a></li>
</ul>
</nav>

<div class="hero">
<div>
<h2>Producción Camaronera de Alta Calidad</h2>
<p>Comprometidos con la excelencia, sostenibilidad y exportación responsable.</p>
</div>
</div>
</header>

<section id="productos">
<div class="section-title">
<h2>Nuestros Productos</h2>
</div>

<div class="products">

<div class="product-card">
<img src="https://images.unsplash.com/photo-1584270354949-1f99cd7d44a8?auto=format&fit=crop&w=800&q=80">
<div class="content">
<h3>Camarón Blanco</h3>
<p>Alta calidad para exportación.</p>
<a href="#">Más información</a>
</div>
</div>

<div class="product-card">
<img src="https://images.unsplash.com/photo-1604908177522-0407c11a7f32?auto=format&fit=crop&w=800&q=80">
<div class="content">
<h3>Camarón Fresco</h3>
<p>Procesado bajo estándares internacionales.</p>
<a href="#">Más información</a>
</div>
</div>

<div class="product-card">
<img src="https://images.unsplash.com/photo-1611579128853-c9d53e5b1a2e?auto=format&fit=crop&w=800&q=80">
<div class="content">
<h3>Camarón Congelado</h3>
<p>Conservación óptima y segura.</p>
<a href="#">Más información</a>
</div>
</div>

<!-- AGREGA MÁS TARJETAS IGUAL SI QUIERES 10 -->
</div>
</section>

<footer id="contacto">
<p>📧 marfigansahotmail.com</p>
<p>© 2026 MARFIGAN</p>
</footer>

</body>
</html>
>
