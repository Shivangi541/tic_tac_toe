const boxes= document.querySelectorAll('.box');
const gameinfo= document.querySelector('.game_info');
const newgame= document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningPos=[ // either positions to have all three x or all three o
[0,1,2],
[3,4,5],
[6,7,8],
[1,3,6],
[2,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];


// initial stages
function initGame(){
    currentPlayer='O';
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{ // ui pe update karna
        box.innerHTML="";
        boxes[index].style.pointerEvents="all";// cursor event
        box.classList = ` box box${index+1}`;// initial grid settings
    });
    newgame.classList.remove("active");
   gameinfo.innerHTML =`Current Player - ${currentPlayer}`;
   

}

initGame();

function handleClick(index){
    if(gameGrid[index]==='')
    {
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents='none';// unclickable

        // change turn
        swapTurn();

        //check for winning player
        checkGameOver();
    }
}
function swapTurn(){
    if(currentPlayer==='X')
    {
        currentPlayer='O';
    }
    else{
        currentPlayer='X';
    }
    gameinfo.innerHTML=`Current Player - ${currentPlayer}`;// ui update
}
// add event listener
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index)
    })
});
function checkGameOver(){
    let answer="";
    winningPos.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")&& (gameGrid[position[0]]===gameGrid[position[1]] &&(gameGrid[position[1]]===gameGrid[position[2]]))){
           
            // check for winner

            if(gameGrid[position[0]]==='X')
             answer="X";
            else
             answer="O";

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    if(answer!=="")
    {
         gameinfo.innerHTML=`Winner Player - ${answer}`;
         newgame.classList.add("active");
         return;
    }
    //draw
    let fill=0;
   gameGrid.forEach((box)=>{
    if(box!=="")
    {
        fill++;
    }
   });

   if(fill===9)
   {
    gameinfo.innerHTML=`Game Tied!`;
    newgame.classList.add("active");
   }

}

newgame.addEventListener("click",initGame);


