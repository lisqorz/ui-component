import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import Menu, {MenuProps} from "./Menu";
import MenuItem from "./MenuItem";
import React from "react";

const testProps: MenuProps = {
    defaultIndex: "0",
    mode: "horizontal",
    className: "test",
    onSelect: jest.fn(),
}

const testVProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical"
}


const generateMenuList = (props: MenuProps) => {
    return (
        <div>
            <Menu {...props}>
                <MenuItem>active</MenuItem>
                <MenuItem disabled={true}>disabled</MenuItem>
                <MenuItem>xyz</MenuItem>
                <li>xyz</li>
            </Menu>
        </div>
    )
}
describe('test menu', () => {
    let wrapper: RenderResult, element: HTMLElement, activeElement: HTMLElement, disableElement: HTMLElement;
    beforeEach(() => {
        wrapper = render(generateMenuList(testProps))
        element = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disableElement = wrapper.getByText('disabled')
    })
    it('h mode', () => {
        expect(element).toBeTruthy()
        expect(element).toHaveClass('viking-menu test')
        // eslint-disable-next-line testing-library/no-node-access
        expect(element.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disableElement).toHaveClass('menu-item is-disabled')
    })
    it('click', () => {
        const thirdItem = wrapper.getByText('xyz');
        
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith("2")

        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1")


    })
    it('v mode', () => {
        cleanup()
        wrapper = render(generateMenuList(testVProps))
        element = wrapper.getByTestId('test-menu')
        expect(element).toHaveClass('menu-vertical')
    })
})