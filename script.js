//initial data
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

var warning = '';
var statusPlaying = false;
var selectedObject, selectedMachine = 0;
var playerPoints = 0;
var machinePoints = 0;

resetGame();

//events
c('#play').addEventListener('click', startGame);
c('#reset').addEventListener('click', resetGame);
cs('.container-info-02 img').forEach(element => {
    element.addEventListener('click', changeObject)
});

//functions
function resetGame(){
    warning = 'Selecione o objeto e clique no botão "jogar" para iniciar.';
    selectedObject = selectedMachine = 0;
    statusPlaying = false;

    c('#play').style.display = 'block';
    c('.img-area-01 img').src = 'img/paper.webp';
    c('.object-01').innerHTML = 'Papel';
    cs('.container-info-02 img.active').forEach(element => {
        element.classList.remove('active');
    })
    c('.container-info-02 img:nth-child(1)').classList.add("active");

    renderInfo();
}

function startGame(e){
    e.preventDefault();
    statusPlaying = true;

    if(statusPlaying){
        selectedMachine = Math.floor(Math.random() * 3);        
        if(selectedMachine === 0){
            c('.img-area-02 img').src = 'img/paper.webp';
            c('.object-02').innerHTML = 'Papel';
        } else if(selectedMachine === 1){
            c('.img-area-02 img').src = 'img/stone.png';
            c('.object-02').innerHTML = 'Pedra';
        } else {
            c('.img-area-02 img').src = 'img/scissors.jpg';
            c('.object-02').innerHTML = 'Tesoura';
        }
    }

    checkGame();
    renderInfo();
}

function changeObject(e){
    if(!statusPlaying){
        c('.container-info-02 img.active').classList.remove('active');
        e.target.classList.add('active');
        selectedObject = parseInt(e.target.getAttribute('data-object'));

        if(selectedObject === 0){
            c('.img-area-01 img').src = 'img/paper.webp';
            c('.object-01').innerHTML = 'Papel';
        } else if(selectedObject === 1){
            c('.img-area-01 img').src = 'img/stone.png';
            c('.object-01').innerHTML = 'Pedra';
        } else {
            c('.img-area-01 img').src = 'img/scissors.jpg';
            c('.object-01').innerHTML = 'Tesoura';
        }
    }
}

function renderInfo(){
    c('#warning').innerHTML = warning;
}

function checkGame(){
    cs('.container-info-02 img').forEach(element => {
        element.classList.remove('active');
    })
    c('#play').style.display = 'none';

    let possibilities = {draw: [00, 11, 22], youWin: [01, 12, 20], youLose: [10, 21, 02]}
    let nowPos = parseInt(`${selectedObject}${selectedMachine}`);
    
    if(possibilities.draw.includes(nowPos)){
        warning = 'Jogo empatado!';
    } else if(possibilities.youWin.includes(nowPos)){
        warning = 'Você ganhou!';
        playerPoints++;
    } else if(possibilities.youLose.includes(nowPos)){
        warning = 'A máquina ganhou!';
        machinePoints++;
    }
    c("div.score div.player").innerHTML = playerPoints;
    c("div.score div.machine").innerHTML = machinePoints;
}
