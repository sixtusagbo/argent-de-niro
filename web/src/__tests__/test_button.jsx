import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/button';

describe('Button', () => {
    test('renders without errors', () => {
        render(<Button label="Test Button" intent="welcoming" />);
    });

    test('renders with correct styles for welcoming intent', () => {
        const { getByText } = render(<Button label="Test Button" intent="welcoming" />);
        const button = getByText('Test Button');

        expect(button).toHaveClass('text-white bg-[#6564DB] border-[#6564DB] w-1/3 px-2 py-2 rounded-3xl text-center text-lg m-4');
    });

    test('renders with correct styles for adding intent', () => {
        const { getByText } = render(<Button label="Test Button" intent="adding" />);
        const button = getByText('Test Button');

        expect(button).toHaveClass('text-white bg-[#191C1B] border-[#191C1B] w-1/4 px-2 py-2 rounded-3xl text-center text-lg m-4');
    });

    test('renders with correct styles for landing intent', () => {
        const { getByText } = render(<Button label="Test Button" intent="landing" />);
        const button = getByText('Test Button');

        expect(button).toHaveClass('text-black bg-[#CBFAE8] border-[#CBFAE8] w-1/2 px-2 py-2 rounded-3xl text-center text-lg m-4');
    });

    test('renders with correct styles for transaction intent', () => {
        const { getByText } = render(<Button label="Test Button" intent="transaction" />);
        const button = getByText('Test Button');

        expect(button).toHaveClass('text-black bg-[#D9D9D9] border-[#D9D9D9] w-3/4 px-2 py-2 rounded-3xl text-center text-lg m-4');
    });
});