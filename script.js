const $=(el)=>document.querySelector(el);
const header = document.querySelector("header"),
    main = document.querySelector("main"),
    line = document.querySelector('rect');
var turn = "✖", //◯
    turnsTaken = 0,
    winsO = 0,
    winsX = 0,
    reset=false,
    freeze=false;
header.addEventListener("click",()=>{
    header.style.display = "none";
    main.style.display = "flex";
});
function resetBoard(){
    main.querySelectorAll("DIV").forEach((tile)=>{
        tile.replaceChildren();
        tile.style.background='purple';
    })
    reset=true;
    line.style.display='none';
    switchTurn();
}
function switchTurn(){
    turn = turn === "✖" ? "◯" : "✖";
}
document.querySelectorAll("div").forEach(div =>{
    div.addEventListener('click',(e)=>{
        if(div.style.background !== "none"){
            div.innerHTML = turn;
            turnsTaken += 1;
            if(turnsTaken>=5){checkVictoryCondition()};
            div.style.background = "none";
            switchTurn();
        }
    })
    
    div.addEventListener('mouseover',()=>{
        if(div.style.background !== "none" && !reset && !freeze){div.innerHTML = turn;}
    })
    
    div.addEventListener('mouseout',()=>{
        if(div.style.background !== "none"){div.textContent = "";}
    })
});
function checkVictoryCondition(){
    const combinations = [
        {cells:["a1","a2","a3"],deg:0,y:-110},
        {cells:["b1","b2","b3"],deg:0,y:0},
        {cells:["c1","c2","c3"],deg:0,y:110},
        {cells:["a1","b1","c1"],deg:90,y:110},
        {cells:["a2","b2","c2"],deg:90,y:0},
        {cells:["a3","b3","c3"],deg:90,y:-110},
        {cells:["a1","b2","c3"],deg:45,y:0},
        {cells:["a3","b2","c1"],deg:-45,y:0} 
    ];

    combinations.forEach((condition) => {
        if (condition.cells.every(id => document.getElementById(id).innerHTML === turn)) {
            freeze=true;
            line.style.display='flex';
            line.style.transform=`rotate(${condition.deg}deg) translateY(${condition.y}px)`
            const score = document.getElementById(turn);
            score.innerHTML = parseInt(score.innerHTML) + 1;
            // resetBoard();
        }
    })
}