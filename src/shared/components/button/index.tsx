import classes from './styles.module.css'
import {FC, ReactNode, MouseEvent} from "react";

interface IProps {
    type?: 'button' | 'submit' | 'reset'
    customClass?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export const Button: FC<IProps> = (props) => {
    const {
        type = 'button',
        customClass,
        onClick,
        children
    } = props;
    return (
        <button type={type} className={customClass || classes.btn} onClick={onClick}>
            {children}
        </button>
    )
}