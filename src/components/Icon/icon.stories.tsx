import {storiesOf} from "@storybook/react";
import React from "react";
import Icon from "./Icon";
import {withInfo} from '@storybook/addon-info'


const all = () => {
    return (
        <div>
            <Icon icon={"arrow-down"} theme={"danger"} size={"1x"}/>
            <br/>
            <Icon icon={"arrow-left"} theme={"success"} size={"1x"}/>
            <br/>
            <Icon icon={"address-book"} theme={"info"} size={"1x"}/>
        </div>
    )
}
storiesOf('Icon', module)
    .addDecorator(withInfo)
    .add('所有', all)