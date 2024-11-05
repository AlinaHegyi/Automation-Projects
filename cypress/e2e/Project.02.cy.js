
describe('Project 02-Login functions', () => {
    beforeEach(() => {
        cy.visit("https://www.techglobal-training.com/frontend/project-2");
    })

    it('Test 01-Validate the login form', () => {
        /** 1.Navigate to https://techglobal-training.com/frontend/project-2
        2.Validate that the username input box is displayed
        3.Validate that the username input box is not required
        4.Validate that the label of the username input box is “Please enter your username”
        5.Validate that the password input box is displayed
        6.Validate that the password input box is not required
        7.Validate that the label of the password input box is “Please enter your password”
        8.Validate the “LOGIN” button is displayed
        9.Validate the “LOGIN” button is clickable
        10.Validate that the button text is “LOGIN”
        11.Validate the “Forgot Password?” link is displayed
        12.Validate that the “Forgot Password?” link is clickable
        13.Validate that the link text is “Forgot Password?
         */
        const elements = [
            {
                description: 'Username input box',
                required: false,
                id: 'username',
                label: 'Please enter your username'
            },
            {
                description: 'Password input box',
                required: false,
                id: 'password',
                label: 'Please enter your password'
            }
        ];
        cy.get('input').each(($el, index) => {
            cy.wrap($el).should('be.visible').and('not.have.attr', 'required')
            cy.get(`label[for="${$el.attr('id')}"]`).should('have.text', elements[index].label);
        });

        cy.get('#login_btn').should('be.visible').and('have.text', 'LOGIN').and('is.enabled');
        cy.get('#login_btn').next().contains('Forgot Password?').click();
    });


    it('Test 02-Validate the valid login', () => {
        /** Navigate to https://techglobal-training.com/frontend/project-2
          Enter the username as “TechGlobal”
          Enter the password as “Test1234”
           Click on the “LOGIN” button
          Validate the success message is displayed as “You are logged in”
           Validate the logout button displayed with the text “LOGOUT”
         */
        cy.get('input#username').type('TechGlobal');
        cy.get('input#password').type('Test1234');
        cy.get('#login_btn').click();
        cy.get('#success_lgn').should('have.text', 'You are logged in').and('be.visible')
            .next().contains('LOGOUT')
    });
    it('Test 03-Validate the logout', () => {
        //     /**Navigate to https://techglobal-training.com/frontend/project-2
        //      Enter the username as “TechGlobal”
        //      Enter the password as “Test1234”
        //      Click on the “LOGIN” button
        //      Click on the “LOGOUT” button
        //      Validate that the login form is displayed
        //      */
        cy.get('input#username').type('TechGlobal');
        cy.get('input#password').type('Test1234');
        cy.get('#login_btn').click();
        cy.get('#logout').click();



    });
    it('Test 04-Validate the Forgot Password? Link and Reset Password modal', () => {
        //     /**Navigate to https://techglobal-training.com/frontend/project-2
        //      Click on the “Forgot Password?” link
        //      Validate that the modal heading “Reset Password” is displayed
        //      Validate that the close button is displayed
        //      Validate that the email input box is displayed
        //      Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
        //      Validate the “SUBMIT” button is displayed
        //      Validate the “SUBMIT” button is clickable
        //      Validate that the button text is “SUBMIT”
        //      */

        cy.get('#login_btn').next().click()
        cy.get('#modal_title').should('be.visible').and('have.text', 'Reset Password').next().should('be.visible');
        cy.get('input#email').should('be.visible')
            .prev().prev().should('have.text', `Enter your email address and we'll send you a link to reset your password. `);
        cy.get('button#submit').contains('SUBMIT').should('be.visible').and('be.enabled');

    });

    it('Test 05-Validate the Reset Password modal close button', () => {
        /**Navigate to https://techglobal-training.com/frontend/project-2
       // Click on the “Forgot Password?” link
       // Validate that the “Reset Password” modal is displayed
       // Click on the close button
       // Validate that the “Reset Password” modal is closed
       //     */

        cy.get('#login_btn').next().click()
        cy.get('#modal_title').should('have.text', 'Reset Password').and('be.visible').next().should('be.visible').click();
        cy.get('.modal-card').should('not.exist')

    });


    it('Test 06- Validate the Reset Password form submission', () => {
        //     /**NNavigate to https://techglobal-training.com/frontend/project-2
        // Click on the “Forgot Password?” link
        // Enter an email
        // Click on the “SUBMIT” button
        // Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
        // */


        cy.contains('[href="/frontend/project-2"]', 'Forgot Password?').click()
        cy.get('#email').type('alina.hegyo@hotmail.com');
        cy.get('#submit').click();
        cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.');



    });
   
    const testCases = [

        {
            description: 'Empty credentials login',
            username: '',
            password: '',
            expectedMessage: 'Invalid Username entered!'
        },

        {
            description: 'Wrong username login',
            username: 'John',
            password: 'Test1234',
            expectedMessage: 'Invalid Username entered!'
        },

        {
            description: 'Wrong password login',
            username: 'TechGlobal',
            password: '1234',
            expectedMessage: 'Invalid Password entered!'
        },

        {
            description: 'Wrong username and password login',
            username: 'John',
            password: '1234',
            expectedMessage: 'Invalid Username entered!'
        }
    ];

    testCases.forEach((test, index)  => {
        it(`Test 0${index + 7} - ${test.description}`, () => {
            if (test.username) {
                cy.get('#username').type(test.username);
              }
          
            if (test.password) {
                cy.get('#password').type(test.password);
              }
       cy.get('#login_btn').click()
       cy.get('#error_message').should('have.text', test.expectedMessage )
        });
      })














});

























