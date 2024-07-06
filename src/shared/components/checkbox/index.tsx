import classes from './styles.module.css';
import {ChangeEvent, FC, useId} from "react";
import {Icon} from "@/shared/components";

interface IProps {
    label?: string;
    value: boolean;
    onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<IProps> = ({label, value, onCheck}) => {
    const id = useId();
    return (
        <div className={classes.container}>
            <label htmlFor={id} className={classes.label}>
                {value
                    ? <Icon customClass={classes.checkbox} iconName={'check'} />
                    : <Icon customClass={classes.checkbox}/>
                }
                {label &&
                    <span>{label}</span>
                }
            </label>
            <input
                id={id}
                type="checkbox"
                className={classes.input}
                checked={value}
                onChange={onCheck}
            />
        </div>
    )
}