
function creatHtmlBoard()
{
    const board=document.getElementById('board');

    for(let y=0,e=0,j=0 ;y<8; y++)
    {
      for(let x=0;x<8;x++)
      {
        const square=document.createElement('div');
        if(y%2===0)
        {
            square.className=x % 2===0 ?'white':'black';   
        }
        else
        {
            square.className=x % 2 ===0 ? 'black':'white';
        }
          
        board.appendChild(square);
        if(square.className==='black')
        {
                    square.id=e+""+j;
                    if(e!=3 && e!=4 && e<8)
                    {
                       creatHtmlPiece(square,e);
                    }
                    j++
                    e=j===4?e+1:e;
                    j=j===4?0:j;
        }
      }
    }
}

function creatHtmlPiece(square,e)
{
        const newPiece=document.createElement('div');
        newPiece.className='piece';
        newPiece.classList.add (e<3?('black-piece'):('white-piece'));
        square.appendChild(newPiece);
}


function onClick(backBoard,frontBoard,turn,canCapture,doubleCaptureMove,locationFrom)
{
    let pieceLocation;
    const pieces=document.getElementsByClassName('piece');
    for(let x=0;x<pieces.length;x++)
{      
        pieces[x].addEventListener('click',(event)=>{
            if(doubleCaptureMove.getIsCapture()==false)
            {
                    pieceLocation=convertDivToArrLocation(event.target.parentNode); 
                    locationFrom.setLocation(pieceLocation.x,pieceLocation.y);
                    let isWhite=(turn.getTurn()%2===0)?true:false;
                if(backBoard[locationFrom.x][locationFrom.y].isWhite===isWhite)
                {   
                    let validmoves=backBoard[locationFrom.x][locationFrom.y].findValidMoves(locationFrom,backBoard,canCapture);
                    
                    if(validmoves[0]!=null)
                    {  
                        frontBoard[locationFrom.x][locationFrom.y].firstElementChild.classList.toggle('chosen');
                        if(event.target.classList.contains('chosen'))
                        {  
                            lightValidMoves(validmoves,frontBoard);
                        }
                        else    
                        {
                            removeValidMovesOptions(frontBoard);
                        }
                        removePreviousChosenPiece(locationFrom,frontBoard);
                    } 
                } 
            }       
        });           
};
}


function removePreviousChosenPiece(locationFrom,frontBoard)
{
    
    for(let x=0;x<8;x++)
    {
        for(y=0;y<4;y++)
        {  
            if(locationFrom.getLocation().x==x && locationFrom.getLocation().y==y)
            {
                continue; 
            }
               
            else
            {
                if(frontBoard[x][y].firstElementChild!=null)
                {
                    if(frontBoard[x][y].firstElementChild.classList.contains('chosen'))
                    {
                        frontBoard[x][y].firstElementChild.classList.toggle('chosen');
                    }
                }
            }
        }
    }
}

function removeValidMovesOptions(frontBoard)
{
    for(let i=0,x=0;x<8;x++)
    {
        for(y=0;y<4;y++,i++) 
           unlightPreviousValidMoves((new Location(x,y)),frontBoard) 
    }

}

function lightValidMoves(validMoves,frontBoard)
{
    for(let i=0;i<validMoves.length;i++)
    {
        if(!(frontBoard[validMoves[i].x][validMoves[i].y].classList.contains('option')))
        {
            frontBoard[validMoves[i].x][validMoves[i].y].classList.toggle('option');
        }
    }
      hidePreviousValidMoves(validMoves,frontBoard);
}

function unlightPreviousValidMoves(location,frontBoard)
{

  if(frontBoard[location.x][location.y].classList.contains('option'))
    {
        frontBoard[location.x][location.y].classList.remove('option');
    } 
}  


function fillFrontBoard(frontBoard)
{
    let black=(document.getElementsByClassName('black'));
    for(let i=0,x=0;x<8;x++)
    {
        for(y=0;y<4;y++,i++)
        {
            frontBoard[x][y]=black[i]; 
            
        }
    }
    // drawnSimulation(frontBoard);
    return frontBoard;
}

