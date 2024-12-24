const $=(el)=>document.querySelector(el),
    id=(el)=>document.getElementById(el),
    header = document.querySelector("header"),
    card = document.querySelector('nav'),
    line = document.querySelector('rect'),
    main = document.querySelector("main"),
    tiles = main.querySelectorAll('div'),
    footer = document.querySelector("footer");
var turn = "✖", //◯
    turnsTaken = 0;
header.style.display='flex';
main.style.display='none';
card.style.display='none';
footer.style.display='none';
header.addEventListener("click",()=>{
    header.style.display = "none";
    card.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";
});
card.addEventListener('click',()=>{
    card.style.transform='rotateX(180deg)';
})
function changeBG(el, color = 'none'){
    el.style.background=color;
}
function resetBoard(){
    tiles.forEach((tile)=>{
        tile.replaceChildren();
        changeBG(tile,'purple');
        tile.style.color='aliceblue';
    })
    line.style.display='none';
    switchTurn();
}
function switchTurn(){
    turn = turn === "✖" ? "◯" : "✖";
}
tiles.forEach(tile =>{
    tile.addEventListener('click',()=>{
        if(tile.style.background === "none"){return}
        tile.innerHTML = turn;
        turnsTaken += 1;
        if(turnsTaken>=5){checkVictoryCondition()};
        changeBG(tile);
        switchTurn();
    })
    
    tile.addEventListener('mouseover',()=>{
        if(tile.style.background !== "none"){tile.innerHTML = turn;}
    })
    
    tile.addEventListener('mouseout',()=>{
        if(tile.style.background !== "none"){tile.textContent = "";}
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
            tiles.forEach((tile)=>{
                changeBG(tile);
            })
            condition.cells.forEach(tileId => {
                id(tileId).style.color = 'rgb(93, 255, 174)';
            });
            line.style.display='flex';
            line.style.transform=`rotate(${condition.deg}deg) translateY(${condition.y}px)`
            const score = document.getElementById(turn);
            score.innerHTML = parseInt(score.innerHTML) + 1;
        }
    })
}