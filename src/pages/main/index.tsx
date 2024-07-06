import classes from './styles.module.css'
import {CompaniesList} from "@/widgets";
import {FC} from "react";

export const MainPage: FC = () => {
    return (
        <div className={classes.page}>
            <CompaniesList />
        </div>
    )
}
