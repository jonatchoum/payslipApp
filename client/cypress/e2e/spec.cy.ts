// import describe from 'cypress'

// describe("My first Test", () => {
//   it("Does not do much", () => {
//     expect(true).to.equal(true);
//   });
// });

describe("Connexion admin", () => {
  it("Visit lamiasoft", () => {
    cy.visit("http://localhost:5173");
    // cy.get("input");
    cy.get("#mantine-r3").click().type("j.atsu");

    cy.get("#mantine-r5").click().type("Password@123");
    // cy.click();
    cy.get(".mantine-Button-root").click();
    cy.url().should("include", "/dashboard");
  });
});
