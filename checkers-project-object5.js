
class Pawn {
    constructor(name,isWhite) {
        this.name=name;
        this.isWhite = isWhite;
        }
        getIsWhite()
        {
            return this.isWhite
        }

    findValidMoves(locationFrom,backBoard,canCapture)
{ 
     let x=locationFrom.x;
     let y=locationFrom.y;
     let validMoves=[];
     let Skipcolumn=locationFrom.x%2===0?locationFrom.y-1:locationFrom.y+1;
     Skipcolumn=(Skipcolumn>=0 && Skipcolumn<4)?Skipcolumn:null;
     let SkipRow=backBoard[x][y].isWhite?x-2:x+2;
     let validX=backBoard[x][y].isWhite?x-1:x+1;
     validX=(validX>=0 &&validX<=7)?validX:null;
     let validY=locationFrom.x%2==0?y+1:y-1;
     validY=(validY>=0 &&validY<=3)?validY:null;
     let validXQueen=backBoard[x][y].isWhite?x+1:x-1;
     validXQueen=(validXQueen>0 && validXQueen<7)?validXQueen:null;
     let skipRowQueen=backBoard[x][y].isWhite?x+2:x-2;
     skipRowQueen=(skipRowQueen>=0 && skipRowQueen<=7)?skipRowQueen:null;
     canCapture.setIsCapture(false);

    if(backBoard[x][y].name==='queen' && validXQueen!=null)
    {
        if(backBoard[validXQueen][y].name=='empty')
        {
            validMoves.push(new Location(validXQueen,y)); 
        }
        else
        {
            if(skipRowQueen!=null&&Skipcolumn!=null)  
         {
           if((backBoard[skipRowQueen][Skipcolumn].name=='empty')
           &&(backBoard[locationFrom.x][locationFrom.y].isWhite!=backBoard[validXQueen][locationFrom.y].isWhite)) 
           {
              validMoves.push(new Location(skipRowQueen,Skipcolumn)); 
              canCapture.setIsCapture(true);
           }  
         }
        }
    } 
    if(validX!=null)
    {
        if(backBoard[validX][y].name=='empty')
           validMoves.push(new Location(validX,y)); 
           else
        {//במידה ורוצים לאכול//
         if(backBoard[locationFrom.x][locationFrom.y].isWhite!=backBoard[validX][locationFrom.y].isWhite)
        {
            if(((y===3)&&(x%2!=0))||((x%2===0)&&(y===0)))
            {
            }    
            else
            { 
                if(backBoard[x][y].isWhite &&x ==1||!(backBoard[x][y].isWhite)&&x==6){}
                else
                {
                    if(backBoard[SkipRow][Skipcolumn].name=='empty')
                    {
                        validMoves.push(new Location(SkipRow,Skipcolumn));
                        canCapture.setIsCapture(true);   
                    }
                }
            }     
        }    
        }
    }
  
    Skipcolumn=locationFrom.x%2===0?locationFrom.y+1:locationFrom.y-1;
    Skipcolumn=(Skipcolumn>=0 && Skipcolumn<4)?Skipcolumn:null;
      //בדיקת צד שני//
        if(validY!=null)
        {    
            if(backBoard[locationFrom.x][locationFrom.y].name=='queen' && validXQueen != null) 
            {
                if(backBoard[validXQueen][validY].name=='empty')
                {
                    validMoves.push(new Location(validXQueen,validY));
                }
                else
               {
                if((skipRowQueen!=null))
                {
                    if((backBoard[locationFrom.x][locationFrom.y].isWhite!=backBoard[validXQueen][validY].isWhite)
                    &&backBoard[skipRowQueen][Skipcolumn].name=='empty')
                  {
                   validMoves.push(new Location(skipRowQueen,Skipcolumn));
                   canCapture.setIsCapture(true);
                  }
                }  
               }

            } 

            if(validX!=null)
            {
                
                if(backBoard[validX][validY].name=='empty')
                { 
                    validMoves.push(new Location(validX,validY)); 
                }
                else
                {//בדיקה של אכילה
                 if(backBoard[locationFrom.x][locationFrom.y].isWhite!=backBoard[validX][validY].isWhite)
                   {
                    if(backBoard[x][y].isWhite&&x==1||!(backBoard[x][y].isWhite)&&x==6){}
                       else
                       {
                        if(backBoard[SkipRow][Skipcolumn].name=='empty')
                        {   
                         validMoves.push(new Location(SkipRow,Skipcolumn));
                         canCapture.setIsCapture(true);
                        }
                       }
                    } 
                }
            }
        }   
          
        return validMoves;   
}

  }
  class Empty {
    constructor(name) 
    { this.name=name; }
  }
    class Queen extends Pawn {
        constructor(name,isWhite){
            super(name,isWhite);
        } 
}

