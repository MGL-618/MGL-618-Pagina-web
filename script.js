// ====================================================================
// I. Variables Globales y Setup del Canvas
// ====================================================================

const contentArea = document.getElementById('contentArea');
const pageTitleElement = document.getElementById('pageTitle');
const canvasWidth = 400;
const canvasHeight = 400;
let animationFrameId = null;
let currentProject = null;

const projects = {
    'index': { title: 'ECHO POR: Dival Miguel Rodriguez Cazares', setup: renderIndex },
    'snowman': { title: '01. Muñeco de Nieve: Protocolo Saludo', setup: setupSnowman, animated: false },
    'sunny-snowy-day': { title: '02. Simulación: Día de Invierno Soleado', setup: setupSunnySnowyDay, animated: false },
    'whats-for-dinner': { title: '03. Carga de Assets: Cena Aleatoria', setup: setupWhatsForDinner, animated: false },
    'bunny-teeth': { title: '04. Bio-Modelado: Dientes de Conejo', setup: setupBunnyTeeth, animated: false },
    'frog': { title: '05. Debug: Rana con Error Visual', setup: setupFrog, animated: false },
    'exploding-sun': { title: '06. Alerta Crítica: Expansión Solar (Animación)', setup: setupExplodingSun, animated: true },
    'separating-clouds': { title: '07. Apertura de Cielo: Nubes Dinámicas (Animación)', setup: setupSeparatingClouds, animated: true },
    'shooting-star': { title: '08. Objeto en Tránsito: Estrella Fugaz (Animación)', setup: setupShootingStar, animated: true }
};

// ====================================================================
// II. Funciones de Ayuda
// ====================================================================

function setupCanvas(container, projectKey) {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    currentProject = projects[projectKey];
    const projectTitle = currentProject.title;

    // Layout con botones abajo del canvas y cambiado el orden de los botones
    container.innerHTML = `
        <div class="flex flex-col items-center">
            <h2 class="text-3xl font-bold mb-6 text-fuchsia-400 text-shadow-neon">${projectTitle}</h2>
            <div class="canvas-container">
                <canvas id="projectCanvas" width="${canvasWidth}" height="${canvasHeight}"></canvas>
            </div>
            <div class="mt-8 flex flex-col-reverse sm:flex-row gap-6 justify-center">
                <button onclick="navigate('index')" class="home-button px-6 py-3 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-50">
                    ← RETORNAR AL ÍNDICE PRINCIPAL
                </button>
                ${currentProject.animated ? 
                `<button id="animationToggle" class="nav-link px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-green-300">
                    PAUSAR PROCESO
                </button>` : ''}
            </div>
            <p class="mt-6 text-sm text-gray-400 font-mono">:: Creador de la Rutina: Dival Miguel Rodriguez Cazares</p>
        </div>
    `;

    pageTitleElement.textContent = projectTitle;

    const canvas = document.getElementById('projectCanvas');
    const ctx = canvas.getContext('2d');

    // ... (KA utility functions remain the same)
    ctx.KA = {
        fill: (r,g,b,a=1)=>ctx.fillStyle=`rgba(${r},${g},${b},${a})`,
        stroke: (r=0,g=0,b=0,t=1)=>{ctx.strokeStyle=`rgb(${r},${g},${b})`;ctx.lineWidth=t;},
        noStroke: ()=>{ctx.strokeStyle='rgba(0,0,0,0)';ctx.lineWidth=0;},
        noFill: ()=>{ctx.fillStyle='rgba(0,0,0,0)';},
        rect: (x,y,w,h,r=0)=>{ctx.beginPath();if(r>0&&ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);ctx.fill();if(ctx.lineWidth>0)ctx.stroke();},
        ellipse: (x,y,w,h)=>{ctx.beginPath();ctx.ellipse(x,y,w/2,h/2,0,0,Math.PI*2);ctx.fill();if(ctx.lineWidth>0)ctx.stroke();},
        line: (x1,y1,x2,y2)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();},
        background: (r,g,b)=>{ctx.fillStyle=`rgb(${r},${g},${b})`;ctx.fillRect(0,0,canvasWidth,canvasHeight);}
    };

    if (currentProject.animated) document.getElementById('animationToggle').onclick = toggleAnimation;
    return ctx;
}

