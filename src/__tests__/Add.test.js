import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Add from "../component/Add";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const defaultStore = {
  inventory: {
    products: [],
    loading: false,
  },
};

function renderComponent(onCloseModalAddMock) {
  const mockStore = configureStore();
  const customStore = mockStore({ ...defaultStore });
  return render(
    <Provider store={customStore}>
      <Add
        func={jest.fn()}
        onCloseModalAdd={onCloseModalAddMock}
        openAdd={jest.fn()}
      />
    </Provider>
  );
}

describe("Add modal", () => {
  afterEach(cleanup);
  it("should call onClose function when submit is clicked", () => {
    const onCloseModalAddMock = jest.fn();
    renderComponent(onCloseModalAddMock);
    userEvent.click(screen.getByText("Submit"));
    expect(onCloseModalAddMock).toBeCalledTimes(1);
  });

  it("should call onClose function when cancel is clicked", () => {
    const onCloseModalAddMock = jest.fn();
    renderComponent(onCloseModalAddMock)
    userEvent.click(screen.getByText("Cancel"));
    expect(onCloseModalAddMock).toBeCalledTimes(1);
  });

  it("should ensure texts are visible on the modal screen", () => {
    const onCloseModalAddMock = jest.fn();
    renderComponent(onCloseModalAddMock)
    const modalText = [
      "Product Name",
      "Selling Price",
      "Cost Price",
      "Mutti Price",
      "Insurance Price",
      "How it's sold",
    ];
    modalText.forEach((text) => {
      const screenText = screen.getByText(new RegExp(`\\b${text}\\b`));
      expect(screenText).toBeInTheDocument();
    });
  });
});
