import classes from './styles.module.css';
import {FC} from "react";
import {sprite} from "@/shared/assets/icons";

interface IProps {
    customClass?: string;
    iconName?: 'check' | 'edit' | 'close' | string;
}

export const Icon: FC<IProps> = ({customClass, iconName}) => {
    return (
        <div className={customClass}>
            <svg className={classes.icon}>
                <use href={`${sprite}#${iconName}`}/>
            </svg>
        </div>
    )
}