import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const addLikes = jest.fn();
  const removeBlog = jest.fn();
  const loggedInUser = "aforgie";
  const blog = {
    id: "6531575b140e3662d9618bb0",
    title: "React Labs: What We've Been Working On – March 2023",
    author:
      "Joseph Savona, Josh Story, Lauren Tan, Mengdi Chen, Samuel Susla, Sathya Gunasekaran, Sebastian Markbåge, and Andrew Clark",
    url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023",
    likes: 263,
    user: { username: loggedInUser },
  };

  let user;
  let component;

  beforeEach(() => {
    user = userEvent.setup();
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        addLikes={addLikes}
        loggedInUser={loggedInUser}
        removeBlog={removeBlog}
      />
    ).container;
  });

  test("should only render a blog's title and author by default", () => {
    const blogDetailsContainer = component.querySelector(
      ".Blog--collapsed-view"
    );
    const titleAndAuthor = screen.getByText(`${blog.title} by ${blog.author}`);

    expect(titleAndAuthor).toBeInTheDocument();
    expect(blogDetailsContainer).toBeInTheDocument();
  });

  test("should render a blog's URL and likes when the view button is clicked", async () => {
    const viewButton = screen.getByText("view");

    await user.click(viewButton);

    const blogDetailsContainer = component.querySelector(".Blog--full-view");
    const urlElement = screen.getByText(blog.url);
    const likesELement = screen.getByText(`likes ${blog.likes}`);

    expect(blogDetailsContainer).toBeInTheDocument();
    expect(urlElement).toBeInTheDocument();
    expect(likesELement).toBeInTheDocument();
  });

  test("should increment a blog's likes when the like button is clicked", async () => {
    const likeButton = screen.getByText("like");

    await user.dblClick(likeButton);

    expect(addLikes.mock.calls).toHaveLength(2);
  });
});
