let allPieces = [];
let whitePieces = [];
let brownPieces = [];
let boardDivs = [];
let squares = [];
let pieceDivs = [];
let numOfPieces=0;
let numOfWhitePieces=0;
let numOfBrownPieces=0;
let eat = false;
let otherPieceCanEat = false;
let pieceWhichCanEat = [];
let eatMade = false;
let turn = true; // white turn
let playerPieces = [];
let h1GameEndContent = "";
let pGameEndContent = "";
let pieceClicked = {
    id: -1,
    boardPosition: -1,
    isKing: false,
    isWhite: true,
    moveUpRight: false,
    moveUpLeft: false,
    moveDownRight: false,
    moveDownLeft: false,
    eatUpRight: false,
    eatUpLeft: false,
    eatDownRight: false,
    eatDownLeft: false,
}

innitializeBoard();

function innitializeBoard(){
    const board = document.getElementById('board');
    numOfWhitePieces=0;
    numOfBrownPieces=0;
    for(let y=0; y<8; y++)   
        for(let x=0; x<8; x++)
        {
            const square = document.createElement('div'); 
            squares.push(square);
            let boardDiv={};    
            if(y%2===0)
            {
                square.className = x%2===0?'white':'black'; 
                boardDiv.isEmpty=true;
                boardDivs.push(boardDiv);
                board.appendChild(square);
                if(square.className==='black' && (y<3 || y>4)){
                    const pieceDiv = document.createElement('div');
                    pieceDivs.push(pieceDiv);
                    let piece={};
                    pieceDiv.className = 'piece';
                    piece.isKing=false;            
                    if(y<3){
                        pieceDiv.classList.add('brown');
                        piece.isWhite=false;
                        brownPieces.push(piece);
                        piece.id = numOfPieces;
                        numOfBrownPieces++;
                        numOfPieces++;       
                    }
                    else{
                        pieceDiv.classList.add('white');
                        piece.isWhite=true;
                        whitePieces.push(piece);
                        piece.id = numOfPieces;
                        numOfWhitePieces++;
                        numOfPieces++;
                    }         
                    square.appendChild(pieceDiv);
                    allPieces.push(piece);            
                    boardDiv.isEmpty=false;    
                }
            }
            else
            {
                square.className = x%2===0?'black':'white';
                boardDiv.isEmpty=true;
                boardDivs.push(boardDiv);
                board.appendChild(square);
                if(square.className==='black' && (y<3 || y>4)){
                    const pieceDiv = document.createElement('div');
                    pieceDivs.push(pieceDiv);
                    let piece={};
                    pieceDiv.className = 'piece';
                    piece.isKing=false;           
                    if(y<3){
                        pieceDiv.classList.add('brown');
                        piece.isWhite=false;
                        brownPieces.push(piece);
                        piece.id = numOfPieces;
                        numOfBrownPieces++;
                        numOfPieces++;
                    }
                    else{
                        pieceDiv.classList.add('white');
                        piece.isWhite=true;
                        whitePieces.push(piece);
                        piece.id = numOfPieces;
                        numOfWhitePieces++;
                        numOfPieces++;
                    }
                    square.appendChild(pieceDiv);
                    allPieces.push(piece);
                    boardDiv.isEmpty=false;
                }
            }       
        }
        for(let i=0, j=0; i<boardDivs.length && j<allPieces.length; i++)
        {
            boardDivs[i].location = i;
            squares[i].id = i;
            if(boardDivs[i].isEmpty===false)
            {
                
                allPieces[j].location = i;
                pieceDivs[j].id = j;
                j++;
            }
        }     
}

function isPlayerPiecesWhite(id) {
    if (turn) {
        playerPieces = whitePieces;
    } else {
        playerPieces = brownPieces;
    }
    changeBordersToDefault(id);
}

function changeBordersToDefault(id) {
    for (let i = 0; i < pieceDivs.length; i++) {
        pieceDivs[i].classList.remove('pieceIsMoveable');
    }
    resetClickedPiece(id);
    getClickedPiece(id);
}

