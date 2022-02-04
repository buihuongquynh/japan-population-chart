
describe('japan-population-chart test', () => {
  let dataPrefecture
  let dataPopulation
  it('test api',()=>{
      cy.request('GET', 'https://opendata.resas-portal.go.jp/api/v1/prefectures').then((response) => {
        dataPrefecture = response.body
      })
      cy.request('GET', 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1').then((response) => {
        dataPopulation = response.body
      }) 
  })
 
  it('test visit', () => {
    const link = 'http://localhost:3000/'
    cy.visit(link)
    cy.wait(500)
  })
  it('test title ', () => {
    cy.get('h1').eq(0).invoke('text').should('include', '都道府県')
    
  })
  it('test label X and Y ', () => {
    cy.get('div[class^="style_nameY___NFfL"]').eq(0).invoke('text').should('include', '人口数')
    cy.get('span[class^="style_nameX__aIkUK"]').eq(0).invoke('text').should('include', '年度')

  })
  it('test is checked', () => {
    cy.get('[type="checkbox"]').check() // Unchecks checkbox element
    cy.get('span[class^="recharts-legend-item-text"]')
      .invoke('text')
      .should('include', '北海道')
  })
  it('test not checked', () => {
    cy.get('[type="checkbox"]').uncheck()
      cy
    .get('div[class^="recharts-legend-wrapper"]')
    .should('not.have.class', 'recharts-legend-item-text')
  })
})
