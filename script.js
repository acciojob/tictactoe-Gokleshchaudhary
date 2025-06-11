describe('Tic Tac Toe Game', () => {
    beforeEach(() => {
        cy.visit('your-game-url'); // Replace with your actual URL
    });

    it('Should find the input tag', () => {
        cy.get('#player-1').should('exist'); // Check if Player 1 input exists
        cy.get('#player-2').should('exist'); // Check if Player 2 input exists
    });

    it('Shows player 1 win', () => {
        // Enter player names
        cy.get('#player-1').type('Player 1');
        cy.get('#player-2').type('Player 2');
        cy.get('#submit').click();

        // Simulate moves for player 1 to win
        cy.get('#1').click(); // Player 1 moves
        cy.get('#2').click(); // Player 2 moves
        cy.get('#4').click(); // Player 1 moves
        cy.get('#5').click(); // Player 2 moves
        cy.get('#7').click(); // Player 1 moves to win

        // Check for winning message
        cy.get('.message').should('contain', 'Player 1, congratulations you won!');
    });

    it('Shows player 2 win', () => {
        // Enter player names
        cy.get('#player-1').type('Player 1');
        cy.get('#player-2').type('Player 2');
        cy.get('#submit').click();

        // Simulate moves for player 2 to win
        cy.get('#1').click(); // Player 1 moves
        cy.get('#2').click(); // Player 2 moves
        cy.get('#3').click(); // Player 1 moves
        cy.get('#5').click(); // Player 2 moves
        cy.get('#4').click(); // Player 1 moves
        cy.get('#6').click(); // Player 2 moves to win

        // Check for winning message
        cy.get('.message').should('contain', 'Player 2, congratulations you won!');
    });
});