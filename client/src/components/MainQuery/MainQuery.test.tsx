import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MainQuery } from './MainQuery';

Enzyme.configure({ adapter: new Adapter() });

describe('Check MainQuery component', () => {
    it('It should return wrapper when loaded with no error', () => {
        const fetch = shallow(<MainQuery />);
        const wrapper = fetch.find('p');
        console.log('wrapper.length ===========>: ', wrapper.length);
        expect(wrapper.length).toBe(1);
    });
});
