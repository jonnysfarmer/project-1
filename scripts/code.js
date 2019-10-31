/*
---- BASIC ---

BOARD
- Create basic grid
- input walls / pattern (new array)
- populate with mini fruit
    - Within this. when Pacman goes over them, he gets a point
    - when pac man hits off them - we remove a class / fruit 
- a couple of run offs

PACMAN
 - This guy is a small image
 - constantly moving.  Can only move to spaces which is a 'free space' (key down)
     - would you do the constant moving a set interval.  4 different set itervals
     depening on which key down / direction you are on??
 - moves with the arrow keys
 - when he eats flashing fruit - he can get ghosts


GHOSTS
- start in the same place
- use logic that they move, and constantly towards pacman in the free space
  - unless pacman hass a specific class (flashing) then move away
- if they hit pacman - game over
- if pacman hits them with flashing class - they return to base...


ESXTRA FLASHING FRUIT
- randomly appear in free space - maybe 4
- if pacman gets it - then they dissapear and a new one appears

--- COMPLEX ---- 

Board

18 * 18 array.
Manualy create this as a map. 0, 1's for free space or wall.
using loop, add mini fruit on all 0's (free space). 

Pacman

- get him to start same place

Movement

On key down, runs a function.  creates a timer loop that moves in that director.
If function in that if the value is 0 then it stays the same
When another button is clicks, cancells that timer loop!

Mini Fruit

If pacman array position = position of mini fruit.  then remove mini fruit and add a point

Big Fruit

Placed on speicifc points
Same as Ghosts

GHOST

Appear in speicif parts.
They alll move slightly differently - but towards the array ID of pacman
cant be on the same tile as another ghost
Maybe when they hit a wall, some go left / right or up and down
move every second

IF they have a flashing property (due to pacman), they try and move away from him
If packman hits them - they appear in the start location


New Classes need

Pacman
ghost1
ghost2
ghost3
ghost4
fruit
flashfruit
flashing (additional when goes over flashing fruit)
wall
background

FUNCTIONS LIST

BOARD CREATION

custom Board - got one already
Put on the walls
put on the small fruit
put on big fruit
put on ghost 1 2 3

MINI FRUIT
If pacman hits it
Takes off a class so it goes blank
adds 10 points onto the score

BIG FRUIT
If pacman hits it
takes off class to go blank
Adds class onto pacman - flashing (for a certain time!)
adds 100 point to score

GHOST MOVE
same as player but doesnt take input.  Moves one tile - random direction??? or towards player
similar ifs that if it hits a player - life loss
but if player has flashing class - ghost moves back to home and he gets 200 points

Start game
Everyone is placed - lives = 3 score = 0
Press a button to start?

End game
Lives = 0
total score?




PLAYER MOVE
  on player move attempt
    is moving into a wall then do not allow move, do nothing, assume user figures it out 
    is moved then 
    switch if 
        case empty square: move player icon to that square, function (move enemy)
        case food square: move player icon to that square, function (remove foodbox inc score), function (move enemy)
        case enemy square (not-killable): function (remove life inc send player home), function (move enemy)
        case enemy square (is-killable) : move player icon to that square, increase playerscore, function (send enemy home))
        case weapon square: move player icon to that square, function (make enemy killable), function (move enemy), (remove weapons)
        case on run off - goes back to the start of the array!







Pacman.WALL    = 0;
Pacman.BISCUIT = 1;
Pacman.EMPTY   = 2;
Pacman.BLOCK   = 3;
Pacman.PILL    = 4;

Pacman.MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
	[0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];



*/