function toggleAnimation() {
    const button = document.getElementById('animationToggle');
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        button.textContent = 'REANUDAR PROCESO';
        button.classList.replace('bg-green-500', 'bg-red-500');
    } else {
        currentProject.setup(true);
        button.textContent = 'PAUSAR PROCESO';
        button.classList.replace('bg-red-500', 'bg-green-500');
    }
}

// ====================================================================
// III. Proyectos Estáticos (Se mantienen las rutinas de dibujo)
// ====================================================================

// 1. Muñeco de nieve que saluda
function setupSnowman() {
    const ctx = setupCanvas(contentArea, 'snowman');
    const KA = ctx.KA;
    KA.background(255, 255, 255);
    KA.rect(0, 350, 399, 50);
    KA.ellipse(200, 300, 150, 150);
    KA.ellipse(200, 200, 100, 100);
    KA.ellipse(200, 120, 75, 75);
    KA.stroke(0, 0, 0, 3);
    KA.line(160,200,90,150);
    KA.line(240,200,75,75);
}

// 2. Día nevado soleado
function setupSunnySnowyDay() {
    const ctx = setupCanvas(contentArea, 'sunny-snowy-day');
    const KA = ctx.KA;
    KA.background(135,206,235);
    KA.fill(102,255,0);
    KA.rect(0,300,400,100);
    KA.fill(255,255,0);
    KA.ellipse(80,64,100,100);
    KA.fill(255,255,255);
    KA.ellipse(200,300,150,150);
    KA.ellipse(200,200,100,100);
    KA.ellipse(200,120,75,75);
}

// 3. ¿Qué hay de cena?
function setupWhatsForDinner() {
    const ctx = setupCanvas(contentArea, 'whats-for-dinner');
    const KA = ctx.KA;
    KA.background(186,145,20);
    KA.fill(240,240,240);
    KA.ellipse(200,200,350,350);
    KA.fill(255,255,255);
    KA.ellipse(200,200,300,300);
    KA.fill(139,69,19);
    KA.rect(150,70,90,125,49);
    KA.fill(34,139,34);
    KA.rect(120,250,50,50);
    KA.fill(196,181,34);
    KA.rect(270,100,30,200);
}

// 4. Dientes de conejo
function setupBunnyTeeth() {
    const ctx = setupCanvas(contentArea, 'bunny-teeth');
    const KA = ctx.KA;
    const t = 20, n = 15;
    KA.background(255,255,255);
    KA.fill(255,255,255);
    KA.stroke(0,0,0,1);
    KA.ellipse(150,70,60,120);
    KA.ellipse(240,70,60,120);
    KA.fill(0,0,0);
    KA.ellipse(170,150,t,t);
    KA.ellipse(230,150,t,t);
    KA.stroke(0,0,0,2);
    KA.line(150,200,250,200);
    KA.noFill();
    KA.rect(185,200,15,n);
    KA.rect(200,200,15,n);
}

// 5. Rana loca
function setupFrog() {
    const ctx = setupCanvas(contentArea, 'frog');
    const KA = ctx.KA;
    const x=200, y=250;
    KA.noStroke();
    KA.fill(30,204,91);
    KA.ellipse(x,y,200,100);
    KA.ellipse(x-50,y-50,40,40);
    KA.ellipse(x+50,y-50,40,40);
    KA.fill(255,255,255);
    KA.ellipse(x-50,y-50,30,30);
    KA.ellipse(x+50,y-50,30,30);
    KA.fill(10,10,10);
    KA.ellipse(x,y,119,80);
    KA.rect(x-55,y-55,10,10);
    KA.rect(x+45,y-55,10,10);
}

// ====================================================================
// IV. Proyectos Animados (Se mantienen las rutinas de dibujo/animación)
// ====================================================================

