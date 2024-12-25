const $=(el)=>document.querySelector(el),
    id=(el)=>document.getElementById(el),
    header = document.querySelector("header"),
    card = document.querySelector('aside'),
    line = document.querySelector('rect'),
    main = document.querySelector("main"),
    tiles = main.querySelectorAll('div'),
    footer = document.querySelector("footer"),
    restart = document.getElementById('restart');
var turn = "✖", //◯
    turnsTaken = 0,
    winsX=0,
    winsO=0,
    gameFrozen=false;
footer.style.display='none';
function changeBG(el,color=null){
    el.style.background=color;
}
header.addEventListener("click",()=>{
    header.style.display = "none";
    card.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";
});
card.addEventListener('mouseover',()=>{
    card.style.transform='rotateY(180deg)';
})
card.addEventListener('mouseout',()=>{
    card.style.transform='rotateY(0deg)';
})
restart.addEventListener('mouseover',()=>{
    restart.style.transform='rotate(180deg)';
    changeBG(restart,'rgb(185, 4, 4)');
    restart.querySelector('img').style.filter='invert()';
})
restart.addEventListener('mouseout',()=>{
    restart.style.transform='rotate(0deg)';
    restart.style.background='aliceblue';
    restart.querySelector('img').style.filter='invert(0)';
})
function resetBoard(){
    turnsTaken=0;
    gameFrozen=false;
    restart.style.background='aliceblue';
    restart.querySelector('img').style.filter='invert(0)';
    tiles.forEach((tile)=>{
        tile.textContent='';
        changeBG(tile);
        tile.style.color='aliceblue';
    })
    line.style.display='none';
    switchTurn();
    changeBG(id(turn),'purple');
}
restart.addEventListener('click',()=>{resetBoard()})
function switchTurn(){
    turn = turn === "✖" ? "◯" : "✖";
    card.textContent=turn;
    card.style.transform= turn ==="◯" ? 'rotateY(180deg)' : 'rotateY(0deg)';
}
tiles.forEach(tile =>{
    tile.addEventListener('click',()=>{
        if(!tile.style.background||gameFrozen){return}
        tile.textContent = turn;
        turnsTaken += 1;
        if(turnsTaken>=5){checkVictoryCondition()};
        if(turnsTaken===9){
            tiles.forEach((tile)=>{
                tile.style.color='lightgray';
                changeBG(restart,'rgb(185, 4, 4)');
                restart.querySelector('img').style.filter='invert(1)';
            })
        }
        changeBG(tile);
        switchTurn();
    })
    
    tile.addEventListener('mouseover',()=>{
        if(tile.textContent||gameFrozen){return}
        tile.innerHTML = turn;
        changeBG(tile,'rgba(67, 0, 67,.3');
    })
    
    tile.addEventListener('mouseout',()=>{
        if(!tile.style.background||gameFrozen){return}
        tile.textContent=null;
        changeBG(tile);
    })
});
function checkVictoryCondition(){
    const combinations = [
        {cells:["a1","a2","a3"],deg:0,  y:45,   x:0},
        {cells:["b1","b2","b3"],deg:0,  y:150,  x:0},
        {cells:["c1","c2","c3"],deg:0,  y:255,  x:0},
        {cells:["a1","b1","c1"],deg:90, y:105,  x:150},
        {cells:["a2","b2","c2"],deg:90, y:0,    x:150},
        {cells:["a3","b3","c3"],deg:90, y:-105, x:150},
        {cells:["a1","b2","c3"],deg:45, y:105,x:105},
        {cells:["a3","b2","c1"],deg:-45,y:105,x:-105}
    ];
    
    combinations.forEach((condition) => {
        if (condition.cells.every(id => document.getElementById(id).innerHTML === turn)) {
            condition.cells.forEach(tileId => {
                id(tileId).style.color = 'rgb(93, 255, 174)';
                changeBG(id(turn),'rgb(93, 255, 174)');
            });
            line.style.display='flex';
            line.style.transform=`rotate(${condition.deg}deg) translateY(${condition.y}px) translateX(${condition.x}px)`;
            let x = id('✖');
            let o = id('◯');
            if(turn==='✖'){
                winsX+=1;
                x.textContent=winsX;
            }else{
                winsO+=1;
                o.textContent=winsO;
            }
            if (winsX===winsO){
                x.removeAttribute('class');
                o.removeAttribute('class');
            }
            else if(winsX>winsO){x.className='fav';}
            else{o.className='fav'}
            turnsTaken=0;
            gameFrozen=true;
        }
    })
}