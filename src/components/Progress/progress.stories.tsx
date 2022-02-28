import {storiesOf} from "@storybook/react";
import {withInfo} from '@storybook/addon-info'
import Icon from "../Icon";
import React from "react";
import Progress from "./Progress";

const all = () => {
    return (
        <div>
            <Progress percent={30} strokeHeight={10} theme={"primary"}/>
            <br/>
            <Progress percent={50} strokeHeight={10} theme={"success"} showText={true}/>
            <br/>
        </div>
    )
}
storiesOf('Progress', module)
    .addDecorator(withInfo)
    .add('所有', all)