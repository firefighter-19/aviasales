import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Checkbox } from './Checkbox';

Enzyme.configure({ adapter: new Adapter() });

describe('Checkbox component testing', () => {
    it("It should return 'Checkbox' component", () => {
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
    it('It should return Checkboxes components due to checkbox array length', () => {
        const checkboxes = [
            { id: '1', text: 'Без пересадок', checked: false, stops: 0 },
            { id: '3', text: '1 пересадки', checked: false, stops: 1 },
            { id: '2', text: '2 пересадка', checked: false, stops: 2 },
            { id: '4', text: '3 пересадки', checked: false, stops: 3 },
        ];
        const handleChangeCheckBox = jest.fn();
        const checkboxesArray = checkboxes.map((checkbox) => {
            return shallow(
                <Checkbox
                    id={checkbox.id}
                    text={checkbox.text}
                    checked={checkbox.checked}
                    handleChangeCheckBox={handleChangeCheckBox}
                />,
            );
        });
        expect(checkboxesArray).toMatchSnapshot();
    });
    it("It should change 'checked' in checkbox", () => {
        const props = { id: '4', text: '3 пересадки', checked: true, stops: 3 };
        const handleChangeCheckBox = jest.fn();
        const checkbox = shallow(
            <Checkbox
                id={props.id}
                text={props.text}
                checked={props.checked}
                handleChangeCheckBox={handleChangeCheckBox}
            />,
        );
        checkbox.find('input').forEach((node) => {
            expect(node.props().checked).toEqual(true);
        });
    });
});
