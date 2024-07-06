import classes from './styles.module.css';
import {ChangeEvent, FC, useId} from "react";

interface IProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const Input: FC<IProps> = (props) => {
    const {
        label,
        type,
        placeholder,
        value,
        onChange,
        error
    } = props;

    const id = useId();
    return (
        <div className={classes.container}>
            {label &&
                <label htmlFor={id}>
                    {label}
                </label>
            }
            <input
                id={id}
                className={classes.input}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {error &&
                <small className={classes.error}>
                    {error}
                </small>
            }
        </div>
    )
}