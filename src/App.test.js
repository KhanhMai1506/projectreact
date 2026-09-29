import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

test('renders app layout with page content', () => {
  render(
    <MemoryRouter initialEntries={['/blog']}>
      <App>
        <main>Blog content</main>
      </App>
    </MemoryRouter>
  );

  expect(screen.getByAltText(/e-shopper/i)).toBeInTheDocument();
  expect(screen.getByText(/blog content/i)).toBeInTheDocument();
});
