// Well this sucks, see https://github.com/cypress-io/cypress/issues/9113
const disableServiceWorker = {
  onBeforeLoad(window) {
    delete window.navigator.__proto__.serviceWorker;
  },
};

Cypress.on("window:before:load", (win) => {
  win.indexedDB.deleteDatabase("keyval-store");
});

describe("Settings Flow", () => {
  beforeEach(() => {
    cy.visit("/", disableServiceWorker);
  });

  it("User can open and close settings modal", () => {
    cy.log("Initially settings modal is hidden");
    cy.get("[data-qa=settings-modal]").should("not.be.visible");

    cy.log("Modal closes when User clicks on close button");
    cy.get("[data-qa=open-settings-btn]").click();
    cy.get("[data-qa=settings-modal]").should("be.visible");
    cy.get("[data-qa=close-settings-btn]").click();
    cy.get("[data-qa=settings-modal]").should("not.be.visible");

    cy.log("Modal closes when User press ESC");
    cy.get("[data-qa=open-settings-btn]").click();
    cy.get("[data-qa=settings-modal]").should("be.visible");
    cy.get("body").type("{esc}");
    cy.get("[data-qa=settings-modal]").should("not.be.visible");

    cy.log("Modal closes when User clicks outside the modal");
    cy.get("[data-qa=open-settings-btn]").click();
    cy.get("[data-qa=settings-modal]").should("be.visible");
    cy.get("body").click(10, 10);
    cy.get("[data-qa=settings-modal]").should("not.be.visible");
  });

  it("User can change app font", () => {
    const fonts = ["kumbh-sans", "roboto-slab", "space-mono"];
    fonts.forEach((font) => {
      cy.log(`Font ${font}`);
      cy.get("[data-qa=open-settings-btn]").click();
      cy.get(`[data-qa=font-${font}-btn]`).click();
      cy.get("[data-qa=apply-btn]").click();
      const fontClass = `font-${font}`;
      cy.get("[data-qa=action-pomodoro]").should("have.class", fontClass);
      cy.get("[data-qa=action-short-break]").should("have.class", fontClass);
      cy.get("[data-qa=action-long-break]").should("have.class", fontClass);
      cy.get("[data-qa=time]").should("have.class", fontClass);
      cy.get("[data-qa=timer-state]").should("have.class", fontClass);
    });
  });

  it("User can change app colors", () => {
    const colors = ["red", "cyan", "violet"];
    colors.forEach((color) => {
      cy.log(`Color ${color}`);
      cy.get("[data-qa=open-settings-btn]").click();
      cy.get(`[data-qa=color-${color}-btn]`).click();
      cy.get("[data-qa=apply-btn]").click();
      cy.get("[data-qa=action-pomodoro]").should("have.class", `bg-${color}`);
      cy.get("[data-qa=progress").should("have.class", `text-${color}`);
    });
  });

  it("User can change timer's duration", () => {
    const durations = ["pomodoro", "short-break", "long-break"];
    durations.forEach((duration) => {
      cy.log(`Duration ${duration}`);
      cy.get("[data-qa=open-settings-btn]").click();
      cy.get(`[data-qa=${duration}-input]`).clear().type(8);
      cy.get("[data-qa=apply-btn]").click();
      cy.get("[data-qa=time]").should("contain", "08:00");
    });
  });

  it("User can get validation feedback when changing time duration", () => {
    cy.get("[data-qa=open-settings-btn]").click();
    cy.get("[data-qa=short-break-input]").clear().type(61);
    cy.get("[data-qa=duration-error]").should("be.visible");
    cy.get("[data-qa=apply-btn]").should("have.attr", "disabled");
    // When we click apply - nothing changes
    cy.get("[data-qa=apply-btn]").click({ force: true });
    cy.get("[data-qa=short-break-input]").should("be.visible");
    cy.get("[data-qa=close-settings-btn]").click();
    // Timer contains default value, nothing was applied
    cy.get("[data-qa=action-short-break]").click();
    cy.get("[data-qa=time]").should("contain", "05:00");
    // Let's open settings again
    cy.get("[data-qa=open-settings-btn]").click();
    // Trying another invalid value
    cy.get("[data-qa=short-break-input]").clear().type(0);
    cy.get("[data-qa=duration-error]").should("be.visible");
    // Typing valid number
    cy.get("[data-qa=short-break-input]").clear().type(10);
    cy.get("[data-qa=duration-error]").should("not.be.visible");
    // Typing another invalid value
    cy.get("[data-qa=short-break-input]").clear().type(0.333);
    cy.get("[data-qa=duration-error]").should("be.visible");
    // Typing final valid value
    cy.get("[data-qa=short-break-input]").clear().type(6);
    cy.get("[data-qa=duration-error]").should("not.be.visible");
    cy.get("[data-qa=apply-btn]").should("not.have.attr", "disabled");
    cy.get("[data-qa=apply-btn]").click();
    cy.get("[data-qa=action-short-break]").click();
    cy.get("[data-qa=time]").should("contain", "06:00");
  });
});
