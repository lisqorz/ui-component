import {storiesOf} from '@storybook/react'
import React from 'react'
import {withInfo} from '@storybook/addon-info'
import Upload, {UploadFile} from "./Upload";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

const filelist: UploadFile[] = [];
// [
//     {
//         uid: "1",
//         name: "ceshi",
//         size: 1,
//         status: "ready",
//         percent: 0
//     }, {
//         uid: "2",
//         name: "ceshi",
//         size: 1,
//         status: "uploading",
//         percent: 100
//     }
//     , {
//         uid: "3",
//         name: "ceshi",
//         size: 1,
//         status: "success",
//         percent: 100
//     }, {
//         uid: "4",
//         name: "ceshi",
//         size: 1,
//         status: "error",
//         percent: 50
//     }
// ]

const normalButton = () => {
    const action = "https://jsonplaceholder.typicode.com/posts"
    return (
        <Upload action={action}
                onError={(e, file) => {
                    console.log(e, file)
                }}
                onProgress={(percentage, file) => {
                    console.log(percentage, file, "progress")
                }}
                defaultFileList={filelist}><Button>点击上传</Button></Upload>
    )
}
const dragButton = () => {
    const action = "https://jsonplaceholder.typicode.com/posts"
    return (
        <Upload action={action}
                drag={true}
                onError={(e, file) => {
                    console.log(e, file)
                }}
                onProgress={(percentage, file) => {
                    console.log(percentage, file, "progress")
                }}
                defaultFileList={filelist}>
            <Icon icon={'upload'}/>
        </Upload>
    )
}
storiesOf('Upload组件', module)
    .addDecorator(withInfo)
    .add("Upload", normalButton)
    .add("dragUpload", dragButton)