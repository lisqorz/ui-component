import React from 'react'
import {cleanup, fireEvent, render, RenderResult, screen} from '@testing-library/react'

import Button, {ButtonProps, ButtonSize, ButtonType} from "./Button";

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: "class"
}
const alinkProps:ButtonProps = {
    href:"baidu.com",
    btnType:ButtonType.Link
}
const disableProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}


describe('', () => {
    it('default button', () => {
        const view = render(<Button {...defaultProps}>Nice</Button>)
        const element = view.queryByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn btn-default')
        expect(element.tagName).toEqual('BUTTON')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('primary button', () => {
        const view = render(<Button {...testProps} >Nice</Button>)
        const element = view.queryByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn btn-primary class btn-lg')
    })
    it ('a button',()=>{
        const view = render(<Button {...alinkProps}>Nice</Button>)
        const element = view.queryByText('Nice')
        expect(element.tagName).toEqual('A')
    })
    it('disabled button', () => {
        const view = render(<Button {...disableProps}>Nice</Button>)
        const element = view.queryByText('Nice')
        expect(element).toBeInTheDocument()
        fireEvent.click(element)
        expect(disableProps.onClick).not.toHaveBeenCalled()
    })
})