function drawnSimulation(frontBoard)
{
    for(let i=0,x=0;x<3;x++)
    {
        for(y=0;y<4;y++,i++)
        {
            frontBoard[x][y].firstElementChild.remove('div');
        }
    }
    let queen=document.createElement('div');
    queen.className='piece';
    queen.classList.add ('white-piece');
    let queen1=document.createElement('div');
    queen1.className='piece';
    queen1.classList.add ('white-piece');
    let queen2=document.createElement('div');
    queen2.className='piece';
    queen2.classList.add ('black-piece');
    frontBoard[4][0].appendChild(queen);
    frontBoard[2][0].appendChild(queen1);
    frontBoard[1][0].appendChild(queen2);
}
    

function changeFrontBoard(locationTo,locationFrom,frontBoard,erasePiece,coronation,gameOver,burnPawnsIndex,gap,doubleCaptureMove,backBoard,canCapture,isWhite)
{
    let creatPiece=document.createElement('div');
    console.log(locationFrom);
    
    frontBoard[locationTo.x][locationTo.y].appendChild(frontBoard[locationFrom.x][locationFrom.y].firstElementChild);
    if(coronation)
    {
      frontBoard[locationTo.x][locationTo.y].firstElementChild.classList.add('queen');
    }
    if(erasePiece.x!=null)
    {
        frontBoard[erasePiece.x][erasePiece.y].firstElementChild.remove('div');
    }
    removeValidMovesOptions(frontBoard);

   if(!doubleCaptureMove.getIsCapture())
   {
    frontBoard[locationTo.x][locationTo.y].firstElementChild.classList.toggle('chosen');
   }
    
    else 
    {
      let validmoves=backBoard[locationTo.x][locationTo.y].findValidMoves(locationTo,backBoard,canCapture);
      let validmoveCapture;
      validmoveCapture=validMovesSelect(backBoard,locationTo,validmoves);
      lightValidMoves(validmoveCapture,frontBoard);
    }

    if(burnPawnsIndex[0]!=null&&gap<2)
    {
        burnPieces(frontBoard,burnPawnsIndex,gap,locationFrom,locationTo);
    }
    
    if(gameOver!=null)
    {
        let innerModal=document.getElementById('endGameModal');
        innerModal.innerHTML=gameOver;
        newGameButton(innerModal);
        let modal=document.getElementById('modal');
        modal.style.display='flex';
    } 

    if(!doubleCaptureMove.getIsCapture())
    {
        printTurn(isWhite);
    } 
}

function printTurn(isWhite)
{
    let turnBox=document.getElementById("turnBox")
    turnBox.innerHTML=isWhite?"Black to move":"White to move";
}

function validMovesSelect(backBoard,locationTo,validmoves)
{
    let validmovesSelect=[];
    for(let i=0;i<validmoves.length;i++)
    {
        let gap=(validmoves[i].x)-locationTo.x;
        gap=Math.abs(gap);

        if(gap>1)
        {
            validmovesSelect.push(validmoves[i]);
        }
    }
    return validmovesSelect;
}

function burnPieces(frontBoard,burnPawnsIndex,gap,locationFrom,locationTo)
{

        for(let i=0;i<burnPawnsIndex.length;i++)
        {
            if(burnPawnsIndex[i].x===locationFrom.x &&burnPawnsIndex[i].y===locationFrom.y)
             {
                if(gap>1)
                    continue;
                else
                {
                    frontBoard[locationTo.x][locationTo.y].firstElementChild.classList.add('burned'); 
                    setTimeout(removePawn,400, frontBoard,locationTo);
                }

             }
            else
              {
                frontBoard[burnPawnsIndex[i].x][burnPawnsIndex[i].y].firstElementChild.classList.add('burned');
                setTimeout(removePawn,400, frontBoard,burnPawnsIndex[i]);
              } 
        }

        function removePawn(frontBoard,burnPawnsIndex,i)
        {
          frontBoard[burnPawnsIndex.x][burnPawnsIndex.y].firstElementChild.remove('div');
        }
}

function endGameModal(gameOver){
    let game=document.getElementsByTagName('body')
    let transperent=document.createElement('div');
    transperent.className='transperent';
    transperent.id='modal';
    game[0].appendChild(transperent);
    let modal=document.getElementById('modal');
    let endGameModal=document.createElement('div');
    endGameModal.className='endGameModal';
    endGameModal.id='endGameModal';
    endGameModal.innerHTML="Do you wish to draw?"
    modal.appendChild(endGameModal);
    buttonBuild(endGameModal);
    transperent.style.display='none';
    return modal;
}

