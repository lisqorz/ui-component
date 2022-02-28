import React from "react";
import {UploadFile} from "./Upload";
import Icon from "../Icon/Icon";
import classNames from "classnames";
import Progress from "../Progress/Progress";


export interface UploadListProps {
    className?: string,
    fileList: UploadFile[],
    onRemove: (_file: UploadFile) => void
}

const UploadList: React.FC<UploadListProps> = (props) => {
    const {className, fileList, onRemove} = props
    const classes = classNames('vipking-upload-list', className)
    return (
        <ul className={classes}>
            {
                fileList.map(file => {
                    return (
                        <li className={"viking-upload-list-item"} key={file.uid}>
                            <Icon icon={"file-alt"} theme={"secondary"}/>
                            <span className={`file-name file-name-${file.status}`}>{file.name}</span>
                            <span className={"file-status"}>
                                {file.status === "uploading" && <Icon icon={"spinner"} spin/>}
                                {file.status === "success" && <Icon icon={"check-circle"}/>}
                                {file.status === "error" && <Icon icon={"times-circle"}/>}
                                {/*{file.status === "ready" && <Icon icon={""}/>}*/}
                            </span>
                            <span className={"file-actions"}>
                                <Icon icon={"times-circle"} onClick={() => {
                                    onRemove(file)
                                }}/>
                            </span>
                            {file.status === 'uploading' && <Progress percent={file.percent} showText={true} strokeHeight={10}/>}

                        </li>
                    )
                })
            }
        </ul>
    )
}
export default UploadList