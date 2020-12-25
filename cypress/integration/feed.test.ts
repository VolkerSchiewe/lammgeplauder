describe('RSS Feed', () => {

  it('should include title and image', () => {
    const feed = cy.request("/api/feed/")
      .its('body')
      .then(xml => {
        expect(xml).to.contain("Lammgeplauder")
        expect(xml).to.contain("<image>")
        expect(xml).to.contain("<item>")
      })
  });
})
