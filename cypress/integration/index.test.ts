describe('Homepage', () => {
  it('should loads correctly', () => {
    cy.visit("/")
    cy.findByText("Lammgeplauder").should("exist")
  })
})
