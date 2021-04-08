$(document).ready(function () {
    var player1;
    var player2;
    let player1Possitions = [];
    let player2Possitions = [];
    let turns = 0;
    let winner = false;
    let player1WinningCount = 0;
    let player2WinningCount = 0;
    let possiblities = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['1', '5', '9'], ['1', '4', '7'], ['3', '5', '7'], ['3', '6', '9'], ['2', '5', '8'], ['3', '6', '9']];
    $('.reset').on('click', clearBoard);

    $('div.player1Images > img').click(function () {
        
        player1 = $(this).attr('src');
        $('.fillChoice1').addClass('visibleImage');
        $('.visibleImage').removeClass('fillChoice1');
        $('.visibleImage').attr('src', './' + player1);
        //removing text about picking pic
        $('.player1Images > div > p > span').text("");

    });
    $('div.player2Images>img').click(function () {
        
        player2 = $(this).attr('src');
        $('.fillChoice2').addClass('visibleImage1');
        $('.visibleImage1').removeClass('fillChoice2');
        $('.visibleImage1').attr('src', './' + player2);
        //removing text about picking pic
        $('.player2Images > div > p > span').text("");

    });
    $('#table td').on('click', tapped);

    function tapped() {
        if (this.class === 'x' || this.class === 'o') {
            alert('This position is already occupied');
        } else {
            if (winner) {
                clearBoard();
            } else {
                turns++
                if (turns % 2 === 0) {
                    
                    if (player2) {
                        if(!player2.includes('/')){
                            player2 = "./" + player2
                        }
                        appendImage(this.id,player2)
                       
                   } else {
                       this.innerHTML = 'o';
                   }
                   $(this).addClass('o');
                   player2Possitions.push(this.id);
                   statusOfWinning();
                } else {

                    //Checks if player has choosen image else takes x and o as choices
                    if (player1) {
                        if (!player1.includes('/')) {
                            player1 = "./" + player1;
                        }
                        appendImage(this.id,player1)
                    }
                    else {
                        this.innerHTML = 'x';
                    }
                    $(this).addClass('x');
                    player1Possitions.push(this.id);
                    statusOfWinning(); 
                }
            }
            if (turns === 9) {
                if (!winner) {
                    alert('Its a tie game');
                    clearBoard();
                }

            }

        }

    }
    function appendImage(id,src){
            let img = $('<img>');
            img.attr('src',src)
            id = '#' + id;
            img.appendTo(id);

    }
    function statusOfWinning() {
        for (let i = 0; i < possiblities.length; i++) {
            for (let j = 0; j < possiblities[i].length; j++) {
                if (player1Possitions.some(r => possiblities[i].includes(r))) {
                    checkPossibilties(possiblities[i]);
                    let id0 = '#' + possiblities[i][0];
                    let id1 = '#' + possiblities[i][1];
                    let id2 = '#' + possiblities[i][2];

                    if ($(id0).attr('class') === "x" && $(id1).attr('class') === 'x' && $(id2).attr('class') === 'x') {
                        winner = true;
                        $(id0).addClass('markIt');
                        $(id1).addClass('markIt');
                        $(id2).addClass('markIt');
                        player1WinningCount++;
                        $('span.score1').text(player1WinningCount);
                        $('.winner').text("Player 1 has won the game");
                        //clearBoard();
                        break;
                    }

                }
                if (player2Possitions.some(r => possiblities[i].includes(r))) {
                    let id0 = '#' + possiblities[i][0];
                    let id1 = '#' + possiblities[i][1];
                    let id2 = '#' + possiblities[i][2];
                    if ($(id0).attr('class') === "o" && $(id1).attr('class') === 'o' && $(id2).attr('class') === 'o') {
                        winner = true;
                        $(id0).addClass('markIt');
                        $(id1).addClass('markIt');
                        $(id2).addClass('markIt');
                        player2WinningCount++;
                        $('span.score2').text(player2WinningCount);
                        $('.winner').text("Player 2 has won the game");
                        //clearBoard();
                        break;
                    }

                }
            }
        }
    }
    function checkPossibilties(){

    }
    function clearBoard() {
        
            $('td').empty();
            $('div > p > span').text("Pic image from below");
            //for removing all classes (x,o,markIt)
            $('td').removeClass();
            turns = 0;
            winner = false;
            $('.winner').text("");
        
    }
});