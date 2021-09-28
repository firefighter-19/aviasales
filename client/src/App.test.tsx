import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('It should render App component', () => {
    it("Its should return 'App' component", () => {
        const AppComponent = shallow(<App />);
        const wrapper = AppComponent.find('.app');
        expect(wrapper.length).toBe(1);
    });
});
