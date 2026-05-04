import "./style.css";
import { views } from "./views.js";

views.setupBoard();

/*
Board Class
    Stores 6x7 2d array for board data

Player Class
    Stores player info
    1p, 2p, piece type (for checking board later)
    ai class that extends player? 
        has function to get a move coordinate based on certain factors

Game Class
    Stores game state (players, board, turn) and functions like getting coords for a move, checking if a 
        move is legal,  or checking for a win
    Functions take input and return output. 
    

GameController Class
    Stores the game instance and functions that string game / player / dom functions together
    Initializes game in the constructor
    Functions dont parse data or change the dom, it takes input from event listeners or other functions and passes the
        output to other functions to change the game state

*/