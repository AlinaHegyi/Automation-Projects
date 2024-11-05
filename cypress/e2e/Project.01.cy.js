
describe('Project 01/Validating form elements', () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-1");
  })



  it('Test 01 - Validate Contact us information', () => {

//     cy.get('h1').should('be.visible').and('have.text', 'Contact Us');
//     cy.get('#address').should('be.visible').and('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018');
//     cy.get('#email').should('be.visible').and('have.text', 'info@techglobalschool.com');
//     cy.get('#phone-number').should('be.visible').and('have.text', '(224) 580-2150');
  
// // improved solution -Bilal

// const expectedText = ['Contact Us', '2800 S River Rd Suite 310, Des Plaines, IL 60018','info@techglobalschool.com','(224) 580-2150']

// cy.get('.mb-5').children().each(($ele, index) => {
// cy.wrap($ele).should('have.text',expectedText[index])
//  });

// improved solution Burak

cy.get('.is-size-3').as('header').should('have.text', 'Contact Us')

const expectedTexts = [ '2800 S River Rd Suite 310, Des Plaines, IL 60018','info@techglobalschool.com','(224) 580-2150'];
cy.get('@header').nextAll().each(($ele, index) => {
  cy.wrap($ele).should('have.text', expectedTexts[index])
})
});





  it('Test 02 - Validate the Full name input box', () => {

    // cy.get('.control [placeholder="Enter your full name"]').should('be.visible').and('have.attr', 'required')
    // cy.get('[for="name"]').should('have.text', 'Full name *');
    // cy.get('.control > .input[placeholder="Enter your full name"]').should('have.attr', 'placeholder', 'Enter your full name');

    //improved solution Burak
 cy.get('[for="name"]').parent().find('input').should('be.visible')
    .and('have.attr', 'Placeholder', 'Enter your full name')
    .and('have.attr', 'required')

    cy.get('[for="name"]').should('have.text', 'Full name *');

  });




  it('Test 03 - Validate the gender radio button', () => {

    // cy.get('.field > .control > .label').should('have.text', 'Gender *')
    // cy.get('input[type="radio"]').should('have.attr', 'required');

    // const options = ['Male', 'Female', 'Prefer not to disclose'];
    
    // cy.get('label.radio').each(($el, index) => {
    //   cy.wrap($el).should('contain.text', options[index])
    // });
    // cy.get('input[type="radio"]').each(($el) => {
    //   cy.wrap($el).should('not.be.checked').should('be.visible')
    // });

    // cy.get('input[type="radio"]').eq(0).check().should('be.checked');
    // cy.get('input[type="radio"]').eq(1).should('not.be.checked');
    // cy.get('input[type="radio"]').eq(2).should('not.be.checked');

    // cy.get('input[type="radio"]').each(($el, index) => {
    //   if (index === 0) {
    //     cy.wrap($el).check().should('be.checked'); 
    //     cy.wrap($el).should('not.be.checked'); 
    //   }
    // });

//improved solution Burak
cy.contains('Gender *').should('have.text', 'Gender *');

const expectedTexts = ['Male', 'Female', 'Prefer not to disclose'];

 cy.get('input[type="radio"]').each(($el, index) => {
  cy.wrap($el).parent().should('have.text', expectedTexts[index])
  cy.wrap($el).should('be.enabled').and('not.be.checked')
 });

 cy.get('.radio > input').first().should('have.attr', 'required');
 cy.contains('Male').find('input').check().should('be.checked');

  

// cy.contains('Male').find('input').first().check().should('be.checked');
// cy.contains('Female').find('input').should('not.be.checked');
// cy.contains('Prefer not to disclose').find('input').should('not.be.checked');
// cy.contains('Female').find('input').first().check().should('be.checked');
// cy.contains('Male').find('input').should('not.be.checked');
// cy.contains('Prefer not to disclose').find('input').should('not.be.checked');

//instead of prev long code, we created a function(saved in support-commands)
cy.checkOptionAndValidateOthers('Male', expectedTexts);
cy.checkOptionAndValidateOthers('Female', expectedTexts);

  });

  //Test cases 4-5-6-7 together. Burak solution. we create an array of objects

  const testCases = [
    {
      description: 'Address input box',
      label: 'Address',
      placeholder: 'Enter your address',
      required: false

    },
    {
      description: 'Email input box',
      label: 'Email *',
      placeholder: 'Enter your email',
      required: true
    },
    {
      description: 'Phone input box',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: false
    },
    {
      description: 'Message text area',
      label: 'Message',
      placeholder: 'Type your message here...',
      required: false
    },
  ]

