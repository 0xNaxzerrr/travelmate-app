import React from 'react';
import renderer from 'react-test-renderer';
import TripCard from '../../src/components/TripCard';

describe('<TripCard />', () => {
  const mockTrip = {
    id: '1',
    title: 'Paris',
    date: '15-20 Jan 2025',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<TripCard trip={mockTrip} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});