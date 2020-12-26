// Well this sucks, see https://github.com/cypress-io/cypress/issues/9113
const disableServiceWorker = {
  onBeforeLoad(window) {
    delete window.navigator.__proto__.serviceWorker;
  },
};

Cypress.on("window:before:load", (win) => {
  win.indexedDB.deleteDatabase("keyval-store");
});

describe("Timer Flow", () => {
  beforeEach(() => {
    cy.visit("/", disableServiceWorker);
  });

  it("User can switch between different timers", () => {
    cy.get("[data-qa=actions-wrapper]").should("be.visible");
    cy.get("[data-qa=time]").should("contain", "25:00");
    cy.get("[data-qa=action-short-break]").click();
    cy.get("[data-qa=time]").should("contain", "5:00");
    cy.get("[data-qa=action-long-break]").click();
    cy.get("[data-qa=time]").should("contain", "15:00");
    cy.get("[data-qa=action-pomodoro]").click();
    cy.get("[data-qa=time]").should("contain", "25:00");
  });

  it("User can start and pause timer", () => {
    cy.log("Initial state of the timer is waiting to be started");
    cy.get("[data-qa=timer-state]").should("contain", "START");
    cy.get("[data-qa=timer-btn]").click();
    cy.get("[data-qa=timer-state]").should("contain", "PAUSE");
    cy.get("[data-qa=timer-btn]").click();
    cy.get("[data-qa=timer-state]").should("contain", "START");

    cy.log("User can also start timer by pressing ENTER");
    cy.get("[data-qa=timer-btn]").focus().type("{enter}", { force: true });
    cy.get("[data-qa=timer-state]").should("contain", "PAUSE");
    cy.get("[data-qa=timer-btn]").focus().type("{enter}", { force: true });
    cy.get("[data-qa=timer-state]").should("contain", "START");
  });
});