class Location {
    
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    setLocation(x,y)
    {
      this.x = x;
      this.y = y;
    }

    getLocation ()
    {
    return new Location(this.x,this.y);
    }
  }

class Turn{
    
    constructor(turnNumber) {
        this.turnNumber=turnNumber;
        }

        getTurn()
        {
            return this.turnNumber;
        }
        nextTurn()
        {
            this.turnNumber++;
        }
}
class CanCapture{

    constructor(isCapture) {
        this.isCapture=isCapture;
        }
        getIsCapture()
        {
            return this.isCapture
        }
        setIsCapture(isCapture)
        {
          this.isCapture=isCapture;
        } 
}

class Game{
     constructor(){}
     playGame()
    {    
        let locationFrom=new Location(null,null);
        let doubleCaptureMove=new CanCapture(false);
        let canCapture=new CanCapture(false);
        let turn=new Turn(0);
        creatHtmlBoard();
        let backBoard = Array.from(Array(8), () => new Array(4));
        let frontBoard = Array.from(Array(8), () => new Array(4));
        fillBackBord(backBoard);
        fillFrontBoard(frontBoard);
        onClick(backBoard,frontBoard,turn,canCapture,doubleCaptureMove,locationFrom);
        onClickSquare(backBoard,frontBoard,turn,canCapture,doubleCaptureMove);
        endGameModal("");
        creatTurnBox();
        printTurn(false);
        drawButton();
    }
}

let game=new Game();
game.playGame();


function fillBackBord(backBoard)
{
             
    backBoard[0][0]=new Pawn('pawn',false);backBoard[0][1]=new Pawn('pawn',false);backBoard[0][2]=new Pawn('pawn',false);backBoard[0][3]=new Pawn('pawn',false);
    backBoard[1][0]=new Pawn('pawn',false);backBoard[1][1]=new Pawn('pawn',false);backBoard[1][2]=new Pawn('pawn',false);backBoard[1][3]=new Pawn('pawn',false);
    backBoard[2][0]=new Pawn('pawn',false);backBoard[2][1]=new Pawn('pawn',false);backBoard[2][2]=new Pawn('pawn',false);backBoard[2][3]=new Pawn('pawn',false);
    backBoard[3][0]=new Empty('empty');backBoard[3][1]=new Empty('empty');backBoard[3][2]=new Empty('empty');backBoard[3][3]=new Empty('empty');
    backBoard[4][0]=new Empty('empty');backBoard[4][1]=new Empty('empty');backBoard[4][2]=new Empty('empty');backBoard[4][3]=new Empty('empty');
    backBoard[5][0]=new Pawn('pawn',true);backBoard[5][1]=new Pawn('pawn',true);backBoard[5][2]=new Pawn('pawn',true);backBoard[5][3]=new Pawn('pawn',true);
    backBoard[6][0]=new Pawn('pawn',true);backBoard[6][1]=new Pawn('pawn',true);backBoard[6][2]=new Pawn('pawn',true);backBoard[6][3]=new Pawn('pawn',true);
    backBoard[7][0]=new Pawn('pawn',true);backBoard[7][1]=new Pawn('pawn',true);backBoard[7][2]=new Pawn('pawn',true);backBoard[7][3]=new Pawn('pawn',true);

    return backBoard;

}