function resetClickedPiece(eatMade) {
    pieceClicked.id = -1;
    pieceClicked.isKing = false;
    pieceClicked.boardPosition = -1;
    pieceClicked.isWhite = true;
    pieceClicked.moveUpRight = false;
    pieceClicked.moveUpLeft = false;
    pieceClicked.moveDownRight = false;
    pieceClicked.moveDownLeft = false;
    pieceClicked.eatUpRight = false;
    pieceClicked.eatUpLeft = false;
    pieceClicked.eatDownRight = false;
    pieceClicked.eatDownLeft = false;
}

function getClickedPiece(id) {
    pieceClicked.id = parseInt(id);
    for(let j=0;j<allPieces.length; j++)  {
        if(allPieces[j].id == id)
        pieceClicked.boardPosition = parseInt(allPieces[j].location);
    }   
    pieceClicked.isWhite = pieceClicked.id>=12?true:false;
    isPieceKing();
}


function isPieceKing() {
    let clickedId = document.getElementById(pieceClicked.id).id;
    for(let i=0; i<pieceDivs.length; i++) {
        if(pieceDivs[i].id == clickedId) {
            if((pieceDivs[i].classList.contains("kingWhitePiece"))
             || (pieceDivs[i].classList.contains("kingBrownPiece"))) {
                pieceClicked.isKing = true;
            } else {
                pieceClicked.isKing = false;
            }
        }
    } 
    isMovePossible();
}

function isMovePossible() {
    for(let i=0; i<squares.length; i++) {
        squares[i].classList.remove('destinationIsAvailable');
    }

    if ((pieceClicked.boardPosition < 57) && !turn &&
        boardDivs[pieceClicked.boardPosition + 7].isEmpty === true && 
        squares[pieceClicked.boardPosition + 7].classList.contains("white") !== true) {
            pieceClicked.moveDownLeft = true;
            squares[pieceClicked.boardPosition + 7].classList.add('destinationIsAvailable');
    }
    if ((pieceClicked.boardPosition < 55) && !turn &&
        boardDivs[pieceClicked.boardPosition + 9].isEmpty === true && 
        squares[pieceClicked.boardPosition + 9].classList.contains("white") !== true) {
            pieceClicked.moveDownRight = true;
            squares[pieceClicked.boardPosition + 9].classList.add('destinationIsAvailable');
    }
    if ((pieceClicked.boardPosition > 6) && turn &&
        boardDivs[pieceClicked.boardPosition - 7].isEmpty === true && 
        squares[pieceClicked.boardPosition - 7].classList.contains("white") !== true) {
            pieceClicked.moveUpRight = true;
            squares[pieceClicked.boardPosition - 7].classList.add('destinationIsAvailable');
    }
    if ((pieceClicked.boardPosition > 8) && turn &&
        boardDivs[pieceClicked.boardPosition - 9].isEmpty === true && 
        squares[pieceClicked.boardPosition - 9].classList.contains("white") !== true) {
            pieceClicked.moveUpLeft = true;
            squares[pieceClicked.boardPosition - 9].classList.add('destinationIsAvailable');
    }
    isEatingMovePossible();
}

