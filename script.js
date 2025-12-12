// DATA DE INÍCIO: (ano, mêsIndex, dia, hora, min, seg)
// mêsIndex começa em 0 => Dezembro = 11
const inicio = new Date(2023, 11, 13, 0, 0, 0);

// retorna diferença em { anos, meses, dias, horas, minutos, segundos }
function diffCalendar(start, end) {
    let anos = end.getFullYear() - start.getFullYear();
    let meses = end.getMonth() - start.getMonth();
    let dias = end.getDate() - start.getDate();
    let horas = end.getHours() - start.getHours();
    let minutos = end.getMinutes() - start.getMinutes();
    let segundos = end.getSeconds() - start.getSeconds();

    // ajustar segundos/minutos/horas/dias/meses/anos com "empréstimos"
    if (segundos < 0) { segundos += 60; minutos -= 1; }
    if (minutos < 0) { minutos += 60; horas -= 1; }
    if (horas < 0) { horas += 24; dias -= 1; }

    if (dias < 0) {
        // pega quantos dias tem no mês anterior ao 'end'
        // criando uma data com dia 0 volta para o último dia do mês anterior
        const ultimoDiaMesAnterior = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
        meses -= 1;
    }

    if (meses < 0) {
        meses += 12;
        anos -= 1;
    }

    // garantir que nenhum valor fique negativo (por segurança)
    if (anos < 0) { anos = meses = dias = horas = minutos = segundos = 0; }

    return { anos, meses, dias, horas, minutos, segundos };
}

function atualizarContador() {
    const agora = new Date();
    const d = diffCalendar(inicio, agora);

    // formata com plurais e sem "(s)" estranhos
    const parts = [];
    if (d.anos) parts.push(`${d.anos} ${d.anos === 1 ? 'ano' : 'anos'}`);
    if (d.meses) parts.push(`${d.meses} ${d.meses === 1 ? 'mês' : 'meses'}`);
    if (d.dias) parts.push(`${d.dias} ${d.dias === 1 ? 'dia' : 'dias'}`);
    // horas/minutos/segundos sempre mostrar para ficar igual ao exemplo
    parts.push(`${d.horas} ${d.horas === 1 ? 'hora' : 'horas'}`);
    parts.push(`${d.minutos} ${d.minutos === 1 ? 'minuto' : 'minutos'}`);
    parts.push(`${d.segundos} ${d.segundos === 1 ? 'segundo' : 'segundos'}`);

    document.getElementById('contador').textContent = parts.join(', ');
}

setInterval(atualizarContador, 1000);
atualizarContador();



// --- CORAÇÕES CAINDO (usa imagem em img/coracao.png)
function criarCoracao() {
    const heart = document.createElement("img");
    heart.src = "img/coracao.png"; // coloque uma imagem pequena de coração
    heart.className = "heart";

    const size = Math.random() * 24 + 18; // 18px a 42px
    heart.style.width = `${size}px`;

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2);

    document.getElementById("heart-container").appendChild(heart);

    // remover depois que terminar a animação (segundos)
    setTimeout(() => heart.remove(), 8000);
}

// criar corações com intervalo
setInterval(criarCoracao, 350);