function fillBackBordDrow(backBoard)
{
             
    backBoard[0][0]=new Empty('empty');backBoard[0][1]=new Empty('empty');backBoard[0][2]=new Empty('empty');backBoard[0][3]=new Empty('empty');
    backBoard[1][0]=new Pawn('pawn',false);backBoard[1][1]=new Empty('empty');backBoard[1][2]= new Empty('empty');backBoard[1][3]= new Empty('empty');
    backBoard[2][0]= new Pawn('pawn',true);backBoard[2][1]=new Empty('empty');backBoard[2][2]=new Empty('empty');backBoard[2][3]=new Empty('empty');
    backBoard[3][0]=new Empty('empty');backBoard[3][1]=new Empty('empty');backBoard[3][2]=new Empty('empty');backBoard[3][3]=new Empty('empty');
    backBoard[4][0]=new Pawn('pawn',true);backBoard[4][1]=new Empty('empty');backBoard[4][2]=new Empty('empty');backBoard[4][3]=new Empty('empty');
    backBoard[5][0]=new Pawn('pawn',true);backBoard[5][1]=new Pawn('pawn',true);backBoard[5][2]=new Pawn('pawn',true);backBoard[5][3]=new Pawn('pawn',true);
    backBoard[6][0]=new Pawn('pawn',true);backBoard[6][1]=new Pawn('pawn',true);backBoard[6][2]=new Pawn('pawn',true);backBoard[6][3]=new Pawn('pawn',true);
    backBoard[7][0]=new Pawn('pawn',true);backBoard[7][1]=new Pawn('pawn',true);backBoard[7][2]=new Pawn('pawn',true);backBoard[7][3]=new Pawn('pawn',true);

    return backBoard;
}


function hidePreviousValidMoves(validMoves,frontBoard)
{
    
    for(let x=0;x<8;x++)
{
    for(y=0;y<4;y++)
    {
         let currentLocation =false;
         for(let i=0;i<validMoves.length;i++)
         {
            if((validMoves[i].x==x && validMoves[i].y==y))
            {
                currentLocation=true;
            }
         } 
         if(!currentLocation)
           {
                unlightPreviousValidMoves((new Location(x,y)),frontBoard)
           }
    }
}
}

function changeBackBoard (locationTo,frontBoard,backBoard,turn,canCapture,doubleCaptureMove)
 {
    let locationFrom=locateChosenPiece(frontBoard);
    let isWhite=backBoard[locationFrom.x][locationFrom.y].isWhite?true:false;
    let erasePiece=new Location(null,null);
    let coronation=false;
    let burnPawnsIndex=[];

    if(locationFrom!=null)
    {
        let gap=isWhite?locationFrom.x-locationTo.x:locationTo.x-locationFrom.x;
        gap=Math.abs(gap);
        
        burnPawnsIndex=searchForBurnPawns(backBoard,isWhite,canCapture);
        if(backBoard[locationFrom.x][locationFrom.y].name=='pawn')
        {
            backBoard[locationTo.x][locationTo.y]=new Pawn('pawn',isWhite);
        }
        else
        {
            backBoard[locationTo.x][locationTo.y]=new Queen('queen',isWhite);
        }
        
        if(locationTo.x==0 && isWhite)
        {
         backBoard[locationTo.x][locationTo.y]=new Queen('queen',isWhite);
         coronation=true;
        }
        if(locationTo.x==7 && !(isWhite))
        {
         backBoard[locationTo.x][locationTo.y]=new Queen('queen',isWhite);
         coronation=true;
        }

        backBoard[locationFrom.x][locationFrom.y]=new Empty('empty');
        
        if(gap>1)//אכילה//
        {
            let x,y;
            if(locationFrom.x>locationTo.x)
            {
                x=(locationFrom.x)-1;
            }
            else
            {
                x=(locationFrom.x)+1;
            }
            if(locationFrom.x%2===0)
            {
              y=locationFrom.y>locationTo.y?locationFrom.y:locationFrom.y+1;
            }
            else
            {
              y=locationFrom.y>locationTo.y?locationFrom.y-1:locationFrom.y;
            }
            erasePiece.setLocation(x,y);
            backBoard[erasePiece.x][erasePiece.y]=new Empty('empty');
            doubleCaptureMove.setIsCapture(isDubleCapture(locationTo,backBoard,canCapture));  
        }
        
        if(burnPawnsIndex[0]!=null&& gap<2)
        {
            eraseBurnedPawns(burnPawnsIndex,backBoard,locationFrom,gap,locationTo);
        }
        let gameOver;
        gameOver=countPieces(backBoard);
        if(gameOver===null)
        {
          gameOver=isDraw(backBoard,locationTo,canCapture)?'Draw Game':null;
        }
        // locationFrom=doubleCaptureMove.getIsCapture()?
        changeFrontBoard(locationTo,locationFrom,frontBoard,erasePiece,coronation,gameOver,burnPawnsIndex,gap,doubleCaptureMove,backBoard,canCapture,isWhite);


        if(gameOver==null && !doubleCaptureMove.getIsCapture())
        {
            turn.nextTurn();
        }
    }
 }

 function isDubleCapture(locationTo,backBoard,canCapture)
 {
    let validmoves=[];
    validmoves=backBoard[locationTo.x][locationTo.y].findValidMoves(locationTo,backBoard,canCapture);
    if(validmoves[0]!=null && canCapture.getIsCapture()==true)
    {
        return true;
    }
    return false;  
 }