function isEatingMovePossible() {
        eat = false;
        otherPieceCanEat = false;
        pieceWhichCanEat = [];

        if ((pieceClicked.boardPosition < 50)
        && (boardDivs[pieceClicked.boardPosition + 14].isEmpty === true) 
        && (squares[pieceClicked.boardPosition + 14].classList.contains("white") === false)
        && (boardDivs[pieceClicked.boardPosition + 7].isEmpty === false)
        && (((parseInt(squares[pieceClicked.boardPosition + 7].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[pieceClicked.boardPosition + 7].children[0].id) < 12) && turn))) { 
            pieceClicked.eatDownLeft = true;
            eat = true;
            squares[pieceClicked.boardPosition + 14].classList.add('destinationIsAvailable');
        }
        if ((pieceClicked.boardPosition < 46)
        && (boardDivs[pieceClicked.boardPosition + 18].isEmpty === true) 
        && (squares[pieceClicked.boardPosition + 18].classList.contains("white") === false)
        && (boardDivs[pieceClicked.boardPosition + 9].isEmpty === false)
        && (((parseInt(squares[pieceClicked.boardPosition + 9].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[pieceClicked.boardPosition + 9].children[0].id) < 12) && turn))) {
            pieceClicked.eatDownRight = true;
            eat = true;
            squares[pieceClicked.boardPosition + 18].classList.add('destinationIsAvailable');
        }
        if ((pieceClicked.boardPosition > 13)
        && (boardDivs[pieceClicked.boardPosition - 14].isEmpty === true) 
        && (squares[pieceClicked.boardPosition - 14].classList.contains("white") === false)
        && (boardDivs[pieceClicked.boardPosition - 7].isEmpty === false)
        && (((parseInt(squares[pieceClicked.boardPosition - 7].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[pieceClicked.boardPosition - 7].children[0].id) < 12) && turn))) {
            pieceClicked.eatUpRight = true;
            eat = true;
            squares[pieceClicked.boardPosition - 14].classList.add('destinationIsAvailable');
        }
        if ((pieceClicked.boardPosition > 17)
        && (boardDivs[pieceClicked.boardPosition - 18].isEmpty === true) 
        && (squares[pieceClicked.boardPosition - 18].classList.contains("white") === false)
        && (boardDivs[pieceClicked.boardPosition - 9].isEmpty === false)
        && (((parseInt(squares[pieceClicked.boardPosition - 9].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[pieceClicked.boardPosition - 9].children[0].id) < 12) && turn))) {
            pieceClicked.eatUpLeft = true;
            eat = true;
            squares[pieceClicked.boardPosition - 18].classList.add('destinationIsAvailable');
        }

        // checks if other piece can eat
        let pieceOnCheck = null;
        for(let i=0; i<boardDivs.length; i++)
        {
            if(boardDivs[i].isEmpty === false)
            {
                for(let j=0; j<allPieces.length; j++)
                    if(allPieces[j].location === boardDivs[i].location) {
                        pieceOnCheck = allPieces[j];

                if((boardDivs[i].location < 50)
                &&  (boardDivs[i + 14].isEmpty === true) 
                && (squares[i + 14].classList.contains("white") === false)
                && (boardDivs[i + 7].isEmpty === false)
                && (squares[i].children.length !== 0)
                && (((parseInt(squares[i].children[0].id) >= 12)
                && (parseInt(squares[i + 7].children[0].id) < 12))
                || ((parseInt(squares[i].children[0].id) < 12)
                && (parseInt(squares[i + 7].children[0].id) >= 12)))) {
                    otherPieceCanEat = true;
                    pieceWhichCanEat.push(pieceOnCheck);
                }

                if ((boardDivs[i].location < 46)
                && (boardDivs[i + 18].isEmpty === true) 
                && (squares[i + 18].classList.contains("white") === false)
                && (boardDivs[i + 9].isEmpty === false)
                && (squares[i].children.length !== 0)
                && (((parseInt(squares[i].children[0].id) >= 12)
                && (parseInt(squares[i + 9].children[0].id) < 12))
                || ((parseInt(squares[i].children[0].id) < 12)
                && (parseInt(squares[i + 9].children[0].id) >= 12)))) {    
                    otherPieceCanEat = true;
                    pieceWhichCanEat.push(pieceOnCheck);
                }

                if ((boardDivs[i].location > 13)
                && (boardDivs[i - 14].isEmpty === true) 
                && (squares[i - 14].classList.contains("white") === false)
                && (boardDivs[i - 7].isEmpty === false)
                && (squares[i].children.length !== 0)
                && (((parseInt(squares[i].children[0].id) >= 12)
                && (parseInt(squares[i - 7].children[0].id) < 12))
                || ((parseInt(squares[i].children[0].id) < 12)
                && (parseInt(squares[i - 7].children[0].id) >= 12)))) {    
                    otherPieceCanEat = true;
                    pieceWhichCanEat.push(pieceOnCheck);
                }

                if ((boardDivs[i].location > 17)
                && (boardDivs[i - 18].isEmpty === true) 
                && (squares[i - 18].classList.contains("white") === false)
                && (boardDivs[i - 9].isEmpty === false)
                && (squares[i].children.length !== 0)
                && (((parseInt(squares[i].children[0].id) >= 12)
                && (parseInt(squares[i - 9].children[0].id) < 12))
                || ((parseInt(squares[i].children[0].id) < 12)
                && (parseInt(squares[i - 9].children[0].id) >= 12)))) {    
                    otherPieceCanEat = true;
                    pieceWhichCanEat.push(pieceOnCheck);
                }
            } 
        }
    } 
    restrictMovements(eat, otherPieceCanEat, pieceWhichCanEat);
}

