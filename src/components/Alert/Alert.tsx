import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}

interface BaseAlertProps {
    message: string,
    description?: string,
    closeable?: boolean,
    type?: AlertType,
    className?: string
}


const Alert: React.FunctionComponent<BaseAlertProps> = props => {
    const {
        className,
        message,
        description,
        type,
        closeable
    } = props

    const refCloseable = useRef(null)
    const classes = classNames('viking-alert', className, {
        [`alert-${type}`]: type,
    });
    return (
        <div className={classes} ref={refCloseable}>

            <span className={description&&'alert-title'}>{message}</span>
            {description && <span className={"alert-description"}>{description}</span>}
            {closeable &&
                <div
                    className={"alert-closeable"}
                    onClick={
                        (e) => {
                            refCloseable?.current?.remove()
                        }
                    }
                >
                    x
                </div>
            }

        </div>
    );
};

Alert.defaultProps = {
    closeable: true,
    type: AlertType.Default,
    description: '',
};

export default Alert;
