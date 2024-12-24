const $=(el)=>document.querySelector(el),
    id=(el)=>document.getElementById(el),
    header = document.querySelector("header"),
    card = document.querySelector('nav'),
    line = document.querySelector('rect'),
    main = document.querySelector("main"),
    tiles = main.querySelectorAll('div'),
    footer = document.querySelector("footer"),
    restart = document.getElementById('restart');
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
    card.style.transform='rotateY(180deg)';
})
function changeBG(el, color = 'none'){
    el.style.background=color;
}
function resetBoard(){
    tiles.forEach((tile)=>{
        tile.textContent='';
        changeBG(tile,'rgba(67, 0, 67,.9)');
        tile.style.color='aliceblue';
    })
    line.style.display='none';
    switchTurn();
    changeBG(id(turn),'purple');
}
restart.addEventListener('click',()=>{resetBoard()})
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
        if(tile.style.background==="none"){return}
        tile.innerHTML = turn;
        tile.style.background='purple';
    })
    
    tile.addEventListener('mouseout',()=>{
        if(tile.style.background==="none"){return}
        tile.textContent = "";
        tile.style.background='rgba(67, 0, 67,.9)';
    })
});
function checkVictoryCondition(){
    const combinations = [
        {cells:["a1","a2","a3"],deg:0,  y:50,   x:0},
        {cells:["b1","b2","b3"],deg:0,  y:160,  x:0},
        {cells:["c1","c2","c3"],deg:0,  y:270,  x:0},
        {cells:["a1","b1","c1"],deg:90, y:110,  x:160},
        {cells:["a2","b2","c2"],deg:90, y:0,    x:160},
        {cells:["a3","b3","c3"],deg:90, y:-110, x:160},
        {cells:["a1","b2","c3"],deg:45, y:112.5,x:112.5},
        {cells:["a3","b2","c1"],deg:-45,y:112.5,x:-112.5} 
    ];
    
    combinations.forEach((condition) => {
        if (condition.cells.every(id => document.getElementById(id).innerHTML === turn)) {
            tiles.forEach((tile)=>{
                changeBG(tile);
            })
            condition.cells.forEach(tileId => {
                id(tileId).style.color = 'rgb(93, 255, 174)';
                changeBG(id(turn),'rgb(93, 255, 174)');
            });
            line.style.display='flex';
            line.style.transform=`rotate(${condition.deg}deg) translateY(${condition.y}px) translateX(${condition.x}px)`
            id(turn).textContent = parseInt(id(turn).textContent) + 1;
        }
    })
}