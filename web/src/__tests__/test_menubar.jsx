import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menubar from '../components/menubar';

describe('Menubar', () => {
    test('renders without errors', () => {
        render(<Menubar />);
    });

    test('changes active item on menu item click', () => {
        const { getByText } = render(<Menubar />);
        const homeMenuItem = getByText('Home');
        const budgetMenuItem = getByText('Budget');

        fireEvent.click(homeMenuItem);
        expect(homeMenuItem).toHaveClass('text-black bg-[D9D9D9] text-xl');
        expect(budgetMenuItem).toHaveClass('text-white text-xl text-center');

        fireEvent.click(budgetMenuItem);
        expect(homeMenuItem).toHaveClass('text-white text-xl text-center');
        expect(budgetMenuItem).toHaveClass('text-black bg-[D9D9D9] text-xl');
    });
});