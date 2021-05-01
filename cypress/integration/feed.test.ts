describe('RSS Feed', () => {

  it('should include title and image', () => {
    cy.request("/api/feed/")
      .its('body')
      .then(xml => {
        expect(xml).to.contain("Lammgeplauder")
        expect(xml).to.contain("<image>")
        expect(xml).to.contain("<item>")
      })
  });
})
