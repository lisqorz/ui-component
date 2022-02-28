import axios from "axios";
import React, {ChangeEvent, MouseEvent, useRef, useState} from "react";
import Button, {ButtonType} from "../Button/Button";
import UploadList from "./UploadList";
import Dragger from "./Dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string,
    size: number,
    name: string,
    status?: UploadFileStatus,
    percent: number,
    raw?: File,
    response?: any,
    error?: any
}

export interface UploadProps {
    drag?: boolean,
    defaultFileList: UploadFile[],
    className?: string,
    action: string,
    beforeUpload?: (file: File) => boolean | Promise<File>,
    onProgress?: (percentage: number, file: File) => void,
    onChange?: () => void,
    onSuccess?: (data: any, file: File) => void,
    onError?: (err: any, file: File) => void,
    onRemoved?: (file: UploadFile) => void
}


const Upload: React.FC<UploadProps> = (props) => {
    const {
        drag,
        action,
        className,
        children,
        beforeUpload,
        onProgress,
        onChange,
        onSuccess,
        onError,
        onRemoved,
        defaultFileList,
        ...restProps
    } = props;

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

    const refFileInput = useRef<HTMLInputElement>()
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        refFileInput.current.click()
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return;
        }
        uploadFiles(files)
        if (refFileInput.current) {
            refFileInput.current.value = ''
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        console.log(postFiles, 'postfiles')
        postFiles.forEach(file => {
            if (beforeUpload) {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(progressFile => {
                        post(progressFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            } else {
                post(file)
            }
        })
    }

    const updateFileList = (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => {
        setFileList(prevState => {
            return prevState.map(file => {
                if (file.uid === uploadFile.uid) {
                    return {...file, ...uploadFile}
                }
                return file
            })
        })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList((prevState => {
            return fileList.filter(item => item.uid !== file.uid)
        }))
        if (onRemoved) {
            onRemoved(file)
        }
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        console.log('fileList', fileList)
        const formData = new FormData();
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (e) => {
                console.log(e, 'onUploadProgress')
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(response => {
            console.log(response)
            updateFileList(_file, {status: 'success', response: response.data})
            if (onSuccess) {
                onSuccess(response.data, file)
            }
            if (onChange) {
                onChange()
            }
        }).catch(err => {
            updateFileList(_file, {status: 'error', response: err})
            onError(err, file)
            if (onChange) {
                onChange()
            }
        })
    }
    return (
        <div className={'viking-upload-component'}>
            <div className={className}
                 style={{display: "inline-block"}}
                 onClick={handleClick}
                 {...restProps}
            >
                {drag ? <Dragger onFile={(fileList) => {
                    uploadFiles(fileList)
                }}>{children}</Dragger> : children}
            </div>
            <input ref={refFileInput} onChange={handleFileChange} className={"viking-file-input"} type={"file"}
                   style={{display: "none"}}/>
            <UploadList onRemove={handleRemove} fileList={fileList}/>
        </div>
    )
}
export default Upload