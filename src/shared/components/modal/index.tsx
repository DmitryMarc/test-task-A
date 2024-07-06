import classes from './styles.module.css';
import {FC, ReactNode, MouseEvent, useEffect, useRef} from "react";

interface IProps {
    isShown: boolean;
    onClose: () => void;
    children: ReactNode
}

export const Modal: FC<IProps> = ({isShown, onClose, children}) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (isShown) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isShown])
    return (
        <dialog ref={modalRef} onClick={onClose} className={classes.modal}>
            <div
                className={classes.content}
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                {children}
            </div>
        </dialog>
    )
}