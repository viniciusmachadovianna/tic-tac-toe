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
    winsO=0;
header.style.display='flex';
main.style.display='none';
card.style.display='none';
card.textContent=turn;
footer.style.display='none';
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
    restart.style.background='rgb(185, 4, 4)';
    restart.querySelector('img').style.filter='invert()';
})
restart.addEventListener('mouseout',()=>{
    restart.style.transform='rotate(0deg)';
    restart.style.background='aliceblue';
    restart.querySelector('img').style.filter='invert(0)';
})
function changeBG(el, color = 'none'){
    el.style.background=color;
}
function resetBoard(){
    turnsTaken=0;
    restart.style.background='aliceblue';
    restart.querySelector('img').style.filter='invert(0)';
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
    card.textContent=turn;
    card.style.transform= turn ==="◯" ? 'rotateY(180deg)' : 'rotateY(0deg)';
}
tiles.forEach(tile =>{
    tile.addEventListener('click',()=>{
        if(tile.style.background === "none"){return}
        tile.innerHTML = turn;
        turnsTaken += 1;
        if(turnsTaken>=5){checkVictoryCondition()};
        if(turnsTaken===9){
            tiles.forEach((tile)=>{
                tile.style.color='lightgray';
                restart.style.background='rgb(185, 4, 4)';
                restart.querySelector('img').style.filter='invert(1)';
            })
        }
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
        }
    })
}