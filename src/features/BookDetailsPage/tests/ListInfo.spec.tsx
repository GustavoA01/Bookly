import { render } from "@testing-library/react";
import { ListInfo } from "../components/BookInfo/ListInfo";

describe("ListInfo", () => {
  it("should render list names when lists are provided", () => {
    render(
      <ListInfo
        lists={[
          { id: "1", name: "Favorites" },
          { id: "2", name: "To Read" },
        ]}
      />,
    );

    expect(document.querySelector("button")).toBeInTheDocument();
    expect(document.querySelector("button")?.textContent).toContain(
      "Favorites",
    );
    expect(
      document.querySelector("button:nth-child(2)")?.textContent,
    ).toContain("To Read");
  });
});
