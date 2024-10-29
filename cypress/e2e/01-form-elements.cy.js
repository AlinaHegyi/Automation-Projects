
describe('Project 01/Validating form elements', () => {

  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-1");
  })



  it('Test 01 - Validate Contact us information', () => {


    cy.get('h1.is-size-3').should('be.visible').and('have.text', 'Contact Us');
    cy.get('#address').should('be.visible').and('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018');
    cy.get('#email').should('be.visible').and('have.text', 'info@techglobalschool.com');
    cy.get('#phone-number').should('be.visible').and('have.text', '(224) 580-2150');
  });


  it('Test 02 - Validate the Full name input box', () => {

    cy.get('.control [placeholder="Enter your full name"]').should('be.visible').and('have.attr', 'required')
    cy.get('.field > [for="name"]').should('have.text', 'Full name *');
    cy.get('.control > .input[placeholder="Enter your full name"]').should('have.attr', 'placeholder', 'Enter your full name');

  });


  it('Test 03 - Validate the gender radio button', () => {

    cy.get('.field > .control > .label').should('have.text', 'Gender *')

    cy.get('input[type="radio"]').should('have.attr', 'required');

    const options = ['Male', 'Female', 'Prefer not to disclose'];
    cy.get('label.radio').each(($el, index) => {
      cy.wrap($el).should('contain.text', options[index])
    });

    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).should('not.be.checked').should('be.visible')
    });

    cy.get('input[type="radio"]').eq(0).check().should('be.checked');
    cy.get('input[type="radio"]').eq(1).should('not.be.checked');
    cy.get('input[type="radio"]').eq(2).should('not.be.checked');


  });


  it('Test 04 - Validate the address input box', () => {
    cy.get('form > div:nth-child(3) > label').should('have.text', 'Address');

    cy.get('[type="text"][placeholder="Enter your address"]')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter your address')
      .should('not.have.attr', 'required');
  });





  it('Test 05 - Validate the email input box', () => {
    cy.get('form > div:nth-child(4) > label').should('have.text', 'Email *')

    cy.get('form div.field div.control input.input').eq(2)
      .should('have.attr', 'placeholder', 'Enter your email')
      .should('be.visible').and('have.attr', 'required')
  });





  it('Test 06 - Validate the phone input box', () => {
    cy.get('form > div:nth-child(5) > label').should('have.text', 'Phone');

    cy.get('form div.field div.control input.input').eq(3)
      .should('have.attr', 'placeholder', 'Enter your phone number')
      .should('be.visible').and('not.have.attr', 'required');
  });






  it('Test 07 - Validate the message text area', () => {
    cy.get('form > div:nth-child(6) > label').should('have.text', 'Message');

    cy.get('.textarea')
      .should('have.attr', 'placeholder', 'Type your message here...')
      .should('be.visible').and('not.have.attr', 'required');
  });






  it('Test 08 - Validate the consent checkbox', () => {

    cy.get('.checkbox').should('have.text', ' I give my consent to be contacted.');
    cy.get('input[type="checkbox"]')
      .check().should('be.checked')
      .uncheck().should('not.be.checked');
  });




  it('Test Case 09 - Validate the SUBMIT button', () => {
    cy.get('.button.is-link').should('be.visible').and('not.be.disabled').and('have.text', 'SUBMIT');
  });






  
  it('Test Case 10 - Validate the form submission', () => {

    cy.get('.control [placeholder="Enter your full name"]').type('Alina Hegyi');
    cy.get('input[type="radio"][name="question"]').eq(1).check();
    cy.get('[type="text"][placeholder="Enter your address"]').type('1216 Ellis Wallace Road');
    cy.get('[type="email"][placeholder="Enter your email"]').type('alinamariahegyi@gmail.com');
    cy.get('input[type="phone"]').type('021-2167-231');
    cy.get('.textarea').type('I am almost done with my first project');
    cy.get('input[type="checkbox"]').check();
    cy.get('.button.is-link[type="submit"]').click();

    cy.on("uncaught:exception", () => {
      return false;
    });

  })
});




