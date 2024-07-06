import classes from './styles.module.css';
import {ChangeEvent, FC} from "react";
import {Button, Checkbox, Icon} from "@/shared/components";

interface IProps {
    data: {
        id: number;
        isChecked?: boolean;
        name: string;
        address?: string;
    }
    onEdit: (id: number) => void;
    onCheck: (id: number, isChecked: boolean) => void;
}

export const Company: FC<IProps> = (props) => {
    const {
        data: {
            id,
            isChecked = false,
            name,
            address
        },
        onEdit,
        onCheck
    } = props;

    const editHandler = () => {
        onEdit(id);
    }

    const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onCheck(id, e.target.checked);
    }
    return (
        <li className={`${classes.company} ${isChecked && classes.checked}`}>
            <div className={classes.column}>
                <Checkbox value={isChecked} onCheck={checkHandler}  />
            </div>
            <div className={classes.column}>
                <span title={name} className={classes.name}>{name}</span>
            </div>
            <div className={classes.column}>
                {address &&
                    <span title={address} className={classes.address}>{address}</span>
                }
            </div>
            <div className={classes.column}>
                <Button customClass={classes.btn} onClick={editHandler}>
                    <Icon customClass={classes.icon} iconName={'edit'}/>
                </Button>
            </div>
        </li>
    )
}
