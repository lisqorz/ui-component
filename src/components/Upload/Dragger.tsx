import React, {FC, useState, DragEvent} from 'react';
import {ClassNames} from "@emotion/core";
import classNames from "classnames";

export interface DraggerProps {
    onFile: (files: FileList) => void
}

const Dragger: FC<DraggerProps> = (props) => {
    const {children,onFile} = props
    const [drag, setDrag] = useState(false);

    const handleDrop = (e:DragEvent<HTMLElement>)=>{
        e.preventDefault()
        setDrag(false)
        onFile(e.dataTransfer.files)
    }

    const handleDrag = (e: DragEvent<HTMLElement>, drag) => {
        e.preventDefault()
        setDrag(drag)
    }
    const classes = classNames('viking-uploader-dragger', {
        'is-dragover': drag
    })
    return (
        <div className={classes}
             onDragOver={e => handleDrag(e, true)}
             onDragLeave={e => handleDrag(e, false)}
             onDrop={handleDrop}
        >
            {children}
        </div>
    );
}

export default Dragger;