// cypress/integration/test.spec.js
describe('Tic Tac Toe Game', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); // Make sure this URL is correct for your app
    });

    it('Should find the input tag', () => {
        cy.get('#player-1').should('exist');
        cy.get('#player-2').should('exist');
    });

    it('Shows player 1 win', () => {
        cy.get('#player-1').type('Player 1');
        cy.get('#player-2').type('Player 2');
        cy.get('#submit').click();

        cy.get('#1').click(); // Player 1 moves
        cy.get('#2').click(); // Player 2 moves
        cy.get('#4').click(); // Player 1 moves
        cy.get('#5').click(); // Player 2 moves
        cy.get('#7').click(); // Player 1 moves to win

        cy.get('.message').should('contain', 'Player 1, congratulations you won!');
    });

    it('Shows player 2 win', () => {
        cy.get('#player-1').type('Player 1');
        cy.get('#player-2').type('Player 2');
        cy.get('#submit').click();

        cy.get('#1').click(); // Player 1 moves
        cy.get('#2').click(); // Player 2 moves
        cy.get('#3').click(); // Player 1 moves
        cy.get('#5').click(); // Player 2 moves
        cy.get('#4').click(); // Player 1 moves
        cy.get('#6').click(); // Player 2 moves to win

        cy.get('.message').should('contain', 'Player 2, congratulations you won!');
    });
});