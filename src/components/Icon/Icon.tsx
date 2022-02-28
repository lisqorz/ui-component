import React from 'react';
import {FontAwesomeIconProps, FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames";


library.add(fas)

export type ThemeProps = 'primary' | 'success' | 'info' | 'warning' | 'secondary' |'danger'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
    const {className, theme, ...restProps} = props
    const classes = classNames('viking-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
};

export default Icon;