// 6. Sol que explota
let sunSize = 30;
function setupExplodingSun(isResumed=false){
    const ctx = setupCanvas(contentArea,'exploding-sun');
    const KA = ctx.KA;
    if(!isResumed) sunSize=30;
    function draw(){
        KA.noStroke();
        KA.background(82,222,240);
        sunSize += 1;
        KA.fill(255,244,0);
        KA.ellipse(200,298,sunSize,sunSize);
        KA.fill(76,168,67);
        KA.rect(0,300,400,100);
        if(sunSize>600) sunSize=30;
        animationFrameId=requestAnimationFrame(draw);
    }
    draw();
}

// 7. Nubes que se separan
let leftX=120,rightX=310,sunRadius=100;
function setupSeparatingClouds(isResumed=false){
    const ctx=setupCanvas(contentArea,'separating-clouds');
    const KA=ctx.KA;
    if(!isResumed){leftX=120;rightX=310;sunRadius=100;}
    function draw(){
        KA.noStroke();
        KA.background(184,236,255);
        KA.fill(255,170,0);
        KA.ellipse(200,100,sunRadius,sunRadius);
        KA.fill(255,255,255);
        KA.ellipse(leftX,150,126,97);
        KA.ellipse(leftX+62,150,70,60);
        KA.ellipse(leftX-62,150,70,60);
        KA.ellipse(rightX,100,126,97);
        KA.ellipse(rightX+62,100,70,60);
        KA.ellipse(rightX-62,100,70,60);
        sunRadius+=2;
        leftX-=1;
        rightX+=1;
        if(leftX<-150||rightX>550){leftX=120;rightX=310;sunRadius=100;}
        animationFrameId=requestAnimationFrame(draw);
    }
    draw();
}

// 8. Estrella fugaz
let xPos=200,yPos=200,moon=350;
function setupShootingStar(isResumed=false){
    const ctx=setupCanvas(contentArea,'shooting-star');
    const KA=ctx.KA;
    if(!isResumed){xPos=200;yPos=200;moon=350;}
    function draw(){
        KA.background(29,40,115);
        KA.fill(255,242,0);
        KA.ellipse(xPos,yPos,10,10);
        xPos+=1;
        yPos-=0.5;
        KA.fill(255,255,0);
        ctx.beginPath();
        ctx.arc(moon,67,39.5, -1.22, 1.97);
        ctx.fill();
        moon-=0.2;
        animationFrameId=requestAnimationFrame(draw);
    }
    draw();
}

// ====================================================================
// V. Página Principal (Modificada con texto y estructura de consola)
// ====================================================================

function renderIndex(){
    if(animationFrameId) cancelAnimationFrame(animationFrameId);
    pageTitleElement.textContent = projects['index'].title;
    const linksHtml = Object.keys(projects)
        .filter(k=>k!=='index')
        .map(k=>`
            <button onclick="navigate('${k}')" class="nav-link px-4 py-3 rounded-md shadow-md">
                ${projects[k].title} ${projects[k].animated?'[ANIMADO]':'[ESTÁTICO]'}
            </button>`).join('');
    contentArea.innerHTML=`
        <div class="p-2 md:p-4 font-mono">
            <h2 class="text-xl font-bold mb-6 text-green-400"># EJECUTANDO: MÓDULO DE SELECCIÓN DE PROYECTOS</h2>
            <p class="mb-8 text-gray-300 leading-relaxed">
                > Se han cargado 8 rutinas gráficas. Seleccione el índice de la rutina a ejecutar para previsualizar el renderizado.
            </p>
            <div class="grid button-grid gap-4">
                ${linksHtml}
            </div>
            <p class="mt-10 text-xs text-yellow-500">
                > STATUS: OK. Esperando entrada de usuario...
            </p>
        </div>`;
}

// ====================================================================
// VI. Router
// ====================================================================

function navigate(hash){window.location.hash=hash;}
function handleRoute(){
    const hash=window.location.hash.substring(1)||'index';
    const project=projects[hash];
    if(project) project.setup(); else navigate('index');
}
window.addEventListener('hashchange',handleRoute);
window.addEventListener('load',handleRoute);
