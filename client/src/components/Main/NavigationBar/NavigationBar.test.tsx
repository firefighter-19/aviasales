import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { NavigationBar } from './NavigationBar';

Enzyme.configure({ adapter: new Adapter() });

describe('Check NavigationBar component', () => {
    it("It should return 'NavigationBar' component", () => {
        const sortedByTabTickets = jest.fn();
        const chosenTabId = '1';
        const updateTicketList = jest.fn();
        const navbar = shallow(
            <NavigationBar
                sortedByTabTickets={sortedByTabTickets([])}
                chosenTabId={chosenTabId}
                updateTicketList={updateTicketList}
            />,
        );
        const wrapper = navbar.find('.navigationBar');
        expect(wrapper.length).toBe(1);
    });
});
