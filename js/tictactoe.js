$(document).ready(function(){
    
    let player1Possitions = [];
    let player2Possitions = [];
    let turns = 0;
    let winner = "";
    let player1WinningCount = 0;
    let player2WinningCount = 0;
    let possiblities = [['1','2','3'],['4','5','6'],['7','8','9'],['1','5','9'],['1','4','7'],['3','5','7'],['3','6','9'],['2','5','8'],['3','6','9']];
    $('.reset').on('click',clearBoard);
    $('#table td').on('click',tapped);
    function tapped(){
        if(this.class === 'x'|| this.class === 'o'){
            alert('This position is alredy occupied');
        }else{
            turns ++ 
            if(winner !== ""){
                clearBoard();
            }
            if(turns % 2 === 0){
                this.innerHTML = 'x';
                $(this).addClass('x');
                player1Possitions.push(this.id);
                //console.log(player1Possitions);
                statusOfWinning();
            }else{
                this.innerHTML = 'o';
                $(this).addClass('o');
                player2Possitions.push(this.id);
                statusOfWinning();
            }
        }
        if(turns === 9){
            if(winner === ""){
                alert('Its a tie game');
            }
            
        }
        
    }
    function statusOfWinning(){
        for(let i = 0; i < possiblities.length; i++){
            for(let j = 0 ; j < possiblities[i].length; j++){
                if(player1Possitions.some(r=> possiblities[i].includes(r))){
                    let id0 = '#' + possiblities[i][0];
                    let id1 = '#' + possiblities[i][1];
                    let id2 = '#' + possiblities[i][2];
                    if($(id0).text() === "x" && $(id1).text() === 'x' && $(id2).text() === 'x' & winner === ""){
                        winner = "x";
                        $(id0).addClass('markIt');
                        $(id1).addClass('markIt');
                        $(id2).addClass('markIt');
                        player1WinningCount++;
                        $('span.score1').text(player1WinningCount);
                        $('.winner').text("player1 has won the game");
                        //clearBoard();
                        break;
                    }
                    
                }
                if(player2Possitions.some(r=> possiblities[i].includes(r))){
                    let id0 = '#' + possiblities[i][0];
                    let id1 = '#' + possiblities[i][1];
                    let id2 = '#' + possiblities[i][2];
                    if($(id0).text() === "o" && $(id1).text() === 'o' && $(id2).text() === 'o' && winner === ""){
                        winner = 'o';
                        $(id0).addClass('markIt');
                        $(id1).addClass('markIt');
                        $(id2).addClass('markIt');
                        player2WinningCount++;
                        $('span.score2').text(player2WinningCount); 
                        $('.winner').text("player1 has won the game");
                        //clearBoard();
                        break;
                    }

                }
            }
        }
    }
   function clearBoard(){
             
       
        if($(confirm('Do you wanna restart the game?'))){
            $('td.o').empty();
            $('td.x').empty();
            $('td').removeClass('o');
            $('td').removeClass('x');
            $('td').removeClass('markIt')
            turns = 0;
            winner = "";
            $('.winner').text("");

        }
       
       
       
   }

});