testCases.forEach((test, index) => {
  it(`Test case 0${index + 4} - ${test.description}`, () => {
 cy.contains('label', test.label).should('have.text', test.label);
 cy.contains('label', test.label).parent().find('input, textarea')
   .should('be.visible')
   .and('have.attr', 'placeholder', test.placeholder)
   .and(test.required ? 'have.attr' : 'not.have.attr', 'required')
  });
});

  // it('Test 04 - Validate the address input box', () => {
  //   cy.get('form > div:nth-child(3) > label').should('have.text', 'Address');

  //   cy.get('[type="text"][placeholder="Enter your address"]')
  //     .should('be.visible')
  //     .should('have.attr', 'placeholder', 'Enter your address')
  //     .should('not.have.attr', 'required');
  // });



  // it('Test 05 - Validate the email input box', () => {
  //   cy.get('form > div:nth-child(4) > label').should('have.text', 'Email *')

  //   cy.get('form div.field div.control input.input').eq(2)
  //     .should('have.attr', 'placeholder', 'Enter your email')
  //     .should('be.visible').and('have.attr', 'required')
  // });


  // it('Test 06 - Validate the phone input box', () => {
  //   cy.get('form > div:nth-child(5) > label').should('have.text', 'Phone');

  //   cy.get('form div.field div.control input.input').eq(3)
  //     .should('have.attr', 'placeholder', 'Enter your phone number')
  //     .should('be.visible').and('not.have.attr', 'required');
  // });


  // it('Test 07 - Validate the message text area', () => {
  //   cy.get('form > div:nth-child(6) > label').should('have.text', 'Message');

  //   cy.get('.textarea')
  //     .should('have.attr', 'placeholder', 'Type your message here...')
  //     .should('be.visible').and('not.have.attr', 'required');
  // });


  it('Test 08 - Validate the consent checkbox', () => {

    // cy.get('.checkbox').should('have.text', ' I give my consent to be contacted.');
    // cy.get('input[type="checkbox"]')
    //   .check().should('be.checked')
    //   .uncheck().should('not.be.checked');
 
//Burak solution

cy.get('.checkbox').should('have.text', ' I give my consent to be contacted.');
cy.get('.checkbox > input').should('be.enabled')
.click().should('be.checked')
.click().should('not.be.checked')
.and('have.attr', 'required')
});




  it('Test Case 09 - Validate the SUBMIT button', () => {
    cy.get('.control > .button').should('be.visible')
    .and('not.be.disabled')
    .and('have.text', 'SUBMIT');
  });


  it('Test Case 10 - Validate the form submission', () => {

    // cy.get('.control [placeholder="Enter your full name"]').type('Alina Hegyi');
    // cy.get('input[type="radio"][name="question"]').eq(1).check();
    // cy.get('[type="text"][placeholder="Enter your address"]').type('1216 Ellis Wallace Road');
    // cy.get('[type="email"][placeholder="Enter your email"]').type('alinamariahegyi@gmail.com');
    // cy.get('input[type="phone"]').type('021-2167-231');
    // cy.get('.textarea').type('I am almost done with my first project');
    // cy.get('input[type="checkbox"]').check();
    // cy.get('.button.is-link[type="submit"]').click();

    // cy.on("uncaught:exception", () => {
    //   return false;
    // });


    //update solution burak

   

    const inputs = [ 'Alina Hegyi', '1216 Ellis Wallace Road', 'alinamariahegyi@gmail.com', '021-2167-231', 'Random message' ]
    cy.get('.control').find(".input, textarea").each(($ele, index) => {
    cy.wrap($ele).type(inputs[index])
    });

    cy.contains('label', 'Female').find('input').click();
    cy.get('input[type="checkbox"]').check();
    cy.get('.control > .button').click();

    cy.on("uncaught:exception", () => {
        return false;
       });
       
   cy.get('.mt-5').should('have.text', 'Thanks for submitting!')
  });
});




