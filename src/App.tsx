import React from "react";
import Button, {ButtonSize, ButtonType} from './components/Button/Button'
import Alert from "./components/Alert/Alert";
import Menu from "./components/Menu";
import Icon from "./components/Icon";
import Input from "./components/Input";

const App: React.FC = () => {
    return (
        <div className="App">
            <Button btnType={ButtonType.Danger} size={ButtonSize.Large} onClick={(e) => {
                console.log(e)
            }}>hhh</Button>
            <Button btnType={ButtonType.Default} size={ButtonSize.Large}>hhh</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hhh</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large} disabled={true}>disable</Button>
            <Button btnType={ButtonType.Link} disabled={true} href={"baidu.com"}>disable Link</Button>
            <Button btnType={ButtonType.Link} href={"baidu.com"}>link</Button>
            <Alert message={"hello alert!"} description={"123"}/>
            <Alert message={"hello alert!"}/>
            <Alert message={"hello alert!"} closeable={false}/>
            <Menu defaultIndex={"0"} mode={'vertical'} onSelect={(index) => {
            }}
                  defaultOpenSubMenus={[]}
            >
                <Menu.Item>1</Menu.Item>
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
            <Icon icon={"arrow-down"} theme={"danger"} size={"10x"}/>
            <Input prepend={<span>金额：</span>} append={<span>元</span>}/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
export default App