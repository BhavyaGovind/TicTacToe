$(document).ready(function () {
    var player1;
    var player2;
    let player1Positions = [];
    let player2Positions = [];
    let turns = 0;
    let winner = false;
    console.log( localStorage.getItem('player1Score'));
    console.log( localStorage.getItem('player2Score') );
    let player1WinningCount = + localStorage.getItem('player1Score') ? $('span.score1').text(localStorage.getItem('player1Score')) : 0;
    let player2WinningCount = + localStorage.getItem('player2Score') ? $('span.score2').text(localStorage.getItem('player2Score')) : 0;
    let possiblities = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['1', '5', '9'], ['1', '4', '7'], ['3', '5', '7'], ['3', '6', '9'], ['2', '5', '8'], ['3', '6', '9']];
    $('.reset').on('click', clearBoard);
    $('.clearScores').on('click',clearScores);
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
        if ($('#' + this.id).attr('class') === 'x' || $('#' + this.id).attr('class') === 'o') {
            alert('This position is already occupied');
        } else {
            if (winner) {
                clearBoard();
            } else {
                turns++
                if (turns % 2 === 0) {
                    assignPlayerPosition(player2, this.id, 'o');
                } else {
                    assignPlayerPosition(player1, this.id, 'x');
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

    function assignPlayerPosition(playerObject, positionId, playerClass) {
        if (playerObject) {
            if (!playerObject.includes('/')) {
                playerObject = "./" + playerObject
            }
            let img = $('<img src=' + playerObject + '>');
            img.appendTo('#' + positionId);
        } else {
            $('#' + positionId).text(playerClass);
        }

        $('#' + positionId).addClass(playerClass);

        if (playerClass === 'o') {
            player2Positions.push(positionId);
        } else {
            player1Positions.push(positionId);
        }

        //Evaluate Player status
        evaluatePlayer();
    }

    function evaluatePlayer() {
        for (let i = 0; i < possiblities.length; i++) {
            for (let j = 0; j < possiblities[i].length; j++) {
                if (player1Positions.some(r => possiblities[i].includes(r))) {
                    evaluateWinner(possiblities[i], 'x');
                }
                if (player2Positions.some(r => possiblities[i].includes(r))) {
                    evaluateWinner(possiblities[i], 'o');
                }
            }
        }
    }
    function evaluateWinner(possiblities, playerClass) {
        let id0 = '#' + possiblities[0];
        let id1 = '#' + possiblities[1];
        let id2 = '#' + possiblities[2];

        if ($(id0).attr('class') === playerClass && $(id1).attr('class') === playerClass && $(id2).attr('class') === playerClass) {
            winner = true;
            $(id0).addClass('markIt');
            $(id1).addClass('markIt');
            $(id2).addClass('markIt');
            let message = "";
            let img = $('<img>');
            if (playerClass === 'x') {
                player1WinningCount++;
                storeInCache(player1WinningCount, playerClass);
                $('span.score1').text(player1WinningCount);
                message = "Minion has won the game";
                img.attr('src', './images/minion_win.gif');
            } else {
                player2WinningCount++;
                storeInCache(player2WinningCount, playerClass);
                $('span.score2').text(player2WinningCount);
                message = "Mario has won the game";
                img.attr('src', './images/win.gif');
            }

            $('.winner').text(message);
            $('.winner').append(img);
        }
    }

    
    function clearScores(){
        localStorage.removeItem("player1Score");
        localStorage.removeItem("player2Score");
        $('span.score1').text('0');
        $('span.score2').text('0');
        clearBoard();   
    }
    function storeInCache(count, playerClass) {
        if (typeof (Storage) !== "undefined") {
            // Store
            if (playerClass === 'x') {
                localStorage.setItem("player1Score", count);
            }
            else{
                localStorage.setItem("player2Score", count);
            }
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }

    function clearBoard() {

        $('td').empty();
        // $('.visibleImage1').toggleClass('.fillChoice2');
        // $('.visibleImage').toggleClass('.fillChoice1');
        // player1= "";
        // player2= "";
        $('div.imagePicker > p > span').text("Pic image from below");
        //for removing all classes (x,o,markIt)
        $('td').removeClass();
        turns = 0;
        winner = false;
        $('.winner').text("");

    }
});