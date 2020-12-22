describe("Settings Flow", () => {
  beforeEach(() => {
    cy.visit("/");
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
      cy.get("[data-qa=close-settings-btn]").click();
      const fontClass = `font-${font}`;
      cy.get("[data-qa=action-pomodoro]").should("have.class", fontClass);
      cy.get("[data-qa=action-short-break]").should("have.class", fontClass);
      cy.get("[data-qa=action-long-break]").should("have.class", fontClass);
      cy.get("[data-qa=time").should("have.class", fontClass);
      cy.get("[data-qa=timer-state]").should("have.class", fontClass);
    });
  });

  it("User can change app colors", () => {
    const colors = ["red", "cyan", "violet"];
    colors.forEach((color) => {
      cy.log(`Color ${color}`);
      cy.get("[data-qa=open-settings-btn]").click();
      cy.get(`[data-qa=color-${color}-btn]`).click();
      cy.get("[data-qa=close-settings-btn]").click();
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
      cy.get("[data-qa=close-settings-btn]").click();
      cy.get("[data-qa=time").should("contain", "08:00");
    });
  });
});
