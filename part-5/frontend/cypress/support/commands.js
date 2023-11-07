Cypress.Commands.add("login", (credentials) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/api/login`, credentials).then(
    ({ body }) => {
      localStorage.setItem("loggedInBloglistUser", JSON.stringify(body));
      cy.visit("");
    }
  );
});

Cypress.Commands.add("createBlog", (blog) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/api/blogs`,
    method: "POST",
    body: blog,
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedInBloglistUser")).token
      }`,
    },
  });

  cy.visit("");
});

Cypress.Commands.add("createUser", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, user);
  cy.visit("");
});

Cypress.Commands.add("viewBlog", (blog) => {
  cy.contains(blog).contains("view").click();
});