function restrictMovements(eat, otherPieceCanEat, pieceWhichCanEat) {
    if (!turn) {
        pieceClicked.moveUpRight = false;
        pieceClicked.moveUpLeft = false; 
    } else {
        pieceClicked.moveDownRight = false;
        pieceClicked.moveDownLeft = false;
    }
    
    if (pieceClicked.isKing) { 
        pieceClicked.moveUpRight = true;
        pieceClicked.moveUpLeft = true;
        pieceClicked.moveDownRight = true;
        pieceClicked.moveDownLeft = true;
    }

    if(pieceClicked.isWhite===false && turn) {
        pieceClicked.moveUpRight = false;
        pieceClicked.moveUpLeft = false;
        pieceClicked.eatUpRight = false;
        pieceClicked.eatUpLeft = false; 
        pieceClicked.moveDownRight = false;
        pieceClicked.moveDownLeft = false;
        pieceClicked.eatDownRight = false;
        pieceClicked.eatDownLeft = false;
    } 

    if(pieceClicked.isWhite && !turn) {
        pieceClicked.moveUpRight = false;
        pieceClicked.moveUpLeft = false;
        pieceClicked.eatUpRight = false;
        pieceClicked.eatUpLeft = false; 
        pieceClicked.moveDownRight = false;
        pieceClicked.moveDownLeft = false;
        pieceClicked.eatDownRight = false;
        pieceClicked.eatDownLeft = false;
    } 
        addBorder(eat, otherPieceCanEat, pieceWhichCanEat);
    }

function addBorder(eat, otherPieceCanEat, pieceWhichCanEat) {
    if (pieceClicked.moveUpRight || pieceClicked.moveUpLeft || pieceClicked.eatUpRight || pieceClicked.eatUpLeft
    || pieceClicked.moveDownRight || pieceClicked.moveDownLeft || pieceClicked.eatDownRight || pieceClicked.eatDownLeft) {
        let clickedId = document.getElementById(pieceClicked.id).id;
        for(let i=0; i<pieceDivs.length; i++) {
            if(pieceDivs[i].id == clickedId)
                pieceDivs[i].classList.add('pieceIsMoveable');
        }
    
        for (let i = 0; i < squares.length; i++) {
            if((squares[i].children.length === 0) &&
            (squares[i].classList.contains('black')))
                squares[i].setAttribute("onclick","addDestsClick(parseInt(this.id), eat, otherPieceCanEat, pieceWhichCanEat)");  
        } 
    } else {
        return;
    }
}

function addDestsClick(dest, eat, otherPieceCanEat, pieceWhichCanEat) {
    eatMade = false;
    
    if ((pieceClicked.moveDownLeft) && (pieceClicked.boardPosition < 57)) {
        if(dest === pieceClicked.boardPosition + 7)
        move(7, eat, otherPieceCanEat, pieceWhichCanEat);
    }
    if ((pieceClicked.moveDownRight) && (pieceClicked.boardPosition < 55)) {
        if(dest === pieceClicked.boardPosition + 9)
        move(9, eat, otherPieceCanEat, pieceWhichCanEat);
    }
    if ((pieceClicked.eatDownLeft) && (pieceClicked.boardPosition < 50)) {
        if(dest === pieceClicked.boardPosition + 14) {
        eatMade = true;
        move(14, eat, otherPieceCanEat, pieceWhichCanEat, eatMade);
        }
    }
    if ((pieceClicked.eatDownRight) && (pieceClicked.boardPosition < 46)) {
        if(dest === pieceClicked.boardPosition + 18) {
        eatMade = true;
        move(18, eat, otherPieceCanEat, pieceWhichCanEat, eatMade);
        }
    }
    if ((pieceClicked.moveUpRight) && (pieceClicked.boardPosition > 6)) {
        if(dest === pieceClicked.boardPosition - 7)
        move(-7, eat, otherPieceCanEat, pieceWhichCanEat);
    }
    if ((pieceClicked.moveUpLeft) && (pieceClicked.boardPosition > 8)) {
        if(dest === pieceClicked.boardPosition - 9)
        move(-9, eat, otherPieceCanEat, pieceWhichCanEat);
    }
    if ((pieceClicked.eatUpRight) && (pieceClicked.boardPosition > 13)) {
        if(dest === pieceClicked.boardPosition - 14) {
        eatMade = true;
        move(-14, eat, otherPieceCanEat, pieceWhichCanEat, eatMade);
        }
    }
    if ((pieceClicked.eatUpLeft) && (pieceClicked.boardPosition > 17)) {
        if(dest === pieceClicked.boardPosition - 18) {
        eatMade = true;
        move(-18, eat, otherPieceCanEat, pieceWhichCanEat, eatMade);
        }
    }
}


