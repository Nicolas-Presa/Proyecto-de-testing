// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
//Comando de Cypress para omitir errores por parte de la base de datos o error de codigo


Cypress.Commands.add('filtros', (filtro) => {
    cy.get('.block-subtitle').click();
    cy.get(filtro).click();
})
//Comando para ingresar a la seccion de filtros y elegir como parametro el filtro que necesitemos aplicar



Cypress.Commands.add('pagoPorBanco', (valuePhone, valueBank, valueTarget) => {
    cy.get(valuePhone).click();
    cy.get('.calculator').click();
    cy.get('#bankSelector').click();
    cy.get(valueBank).click();
    cy.get('#cardSelector').click();
    cy.get(valueTarget).click();
    cy.get('#calculate_btn > .btn-primary').click();
})
//Comando para realizar el pago con tarjeta, como parametro elegis el telefono, el tipo de banco y el tipo de 
//tarjeta


Cypress.Commands.add('formularioDatosPersonales', (input, value) => {
    cy.get(input).click().type(value);
    cy.get('._error').should('exist');
})
//Comando para formularios, elegis como parametro el input en el cual queres escribir y lo que queres escribir
//verifica si utilizando un tipo de dato distinto al que es necesario o el tipo de dato pero de forma incorrecta
//se genera un error que indica en pantalla cual es el problema.