const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagemPrincipal = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const botaoComecar = document.querySelector('#start-pause');
const botaoZerar = document.querySelector('#zerar')
const textoBotaoComecar = document.querySelector('#start-pause span');
const imagemBotaoComecarOuPausar = document.querySelector('#start-pause img');
const botaoMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3')
const somFimContagem = new Audio('./sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer');
var modo = "";

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true;

botaoMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})



/* Essa opção abaixo é feita diretamente com o método "onclick" nos botões
focoBt.onclick = function (){
    html.setAttribute('data-contexto', 'foco')
}

curtoBt.onclick = function (){
    html.setAttribute('data-contexto', 'descanso-curto')
}

longoBt.onclick = function (){
    html.setAttribute('data-contexto', 'descanso-longo')
}
*/

// Essa opção abaixo é feito com o método "addEventListener" nos botões
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
    modo = "Foco";
    
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    modo = "Curto";
    
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    modo = "Longo";
    
})

function alterarContexto(contexto){
    mostrartempo()
    botoes.forEach( element => {
        element.classList.remove('active')
        
    });

    html.setAttribute('data-contexto', contexto);
    imagemPrincipal.setAttribute('src', (`./imagens/${contexto}.png`));
     
    switch (contexto){

        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;

        default:
            break;
        
    } 
    
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){ 
        tempoFinalizado();
        return
    }

    tempoDecorridoEmSegundos -= 1;
    mostrartempo()
}

botaoComecar.addEventListener('click', inciar)
botaoZerar.addEventListener('click', zerar)

function inciar(){
    if (intervaloId == null){
        textoBotaoComecar.textContent = "Pausar"
        imagemBotaoComecarOuPausar.setAttribute('src', (`./imagens/pause.png`));
        botaoZerar.setAttribute('style','display:none')
        somPlay.play()
        intervaloId = setInterval(contagemRegressiva, 1000); //Esse parametro sempre recebe o valor em milisegundos, por isso está 1000
    }else{
        textoBotaoComecar.textContent = "Continuar"
        imagemBotaoComecarOuPausar.setAttribute('src', (`./imagens/play_arrow.png`));
        botaoZerar.setAttribute('style','exibido')
        somPause.play()
        clearInterval(intervaloId);
        intervaloId = null;
        return
    }
}


function tempoFinalizado(){
    somFimContagem.play()
    alert('Tempo finalizado!');
    zerar();
    return
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    console.log(modo)
    if (modo == "Curto"){
        tempoDecorridoEmSegundos = 300
    }else{
        if(modo == "Longo"){
            tempoDecorridoEmSegundos = 900
        }else{
            tempoDecorridoEmSegundos = 1500
        }
    }
    console.log(tempoDecorridoEmSegundos)
    textoBotaoComecar.textContent = "Começar"
    imagemBotaoComecarOuPausar.setAttribute('src', (`./imagens/play_arrow.png`));
    botaoZerar.setAttribute('style','display:none')
    mostrartempo()
    return
}

function mostrartempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrartempo()

