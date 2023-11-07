describe("Blog app", function () {
  let user;

  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/api/testing/reset`);

    user = {
      username: "aforgie",
      name: "Austin",
      password: "4379",
    };

    cy.createUser(user);
    cy.contains("login").click();

    cy.get('button[type="submit"]').as("submitBtn");
  });

  it("login form is shown by default", function () {
    cy.contains("log into application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
    cy.contains("cancel");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      const { username, password } = user;
      cy.contains("username").type(username);
      cy.contains("password").type(password);
      cy.get("@submitBtn").click();
      cy.contains(`${username} logged in`);
    });

    it("fails with wrong credentials", function () {
      cy.contains("username").type("af");
      cy.contains("password").type("43");
      cy.get("@submitBtn").click();
      cy.contains("wrong credentials");
    });
  });

  describe("When logged in", function () {
    const blog = {
      title: "First Blog",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    };

    beforeEach(function () {
      cy.login(user);
    });

    it("a blog can be created", function () {
      cy.contains("create").click();
      cy.contains("title").type(blog.title);
      cy.contains("author").type(blog.author);
      cy.contains("url").type(blog.url);
      cy.get("@submitBtn").click();
      cy.contains(`a new blog ${blog.title} by ${blog.author} added`);
      cy.get(".Blog").contains("First Blog by Michael Chan");
    });

    describe("A blog exists", function () {
      beforeEach(function () {
        cy.createBlog(blog);
        cy.createBlog({
          title: "Second Blog",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        });
      });

      it("one can be liked", function () {
        cy.viewBlog("First Blog");
        cy.contains("like").click();
        cy.contains("likes 1");
      });

      it("one can be deleted by its creator", function () {
        cy.viewBlog("First Blog");
        cy.contains("remove").click();
        cy.get(".Blog").should("have.length", 1);
      });

      it("only its creator can delete it", function () {
        cy.contains("logout").click();
        cy.viewBlog("First Blog");
        cy.contains("remove").should("not.exist");

        const newUser = {
          username: "eigrofa",
          name: "Eigrof",
          password: "4379",
        };

        cy.createUser(newUser);
        cy.login(newUser);
        cy.viewBlog("First Blog");
        cy.contains("remove").should("not.exist");
      });

      it("they are in descending order according to likes", function () {
        cy.viewBlog("Second Blog");
        cy.contains("Second Blog").parent().contains("like").click();

        cy.get(".Blog").eq(0).should("contain", "Second Blog");
        cy.get(".Blog").eq(1).should("contain", "First Blog");
      });
    });
  });
});
