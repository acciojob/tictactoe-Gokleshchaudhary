let player1, player2;
let currentPlayer;
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (player1 === '' || player2 === '') {
        alert("Please enter names for both players.");
        return;
    }

    currentPlayer = player1; // Set the first player
    document.querySelector('.message').innerText = `${currentPlayer}, you're up!`;

    document.querySelector('.input-area').style.display = 'none';
    document.querySelector('.board').style.display = 'grid';
});

// Handle cell clicks
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        const cellIndex = this.id - 1;

        if (board[cellIndex] === '') {
            board[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
            this.innerText = board[cellIndex];

            if (checkWinner()) {
                document.querySelector('.message').innerText = `${currentPlayer}, congratulations you won!`;
                document.querySelectorAll('.cell').forEach(c => c.style.pointerEvents = 'none');
            } else if (board.every(cell => cell !== '')) {
                document.querySelector('.message').innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                document.querySelector('.message').innerText = `${currentPlayer}, you're up!`;
            }
        }
    });
});

// Function to check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
describe('Tic Tac Toe Game', () => {
    beforeEach(() => {
        cy.visit('path/to/your/index.html'); // Adjust the path as necessary
    });

    it('Should find the input tag', () => {
        cy.get('#player-1').should('be.visible');
        cy.get('#player-2').should('be.visible');
    });

    it('Shows player 1 win', () => {
        cy.get('#player-1').type('Player 1');
        cy.get('#player-2').type('Player 2');
        cy.get('#submit').click();

        // Simulate player moves that lead to a win for Player 1
        cy.get('#1').click(); // Player 1's move
        cy.get('#2').click(); // Player 2's move
        cy.get('#4').click(); // Player 1's move
        cy.get('#5').click(); // Player 2's move
        cy.get('#7').click(); // Player 1's winning move
        
        cy.get('.message').should('contain', 'Player 1, congratulations you won!');
    });

    it('Shows player 2 win', () => {
        cy.get('#player-1').type('Player 1');
        cy.get('#player-2').type('Player 2');
        cy.get('#submit').click();

        // Simulate player moves that lead to a win for Player 2
        cy.get('#1').click(); // Player 1's move
        cy.get('#2').click(); // Player 2's winning move
        cy.get('#3').click(); // Player 1's move
        cy.get('#5').click(); // Player 2's winning move
        
        cy.get('.message').should('contain', 'Player 2, congratulations you won!');
    });
});