function move(number, eat, otherPieceCanEat, pieceWhichCanEat, eatMade) {
        for(let i=0; i<pieceDivs.length; i++) {
            pieceDivs[i].classList.remove('pieceIsMoveable');
        }
        for(let i=0; i<squares.length; i++) {
            squares[i].classList.remove('destinationIsAvailable');
        }

        if(!eat && otherPieceCanEat && !eatMade) { // eat is possible but another move made
            for(let j=pieceWhichCanEat.length-1; j>=0; j--)
            {
            const pieceToRemoveId = parseInt(pieceWhichCanEat[j].id);
            for(let i = 0; i<whitePieces.length; i++)
            {
                parseInt(whitePieces[i].id);
                if((whitePieces[i].id == pieceToRemoveId) &&
                ((turn && pieceWhichCanEat[j].isWhite) || (!turn && pieceWhichCanEat[j].isWhite === false))) {
                    whitePieces.splice(i,1);
                    numOfWhitePieces--;
                }
            }
            for(let i = 0; i<brownPieces.length; i++)
            {
                parseInt(brownPieces[i].id);
                if((brownPieces[i].id == pieceToRemoveId) &&
                ((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))) {
                   brownPieces.splice(i,1);
                   numOfBrownPieces--;
                }
            }

            for(let i = 0; i<pieceDivs.length; i++)
            {
                parseInt(pieceDivs[i].id);
                if((pieceDivs[i].id == pieceToRemoveId) &&
                ((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))) {
                    for(let z=0; z<squares.length; z++) {
                        if(squares[z].children.length!==0)
                            if(squares[z].children[0].id == pieceToRemoveId)
                            squares[z].children[0].remove();
                    }
                    pieceDivs.splice(i,1);     
                }
            }

            for(let i = 0; i<allPieces.length; i++)
            {
                parseInt(allPieces[i].id);
                if((allPieces[i].id == pieceToRemoveId) &&
                ((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))) {
                    allPieces.splice(i,1);
                }
            }

            if((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))
            {
                boardDivs[pieceWhichCanEat[j].location].isEmpty=true; 
                pieceWhichCanEat.splice(j,1)
            }
        }
        squares[pieceClicked.boardPosition + number].appendChild(squares[pieceClicked.boardPosition].children[0]);
        boardDivs[pieceClicked.boardPosition].isEmpty=true;
        boardDivs[pieceClicked.boardPosition + number].isEmpty=false;
        pieceClicked.boardPosition = pieceClicked.boardPosition + number;
        for(let i = 0; i<allPieces.length; i++) {
            if(allPieces[i].id == pieceClicked.id)
                allPieces[i].location = pieceClicked.boardPosition;
        }   
    }
        else if(eat && !eatMade)
        {
           for(let j=pieceWhichCanEat.length-1; j>=0; j--)
            {
            const pieceToRemoveId = parseInt(pieceWhichCanEat[j].id);
            for(let i = 0; i<whitePieces.length; i++)
            {
                parseInt(whitePieces[i].id);
                if((whitePieces[i].id == pieceToRemoveId) &&
                ((turn && pieceWhichCanEat[j].isWhite) || (!turn && pieceWhichCanEat[j].isWhite === false))) {
                    whitePieces.splice(i,1);
                    numOfWhitePieces--;
                }
            }
            for(let i = 0; i<brownPieces.length; i++)
            {
                parseInt(brownPieces[i].id);
                if((brownPieces[i].id == pieceToRemoveId) &&
                ((turn && pieceWhichCanEat[j].isWhite) || (!turn && pieceWhichCanEat[j].isWhite === false))) {
                   brownPieces.splice(i,1);
                   numOfBrownPieces--;
                }
            }

            for(let i = 0; i<pieceDivs.length; i++)
            {
                parseInt(pieceDivs[i].id);
                if((pieceDivs[i].id == pieceToRemoveId) &&
                ((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))) {
                    for(let z=0; z<squares.length; z++) {
                        if(squares[z].children.length!==0)
                            if(squares[z].children[0].id == pieceToRemoveId)
                            squares[z].children[0].remove();
                    }
                    pieceDivs.splice(i,1); 
                }
            }

            for(let i = 0; i<allPieces.length; i++)
            {
                parseInt(allPieces[i].id);
                if((allPieces[i].id == pieceToRemoveId) &&
                ((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))) {
                    allPieces.splice(i,1);
                }
            }

            if((turn && pieceWhichCanEat[j].isWhite) || (!turn && pieceWhichCanEat[j].isWhite === false))
            {
                squares[pieceWhichCanEat[j].location].innerHTML = "";
                boardDivs[pieceWhichCanEat[j].location].isEmpty=true; 
                pieceWhichCanEat.splice(j,1);
            }

            for(let z=0; z<squares.length; z++) {
                if(squares[z].children.length!==0)
                    if(squares[z].children[0].id ==  pieceClicked.id)
                        squares[z].children[0].remove();
            }
        }

        for(let i = 0; i<whitePieces.length; i++)
        {
            parseInt(whitePieces[i].id);
            if(whitePieces[i].id == pieceClicked.id) {
                whitePieces.splice(i,1);
                numOfWhitePieces--;
        }
        }
    for(let i = 0; i<brownPieces.length; i++)
    {
        parseInt(brownPieces[i].id);
        if(brownPieces[i].id == pieceClicked.id) {
           brownPieces.splice(i,1);
           numOfBrownPieces--;
        }
    }

    for(let i = 0; i<pieceDivs.length; i++)
    {
        parseInt(pieceDivs[i].id);
        if((pieceDivs[i].id ==  pieceClicked.id) &&
        ((turn && (pieceWhichCanEat[j].isWhite)) || (!turn && (pieceWhichCanEat[j].isWhite === false)))) {
            for(let z=0; z<squares.length; z++) {
                if(squares[z].children.length!==0)
                    if(squares[z].children[0].id ==  pieceClicked.id)
                        squares[z].children[0].remove();
                    }
        pieceDivs.splice(i,1);           
        }
    }

    for(let i = 0; i<allPieces.length; i++)
    {
        parseInt(allPieces[i].id);
        if(allPieces[i].id == pieceClicked.id)
            allPieces.splice(i,1);            
    }
    }
        
    else if(((eat) && eatMade ) || (!eat && !otherPieceCanEat && !eatMade)){ // eat is possible and made, or eat is not possible
           boardDivs[pieceClicked.boardPosition].isEmpty=true;

            for(let i = 0; i<pieceDivs.length; i++)
            {
                parseInt(pieceDivs[i].id);
                if(pieceDivs[i].id == pieceClicked.id)
                {
                    squares[pieceClicked.boardPosition + number].appendChild(squares[pieceClicked.boardPosition].children[0]);
                }
            }
    
            boardDivs[pieceClicked.boardPosition + number].isEmpty=false;
            pieceClicked.boardPosition = pieceClicked.boardPosition + number;
            for(let i = 0; i<allPieces.length; i++) {
                if(allPieces[i].id == pieceClicked.id)
                    allPieces[i].location = pieceClicked.boardPosition;
            }
    }
    
        let newPosition = pieceClicked.boardPosition
        if (number === 14 || number === -14 || number === 18 || number === -18) {
            makeKingAndRemoveEatenPiece(newPosition, newPosition-number + number / 2, eatMade);
        } else {
            makeKingAndRemoveEatenPiece(newPosition);
        }    
}


