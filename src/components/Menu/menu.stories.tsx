import {storiesOf} from "@storybook/react";
import {withInfo} from '@storybook/addon-info'
import React from "react";
import Menu from "./index";

const h = () => {
    return (
        <div>
            <Menu defaultIndex={"0"} mode={'horizontal'} onSelect={(index) => {
            }}
                  defaultOpenSubMenus={[]}
            >
                <Menu.Item>子标题1</Menu.Item>
                <Menu.SubMenu title={"dropdown"}>
                    <Menu.Item>dropdown</Menu.Item>
                    <Menu.Item disabled={true}>dropdown</Menu.Item>
                    <Menu.Item>dropdown</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={"dropdown2"}>
                    <Menu.Item>dropdown</Menu.Item>
                    <Menu.Item disabled={true}>dropdown</Menu.Item>
                    <Menu.Item>dropdown</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}
const v = () => {
    return (
        <div>
            <Menu defaultIndex={"0"} mode={'vertical'} onSelect={(index) => {
            }}
                  defaultOpenSubMenus={[]}
            >
                <Menu.Item>子标题1</Menu.Item>
                <Menu.SubMenu title={"dropdown"}>
                    <Menu.Item>dropdown</Menu.Item>
                    <Menu.Item disabled={true}>dropdown</Menu.Item>
                    <Menu.Item>dropdown</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={"dropdown2"}>
                    <Menu.Item>dropdown</Menu.Item>
                    <Menu.Item disabled={true}>dropdown</Menu.Item>
                    <Menu.Item>dropdown</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}
storiesOf('menu', module)
    .addDecorator(withInfo)
    .add('竖列', v)
    .add('横向', h)