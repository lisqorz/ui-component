import React from 'react';
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string
}

// 使用 & 混合对象，即可以 是A类型 又可以是B类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLAnchorElement>
// Partial 使对象内部参数可选化
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 第一个Button组件
 * ~~~js
 * import {Button} from 'vikingship'
 * ~~~
 * */
const Button: React.FC<ButtonProps> = (props) => {
    const {
        className,
        btnType,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props;
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })

    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classes} {...restProps} href={href}>{children}</a>
        )
    }
    return (
        <button
            className={classes}
            disabled={disabled}
            {...restProps}
        >{children}</button>
    )
};
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;