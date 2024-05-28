describe("testing test", () => {
  it("true is true", () => {
    expect(true).to.equal(true);
  });
});

describe("can display the app", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/lines", {
      fixture: "lines.json",
    }).as("linesApi");

    cy.intercept("GET", "**/api/stops/Ligne_D_Horizon_Vasacoss_R", {
      fixture: "stops.json",
    }).as("stopsApi");

    cy.intercept("GET", "**/api/ways/Ligne_D_Horizon_Vasacoss_R", {
      fixture: "ways.json",
    }).as("waysApi");

    cy.intercept("GET", "**/api/busStops", {
      fixture: "busStops.json",
    }).as("busStopsApi");

    cy.visit("http://localhost:5173/");
  });

  it("Title of the page contains BetaX", () => {
    cy.get("title", { timeout: 1000 }).should("contain", "BetaX");
  });

  it("The bus line list is displayed", () => {
    cy.wait("@linesApi")
      .get("#root > div:nth-child(2) > div:nth-child(2) > ul", {
        timeout: 1000,
      })
      .children(0)
      .should("contain", "Ligne_D_Horizon_Vasacoss_R");
  });

  it("The bus stop list is displayed", () => {
    cy.wait("@busStopsApi")
      .get("#root > div:nth-child(2) > div:nth-child(1) > ul")
      .children(0)
      .should("contain", "Toto-bato Ambodifilao");
  });

  it("Clicking on a bus line display associated bus stops", () => {
    cy.get("#root > div:nth-child(2) > div:nth-child(2) > ul")
      .children(0)
      .click()
      .wait("@stopsApi")
      .get("#root > div:nth-child(1) > div:nth-child(2) > div > h2")
      .should("contain", "Ligne_D_Horizon_Vasacoss_R")
      .get("#root > div:nth-child(1) > div:nth-child(2) > div > ul")
      .children(0)
      .should("contain", "Tsena");
  });
});
