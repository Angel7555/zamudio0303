<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Calculadora de Matrices ULTRA PRO</title>
<style>
body { margin:0; font-family: Arial; background:black; color:#00ff9f; overflow:hidden; }
canvas { position:fixed; top:0; left:0; z-index:0; }
.main { position:relative; z-index:1; text-align:center; }
.container { display:flex; justify-content:center; gap:20px; margin-top:20px; }
table { border-collapse: collapse; }
td { border:1px solid #00ff9f; }
input { width:50px; height:40px; text-align:center; background:black; color:#00ff9f; border:none; }
button { margin:5px; padding:10px; background:#00ff9f; border:none; cursor:pointer; }
#resultado { margin-top:20px; font-size:18px; }
</style>
</head>
<body>
<canvas id="matrixRain"></canvas>

<div class="main">
<h2>Calculadora de Matrices ULTRA PRO</h2>
<input id="expresion" placeholder="Ej: A*B+C">

<div class="container">
<div><h3>A</h3><table id="A"></table><button onclick="resize('A')">Redimensionar</button></div>
<div><h3>B</h3><table id="B"></table><button onclick="resize('B')">Redimensionar</button></div>
<div><h3>C</h3><table id="C"></table><button onclick="resize('C')">Redimensionar</button></div>
</div>

<button onclick="calcular()">Calcular</button>
<button onclick="det('A')">Det(A)</button>
<button onclick="inv('A')">Inv(A)</button>

<div id="resultado"></div>
</div>

<script>
function crearTabla(id, f=2, c=2){
 let t=document.getElementById(id); t.innerHTML="";
 for(let i=0;i<f;i++){ let r=document.createElement('tr');
  for(let j=0;j<c;j++){ let d=document.createElement('td');
    let inp=document.createElement('input'); inp.value=0;
    d.appendChild(inp); r.appendChild(d);
  }
  t.appendChild(r);
 }
}
['A','B','C'].forEach(id=>crearTabla(id));

function resize(id){
 let f=prompt("Filas:"), c=prompt("Columnas:");
 crearTabla(id,Number(f),Number(c));
}

function leer(id){
 let t=document.getElementById(id), m=[];
 for(let r of t.rows){ let fila=[];
  for(let c of r.cells) fila.push(Number(c.firstChild.value));
  m.push(fila);
 }
 return m;
}

function suma(A,B){ return A.map((f,i)=>f.map((v,j)=>v+B[i][j])); }
function resta(A,B){ return A.map((f,i)=>f.map((v,j)=>v-B[i][j])); }
function mult(A,B){
 let r=[];
 for(let i=0;i<A.length;i++){
  r[i]=[];
  for(let j=0;j<B[0].length;j++){
   let s=0;
   for(let k=0;k<B.length;k++) s+=A[i][k]*B[k][j];
   r[i][j]=s;
  }
 }
 return r;
}

function det(m){
 let n=m.length;
 if(n==1) return m[0][0];
 if(n==2) return m[0][0]*m[1][1]-m[0][1]*m[1][0];
 let d=0;
 for(let i=0;i<n;i++){
  let sub=m.slice(1).map(r=>r.filter((_,j)=>j!==i));
  d+=((i%2==0?1:-1)*m[0][i]*det(sub));
 }
 return d;
}

function inv(m){
 let n=m.length;
 let d=det(m);
 if(d==0) return null;
 let adj=[];
 for(let i=0;i<n;i++){
  adj[i]=[];
  for(let j=0;j<n;j++){
   let sub=m.filter((_,r)=>r!==i).map(r=>r.filter((_,c)=>c!==j));
   adj[i][j]=(((i+j)%2==0?1:-1)*det(sub));
  }
 }
 adj=adj[0].map((_,i)=>adj.map(r=>r[i]));
 return adj.map(r=>r.map(v=>v/d));
}

function mostrar(m){ return m.map(f=>f.join(' ')).join('<br>'); }

function calcular(){
 let A=leer('A'), B=leer('B'), C=leer('C');
 let exp=document.getElementById('expresion').value;
 try{
  let r=eval(exp.replace(/A/g,'A').replace(/B/g,'B').replace(/C/g,'C')
   .replace(/\+/g,'suma').replace(/\-/g,'resta').replace(/\*/g,'mult'));
  document.getElementById('resultado').innerHTML = mostrar(r);
 }catch(e){ document.getElementById('resultado').innerText='Error'; }
}

function detBtn(id){
 let m=leer(id);
 document.getElementById('resultado').innerText='Det='+det(m);
}

// MATRIX RAIN
let canvas=document.getElementById('matrixRain');
let ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let letters='0123456789';
let fontSize=14;
let columns=canvas.width/fontSize;
let drops=[];
for(let x=0;x<columns;x++) drops[x]=1;

function draw(){
 ctx.fillStyle='rgba(0,0,0,0.05)';
 ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle='#0f0';
 ctx.font=fontSize+'px monospace';
 for(let i=0;i<drops.length;i++){
  let text=letters[Math.floor(Math.random()*letters.length)];
  ctx.fillText(text,i*fontSize,drops[i]*fontSize);
  if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
  drops[i]++;
 }
}
setInterval(draw,33);
</script>

</body>
</html>
