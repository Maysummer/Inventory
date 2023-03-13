import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from "redux-mock-store";

const defaultStore = {
  inventory: {
    products: [],
    loading: false,
  },
};

function renderComponent() {
  const mockStore = configureStore();
  const customStore = mockStore({ ...defaultStore });
  return render(
    <Provider store={customStore}>
      <App />
    </Provider>
  );
}

test('renders page', () => {
  renderComponent();
  const heading = screen.getByText(/product inventory/i);
  expect(heading).toBeInTheDocument();
});