function makeKingAndRemoveEatenPiece(newPosition, removePiece, eatMade) {
    if(boardDivs[newPosition].isEmpty===false) {
        if ((turn === false) && (pieceClicked.id < 12) && (parseInt(boardDivs[newPosition].location) >= 57)) {
        for(let i=0; i<pieceDivs.length; i++) {
            if(pieceDivs[i].id == pieceClicked.id)
            pieceDivs[i].classList.add("kingBrownPiece")
        }
        pieceClicked.isKing = true;
        }   
        if (turn &&  (pieceClicked.id >= 12) && (parseInt(boardDivs[newPosition].location) <= 7)) {
        for(let i=0; i<pieceDivs.length; i++) {
            if(pieceDivs[i].id == pieceClicked.id)
            pieceDivs[i].classList.add("kingWhitePiece")
        }
        pieceClicked.isKing = true;
        }
    }
    
    // remove eaten piece
    if (removePiece) {
        boardDivs[removePiece].isEmpty=true;
        squares[removePiece].innerHTML = "";

        if (turn && pieceClicked.id >= 12) {
            for(let i = 0; i<brownPieces.length; i++)
            {
                parseInt(brownPieces[i].id);
                if(brownPieces[i].location == boardDivs[removePiece].location)
                {
                    brownPieces.splice(i,1);
                numOfBrownPieces--;
                }
            }
        }
        if (turn === false && pieceClicked.id < 12) {    
            for(let i = 0; i<whitePieces.length; i++)
            {
            parseInt(whitePieces[i].id);
            if(whitePieces[i].location == boardDivs[removePiece].location)
                whitePieces.splice(i,1);
                numOfWhitePieces--;
            }
        }

        for(let i = 0; i<pieceDivs.length; i++)
        {
            parseInt(pieceDivs[i].id);
            if(pieceDivs[i].location == boardDivs[removePiece].location) 
                pieceDivs.splice(i,1);    
        }

            for(let i = 0; i<allPieces.length; i++)
            {
                parseInt(allPieces[i].id);
                if(allPieces[i].location == boardDivs[removePiece].location)
                    allPieces.splice(i,1);
                
            }


    isEatingAgainPossible();
}
    else { // eat not made
        resetClickedPiece();
        eatPossible = false;
        isPlayerWon(eatMade, eatPossible);
    }
}