function buttonBuild(endGameModal)
{
    let button1=document.createElement('button');
    let button2=document.createElement('button');
    button1.className=('small-button');
    button1.innerHTML='yes';
    button1.addEventListener('click',()=>
    {
        let modal=document.getElementById('endGameModal');
        modal.innerHTML='Draw game';
        newGameButton(modal);
    })
    button2.className=('small-button');
    button2.innerHTML='no';
    button2.addEventListener('click',()=>
    {
        let modal=document.getElementById('modal');
        modal.style.display='none';
    })
    endGameModal.appendChild(button1);
    endGameModal.appendChild(button2);
}

function newGameButton(innerModal)
{
    let button1=document.createElement('button');
    button1.className=('new-game-button');
    button1.innerHTML='Start New Game';
    button1.addEventListener('click',()=>
    {
       
       window.location.reload();
    })
    innerModal.appendChild(button1);
}

   function drawButton(){
    let buttonDiv=document.getElementById('button');
    let button=document.createElement('div');
    button.className='button';
    button.innerHTML='Click For Draw';
    button.addEventListener ('click',()=>
    {
        let modal=document.getElementById('modal')
        modal.style.display='flex';
    })
    buttonDiv.appendChild(button);
 }

 function creatTurnBox()
{
    const div=document.getElementById('turn');
    const turnBox=document.createElement('div');
    turnBox.className='turn-box';turnBox.id='turnBox';
    div.appendChild(turnBox);
}

function onClickSquare(backBoard,frontBoard,turn,canCapture,doubleCaptureMove)
{
    for(let x=0;x<8;x++)
    {
        for(let y=0;y<4;y++)
        {
            frontBoard[x][y].addEventListener('click',(event)=>
            {   
                
              if(event.target.classList.contains('option'))
                { 
                    changeBackBoard((convertDivToArrLocation(event.target)),frontBoard,backBoard,turn,canCapture,doubleCaptureMove);     
                }
            })
        }
    }   
}

function locateChosenPiece(frontBoard)
{
    for(let x=0;x<8;x++)
    {
        for(y=0;y<4;y++)
        {
            if(frontBoard[x][y].hasChildNodes())
            {   
                if(frontBoard[x][y].firstElementChild.classList.contains('chosen'))
                    return new Location(x,y);    
            }
           
        }
    }
    return null;
}

function convertDivToArrLocation(div)
{
    let idNumber=div.id;
    let x=parseInt(idNumber.charAt(0));
    let y=parseInt(idNumber.charAt(1));
 
    return new Location(x,y);

//    let loc;
//    switch(idNumber)
//    {
//      case 1:return (loc=new Location(0,0)); break;
//      case 2:return (loc=new Location(0,1)); break;
//      case 3:return (loc=new Location(0,2)); break;
//      case 4:return (loc=new Location(0,3)); break;
//      case 5:return (loc=new Location(1,0)); break;
//      case 6:return (loc=new Location(1,1)); break;
//      case 7:return (loc=new Location(1,2)); break;
//      case 8:return (loc=new Location(1,3)); break;
//      case 9:return (loc=new Location(2,0)); break;
//      case 10:return(loc=new Location(2,1)); break;
//      case 11:return(loc=new Location(2,2)); break;
//      case 12:return(loc=new Location(2,3)); break;
//      case 13:return (loc=new Location(3,0)); break;
//      case 14:return (loc=new Location(3,1)); break;
//      case 15:return (loc=new Location(3,2)); break;
//      case 16:return (loc=new Location(3,3)); break;
//      case 17:return (loc=new Location(4,0)); break;
//      case 18:return (loc=new Location(4,1)); break;
//      case 19:return (loc=new Location(4,2)); break;
//      case 20:return (loc=new Location(4,3)); break;
//      case 21:return (loc=new Location(5,0)); break;
//      case 22:return(loc=new Location(5,1)); break;
//      case 23:return(loc=new Location(5,2)); break;
//      case 24:return(loc=new Location(5,3)); break;
//      case 25:return (loc=new Location(6,0)); break;
//      case 26:return (loc=new Location(6,1)); break;
//      case 27:return (loc=new Location(6,2)); break;
//      case 28:return (loc=new Location(6,3)); break;
//      case 29:return(loc=new Location(7,0)); break;
//      case 30:return(loc=new Location(7,1)); break;
//      case 31:return(loc=new Location(7,2)); break;
//      case 32:return(loc=new Location(7,3)); break;
//    }
}