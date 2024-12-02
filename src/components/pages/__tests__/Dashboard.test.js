import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock the @nivo/line module
jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="chart">Mocked Chart Component</div>
}));

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  test('renders main dashboard sections', () => {
    renderWithTheme(<Dashboard />);
    
    // Check for main sections
    expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  test('renders activity list with items', () => {
    renderWithTheme(<Dashboard />);
    
    // Check for activity items
    const activityItems = screen.getAllByText(/Activity \d/);
    expect(activityItems).toHaveLength(5);
    
    // Check for activity descriptions
    const descriptions = screen.getAllByText(/Description for activity \d/);
    expect(descriptions).toHaveLength(5);
  });
});
