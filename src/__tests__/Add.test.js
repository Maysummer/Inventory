import { render, cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Add from '../component/Add'

describe("Add modal", () => {
    afterEach(cleanup);
    it("should call onClose function when submit is clicked", () => {
      const onCloseModalAddMock = jest.fn();
      render(
        <Add
          func = {jest.fn()}
          onCloseModalAdd= {onCloseModalAddMock}
          openAdd= {jest.fn()}
        />
      );
      userEvent.click(screen.getByText("Submit"));
      expect(onCloseModalAddMock).toBeCalledTimes(1);
    });

    it("should call onClose function when cancel is clicked", () => {
      const onCloseModalAddMock = jest.fn();
      render(
        <Add
          func = {jest.fn()}
          onCloseModalAdd= {onCloseModalAddMock}
          openAdd= {jest.fn()}
        />
      );
      userEvent.click(screen.getByText("Cancel"));
      expect(onCloseModalAddMock).toBeCalledTimes(1);
    });

    it("texts should be visible on the screen", () => {
      const onCloseModalAddMock = jest.fn();
      render(
        <Add
          func = {jest.fn()}
          onCloseModalAdd= {onCloseModalAddMock}
          openAdd= {jest.fn()}
        />
      );
      const modalText = ['Product Name', 'Selling Price', 'Cost Price', 'Mutti Price', 'Insurance Price', 'How it\'s sold']
      modalText.forEach(text => {
        const screenText = screen.getByText(new RegExp(`\\b${text}\\b`));
        expect(screenText).toBeInTheDocument();
      });
    })
  });