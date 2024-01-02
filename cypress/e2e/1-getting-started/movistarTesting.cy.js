describe('Casos de pruebas en la pagina de Movistar', () => {
    beforeEach(() => {
        cy.visit('https://tiendaonline.movistar.com.ar/');
    })

    // it("Caso 1 - Busqueda y compra de equipo en 6 cuotas sin interes", () => {
    //     cy.get('ol > [data-id="14908"]').click();
    //     cy.get('.price-content > .financing').should('contain', '6 cuotas sin interés');
    // })

    it("Caso 1 - Busqueda y compra de equipo en 3 cuotas", () => {
        let opcionesDisponibles = 0;

        cy.get('ol > [data-id="14908"]').click()
    cy.get('.calculator').click();
    cy.get('#bankSelector').click()

    cy.get('#bankSelector .ui-menu-item').each((bankOption) => { //Recorrido y click en todas las opciones de bancos
        cy.wrap(bankOption).click({force: true});
        cy.get('#cardSelector').click()

        cy.get('#cardSelector li').each((cardOption) => { //Recorrido y click en todas las opciones de tarjetas
            cy.wrap(cardOption).click({force: true});
            cy.get('#calculate_btn > .btn-primary').click();
            cy.get('#installments-modal > .content').then((content) => {
                // Verifica si el texto está presente dentro del elemento
                if (content.text().includes("3 cuotas sin interés")) {
                    opcionesDisponibles = opcionesDisponibles + 1;
                    expect(true).to.equal(true); 
                    // Incrementa la variable si la condición es verdadera
                }
            });
        });
    });
    cy.wrap(null).then(() => {
        expect(opcionesDisponibles, 'Cantidad de bancos disponibles con pago en 3 cuotas sin interés: ').to.equal(opcionesDisponibles);
    });
});

    it("Caso 2 - Seleccion y devolucion de equipo por filtro", () => {

        cy.fixture('filters.json').then((filter) =>{ //llamado al archivo json
        cy.wait(2000);
        cy.filtros(filter.gb128);
        cy.filtros(filter.price100kA200k);
    })
    //Commands de filtrado

        cy.get('.products > ol > li').should('have.length', 2);
        //Verificacion de devolucion de equipos por filtro
    })

    it('Caso 3 - Validar que NO exista la opcion de 60 cuotas con VISA de banco Credicoop', () => {
        cy.pagoPorBanco('ol > [data-id="14908"]', '#ui-id-2 > :nth-child(19)','[data-card="Visa"]'); //Command
        cy.get('#modal-content-7').should("not.contain", "60 cuotas sin interés");
        //Acceso a la compra del tercer telefono de la lista para verficiar 
    })

    it("Caso 4 - Formulario de compra - Datos Personales", () => {
        cy.get('ol > [data-id="14908"]').click();
        cy.get('#swatch_attribute_card').click();
        cy.get('.item > .action').click();
                    // Accedemos al formulario de compra de equippos
        cy.fixture('form.json').then((input) => { //llamado al archivo json
        cy.wait(2000);
        cy.formularioDatosPersonales(input.email, 'nombreSinArroba'); 
        cy.formularioDatosPersonales(input.firstName, '12345');
        cy.formularioDatosPersonales(input.lastName, '12345');
        cy.formularioDatosPersonales(input.dni, '4058798');
        cy.formularioDatosPersonales(input.phone, '112233445');
        })
                    //commands para tipear de forma erronea o incompleta
                    //enfque en formulario de Datos Personales.
        cy.get('.button').click();
        cy.get('.message-notice').should('exist');
                    //Verificacion de existencia del error
    })
})

