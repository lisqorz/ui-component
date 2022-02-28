import { storiesOf } from '@storybook/react'
import React from 'react'
import Button, { ButtonType } from './Button'
import {action} from "@storybook/addon-actions";
import {withInfo} from '@storybook/addon-info'

const normalButton = ()=>{
    return (
            <Button onClick={action('clicked')}>Click Me</Button>
    )
}
storiesOf('Button组件',module)
    .addDecorator(withInfo)
.add("Button",normalButton)