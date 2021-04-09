# TIC TAC TOE

This is a 3*3 table that works as a normal tic tac toe game. The winner will be shown when a player occupies any diagonal or horizontal or vertical cells in the table.

## Usage

Open the link in your preferred browser, and add tictactoe.html at the end of the URL like below.

[Link of the game](https://bhavyagovind.github.io/TicTacToe/tictactoe.html)

## Tricky code in the evaluating winner function 

```jquery
function evaluatePlayer()

   for(let i = 0; i < possibilities.length; i ++){
   
      for(let j =  0; j < possibilities[i].length; j++){
    
         if (player1Positions.some(r => possiblities[i].includes(r))) {
                    evaluateWinner(possiblities[i], 'x');
         }
         if (player2Positions.some(r => possiblities[i].includes(r))) {
                    evaluateWinner(possiblities[i], 'o');
         }
      }
   }
}
```
if condition will return when it finds the matching array in the possibilities array.
[reference for above code](https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript)

``` css selctors to remove borders
    table tr:first-child td {
        border-top: 0;
    }
    table tr:last-child td {
        border-bottom: 0;
    }
    table tr td:first-child {
        border-left: 0;
    }
    table tr td:last-child {
        border-right: 0;
    }
```
This code will works for any n*n table to remove borders.



## List of improvements needed.

1. Changing logic to make it work for any n*n tic tac toe.
2. Building logic to AI, to play against the player.
3. Custom board sizes.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
