import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Checkbox } from './Checkbox';

Enzyme.configure({ adapter: new Adapter() });

describe('Checkbox component testing', () => {
    it("Its should return 'Checkbox' component", () => {
        const props = { id: '1', text: 'Без пересадок', checked: false };
        const handleChangeCheckBox = jest.fn();
        const checkbox = shallow(
            <Checkbox
                id={props.id}
                text={props.text}
                checked={props.checked}
                handleChangeCheckBox={handleChangeCheckBox}
            />,
        );
        const checkboxContainer = checkbox.find('.checkbox__container');
        expect(checkboxContainer.length).toBe(1);
    });
});
