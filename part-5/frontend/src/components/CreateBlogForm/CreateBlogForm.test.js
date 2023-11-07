import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("<CreateBlogForm />", () => {
  const createBlog = jest.fn();
  const blog = {
    title: "React Labs: What We've Been Working On – March 2023",
    author:
      "Joseph Savona, Josh Story, Lauren Tan, Mengdi Chen, Samuel Susla, Sathya Gunasekaran, Sebastian Markbåge, and Andrew Clark",
    url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023",
  };

  let user;
  beforeEach(() => {
    user = userEvent.setup();
    render(<CreateBlogForm createBlog={createBlog} />);
  });

  test("should call createBlog with provided details when the form is submitted", async () => {
    const createButton = screen.getByText("create");
    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");

    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);
    await user.click(createButton);

    expect(createBlog).toHaveBeenCalledWith(blog);
  });
});