function isEatingAgainPossible() {
    eatPossible = false;
    
        for (let i = 0; i < playerPieces.length; i++) {
            if ((playerPieces[i].location < 50)
        && (boardDivs[playerPieces[i].location + 14].isEmpty === true) 
        && (squares[playerPieces[i].location + 14].classList.contains("white") === false)
        && (boardDivs[playerPieces[i].location + 7].isEmpty === false)
        && (((parseInt(squares[playerPieces[i].location + 7].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[playerPieces[i].location + 7].children[0].id) < 12) && turn))) {
            eatPossible = true;
        }
        if ((playerPieces[i].location < 46)
        && (boardDivs[playerPieces[i].location + 18].isEmpty === true) 
        && (squares[playerPieces[i].location + 18].classList.contains("white") === false)
        && (boardDivs[playerPieces[i].location + 9].isEmpty === false)
        && (((parseInt(squares[playerPieces[i].location + 9].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[playerPieces[i].location + 9].children[0].id) < 12) && turn))) {
            eatPossible = true;
        }
        if ((playerPieces[i].location > 13)
        && (boardDivs[playerPieces[i].location - 14].isEmpty === true) 
        && (squares[playerPieces[i].location - 14].classList.contains("white") === false)
        && (boardDivs[playerPieces[i].location - 7].isEmpty === false)
        && (((parseInt(squares[playerPieces[i].location - 7].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[playerPieces[i].location - 7].children[0].id) < 12) && turn))) {
            eatPossible = true;
        }
        if ((playerPieces[i].location > 17)
        && (boardDivs[playerPieces[i].location - 18].isEmpty === true) 
        && (squares[playerPieces[i].location - 18].classList.contains("white") === false)
        && (boardDivs[playerPieces[i].location - 9].isEmpty === false)
        && (((parseInt(squares[playerPieces[i].location - 9].children[0].id) >= 12) && !turn)
        || ((parseInt(squares[playerPieces[i].location - 9].children[0].id) < 12) && turn))) {
            eatPossible = true;
        }
        }
    
    resetClickedPiece();
    isPlayerWon(eatMade, eatPossible);
}

function isPlayerWon(eatMade, eatPossible) {
    h1GameEndContent = "";
    pGameEndContent = "";

    if (brownPieces.length === 0) {
        h1GameEndContent = "White player wins!";
        pGameEndContent = "Game ended.";
        endGameModal(h1GameEndContent, pGameEndContent);
    }
    if (whitePieces.length === 0) {
        h1GameEndContent = "Black player wins!";
        pGameEndContent = "Game ended.";
        endGameModal(h1GameEndContent, pGameEndContent);
    }

     if(eatMade && eatPossible) 
        changePlayer(eatMade, eatPossible); // turn will not change
     else
        changePlayer();
}


