describe('RSS Feed', () => {

  it('should include title and image', () => {
    cy.request("/api/feed/")
      .its('body')
      .then(xml => {
        expect(xml).to.contain("Lammgeplauder")
        expect(xml).to.contain("<image>")
        expect(xml).to.contain("<item>")
        expect(xml).to.contain("werkstattfolge-eb8ed7")
        expect(xml).to.contain("grüne-folge-c8a440")
        expect(xml).to.contain("weihnachtsfolge-1ffc217e0d")
      })
  });
})