function eraseBurnedPawns(burnPawnsIndex,backBoard,locationFrom,gap,locationTo)
{
    for(let i=0;i<burnPawnsIndex.length;i++)
    {
        if(burnPawnsIndex[i].x===locationFrom.x&&burnPawnsIndex[i].y===locationFrom.y )
          {
             if(gap<2)
                backBoard[locationTo.x][locationTo.y]=new Empty('empty'); 
          }
        else
        {
            backBoard[burnPawnsIndex[i].x][burnPawnsIndex[i].y]=new Empty('empty');
        }
    } 
} 

function searchForBurnPawns(backBoard,isWhite,canCapture)
{
    let burnPawnsIndex=[];
    let validmoves=[];
    for(let x=0;x<8;x++)
    {
        for(let y=0; y<4; y++,canCapture.setIsCapture(false))
        {
            if(!(backBoard[x][y]instanceof Empty)) 
           {
               if(backBoard[x][y].getIsWhite()===isWhite)
                {
                    let pieceLocation=new Location(x,y);
                    validmoves= backBoard[x][y].findValidMoves(pieceLocation,backBoard,canCapture);
                }
               if(validmoves[0]!= null && canCapture.getIsCapture()) 
               {
                burnPawnsIndex.push(new Location(x,y));
               }
           }   
        }
    } 
   return burnPawnsIndex;
}

function isDraw(backBoard,locationTo,posibleCapture)
{
    let validmoves=[];
    for(let x=0;x<8;x++)
    {
        for(let y=0;y<4;y++)
        {
            if(!(backBoard[x][y]instanceof Empty)) 
           {
               if(backBoard[locationTo.x][locationTo.y].isWhite!=backBoard[x][y].isWhite)
                {
                    let pieceLocation=new Location(x,y);
                    validmoves= backBoard[x][y].findValidMoves(pieceLocation,backBoard,posibleCapture);
                }
               if(validmoves[0]!= null)
                return false;
           }   
        }
    } 
    return true;
}



 function countPieces(backBoard)
 {
    let countWhitePices=0;
    let countBlackPices=0;
    for(let x=0;x<8;x++)
    {
        for(let y=0;y<4;y++)
        {
            if(!(backBoard[x][y]instanceof Empty)) 
           {
               if(backBoard[x][y].isWhite)
               {
                countWhitePices++
               }
               else
               {
                countBlackPices++
               }
           }   
        }
    } 
    if(countBlackPices===0)
    {
      return 'White Wins!'
    }
    if(countWhitePices===0)
    {
      return 'Black Wins!'
    }
    return null;
 }