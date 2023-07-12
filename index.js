const area = document.querySelectorAll('#game button')

let turnPlayer = ''
let selected = []
let player1 = document.getElementById('player1')
let player2 = document.getElementById('player2')
let winner1 = 0
let winner2 = 0

//função para mudar o nome do jogador
function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}
//funcao de iniciar o jogo
function initialize(){

    turnPlayer = 'player1'
    selected = []
    document.querySelector('h3').innerHTML = 'Jogador da vez: <span id="turnPlayer"></span>'
    updateTitle()
    area.forEach(function(element) {
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', selectedarea)
    })


}

//função colorir area vencedora e mostrar o nome do jogador vencedor
function win(area,player, win){
    area.forEach(function(region){
        document.querySelector('[data-value="'+region+'"]').classList.add('win')
    })
    document.querySelector('h3').innerHTML = `O jogador ${player} venceu`
    if (win == 'player1'){
        winner1 += 1
    } else if (win == 'player2'){
        winner2 += 1
    }
    console.log(winner1,winner2)

}

//verificar areas vencedoras
function getWinRegions(){
    const winRegions = []
    if (selected[0] && selected[0] === selected[1] && selected[0] === selected[2])
    winRegions.push('0','1','2')
    if (selected[3] && selected[3] === selected[4] && selected[3] === selected[5])
    winRegions.push('3','4','5')
    if (selected[6] && selected[6] === selected[7] && selected[6] === selected[8])
    winRegions.push('6','7','8')
    if (selected[0] && selected[0] === selected[3] && selected[0] === selected[6])
    winRegions.push('0','3','6')
    if (selected[1] && selected[1] === selected[4] && selected[1] === selected[7])
    winRegions.push('1','4','7')
    if (selected[2] && selected[2] === selected[5] && selected[2] === selected[8])
    winRegions.push('2','5','8')
    if (selected[0] && selected[0] === selected[4] && selected[0]=== selected[8])
    winRegions.push('0','4','8')
    if (selected[2] && selected[2] === selected[4] && selected[2] === selected[6])
    winRegions.push('2','4','6')
    return winRegions
}

function confirmation(){
    let confirm = 0
    selected.forEach(function(element){
        if (element.includes('X')) {
            confirm += 1
        } else if (element.includes('O')){
            confirm += 1
        }
    })
    if (confirm == 9) {
        document.querySelector('h3').innerHTML = 'EMPATE!'
    }
 console.log(confirm)
}

function disableRegion(element){
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', selectedarea)
}

//função para inserir o X ou O na area
function selectedarea(ev){
    const span = ev.target
    const region = span.dataset.value
    let turn
    if (turnPlayer === 'player1') {
        span.innerText = 'X'
        selected[region] = 'X'
        turn = player1.value
   } else {
        span.innerText = 'O'
        selected[region] = 'O'
        turn = player2.value
    }
    console.clear()
    console.log(selected)
    disableRegion(span)
    const winner = getWinRegions()

    if (winner.length > 0 ){
        win(winner,turn,turnPlayer)
        area.forEach(function(element) {
            element.removeEventListener('click', selectedarea)
        })
        document.getElementById('placar1').innerText = winner1
        document.getElementById('placar2').innerText = winner2
    } else if (winner == 0){
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'    
    updateTitle() 
    confirmation()
}   
}

//botao começar, chamando a função de iniciar
document.getElementById('start').addEventListener('click',initialize)
