import React from 'react'
import Alert, {AlertType} from "./Alert";
import {storiesOf} from '@storybook/react'

const defaultAlert = () => {
    return (<Alert message={'标题'} closeable={false}/>)
}

const cancelable = () => {
    return (<Alert message={'标题'} description={'详情'}/>)
}
const all = () => {
    return (
        <div>
            <Alert type={AlertType.Default} message={'标题'} description={'详情'}/>
            <br/>
            <Alert type={AlertType.Danger} message={'标题'} description={'详情'}/>
            <br/>
            <Alert type={AlertType.Success} message={'标题'} description={'详情'}/>
            <br/>
            <Alert type={AlertType.Warning} message={'标题'} description={'详情'}/>
        </div>
    )
}
storiesOf('alert', module)
    .add('Alert', defaultAlert)
    .add('cancelable', cancelable)
    .add('所有', all)