// Switches players turn
function changePlayer(eatMade, eatPossible) {
    if (turn && !eatMade) {
        turn = false;
    } else if (!turn && !eatMade){
        turn = true;
    }
    if(turn && eatMade && eatPossible) // dont switch turn if eating again is possible
        turn = true;
    else if(!turn && eatMade && eatPossible)
        turn = false;
        
    addOnClickEvents();
    addButtonEvents();
}

addOnClickEvents();
addButtonEvents();

function addButtonEvents() {
    h1GameEndContent = (turn?'Black':'White') + " player wins!";
    pGameEndContent = "Game ended.";
    const resignButton = document.getElementById('resignButton');
    const drawButton = document.getElementById('drawButton');
    resignButton.setAttribute("onclick", "endGameModal(h1GameEndContent, pGameEndContent)");
    drawButton.setAttribute("onclick", "showDrawModal()");
}

function showDrawModal() {
    const modalBackground = document.getElementById('modalBackground');
    const modalDiv = document.getElementById('modalDiv');
    const headline = document.getElementById('headline');
    const paragraph = document.getElementById('paragraph');
    const buttonsC = document.getElementById('buttonsContainer');
    const yesButton = document.getElementById('yes');
    const noButton = document.getElementById('no');
    const resetButton = document.getElementById('reset');

    headline.innerHTML = "Draw suggestion";
    paragraph.innerHTML = "Are you sure you want to end the game with a draw?";

    modalBackground.classList.remove('none');
    modalDiv.classList.remove('none');
    buttonsC.classList.remove('none');
    yesButton.classList.remove('none');
    noButton.classList.remove('none');
    resetButton.style.zIndex="-1";

    modalBackground.addEventListener("click", ()=> {
        modalBackground.classList.add('none');
        buttonsC.classList.add('none');
        yesButton.classList.add('none');
        noButton.classList.add('none');
        resetButton.style.zIndex="2";
    })

    modalDiv.addEventListener("click", (event)=> {
        event.stopPropagation();
    })

    yesButton.addEventListener("click", (event)=> {
        event.stopPropagation();
        modalBackground.classList.add('none');
        buttonsC.classList.add('none');
        yesButton.classList.add('none');
        noButton.classList.add('none');
        resetButton.style.zIndex="2";
        h1Content = "its a draw!";
        pContent = "Game ended.";
        endGameModal(h1Content, pContent);
    })

    noButton.addEventListener("click", (event)=> {
        event.stopPropagation();
        modalBackground.classList.add('none');
        buttonsC.classList.add('none');
         yesButton.classList.add('none');
         noButton.classList.add('none');
    })

}

function endGameModal(h1Content, pContent) {
    const modalBackground = document.getElementById('modalBackground');
    const modalDiv = document.getElementById('modalDiv');
    const headline = document.getElementById('headline');
    const paragraph = document.getElementById('paragraph');
    const buttonsC = document.getElementById('buttonsContainer');
    const resetButton = document.getElementById('reset');

    headline.innerHTML = h1Content;
    paragraph.innerHTML = pContent; 

    modalBackground.classList.remove('none');
    modalDiv.classList.remove('none');
    headline.classList.remove('none');
    paragraph.classList.remove('none');
    buttonsC.style.zIndex="-1";
    resetButton.style.zIndex="2";
    
    // 
    modalBackground.addEventListener("click", ()=> {
    modalBackground.classList.add('none');
    buttonsC.style.zIndex="2";
})
    modalDiv.addEventListener("click", (event)=> {
        event.stopPropagation();
    })

    resetButton.addEventListener("click", (event)=> {
        modalBackground.classList.add('none');
        buttonsC.style.zIndex="2";
        endGame();
    })
}

function endGame() {
    window.location.reload();
}

function addOnClickEvents(){
    for (let i = 0; i < squares.length; i++) {
        if(squares[i].children.length !== 0)
            squares[i].children[0].setAttribute("onclick","isPlayerPiecesWhite(this.id)"); 
    }
}