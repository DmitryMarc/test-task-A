import {FC, useState, UIEvent, useRef} from "react";
import classes from './styles.module.css';
import {Company} from "@/entities/company";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCheckedCompaniesIds,
    selectCompanies,
    selectCurrentPage,
    selectLatestPage
} from "@/widgets/model/companies/selectors";
import {
    addCompany,
    checkCompany,
    deleteCompanies,
    editCompany, loadMoreItems,
    selectAllCompanies
} from "@/widgets/model/companies/companiesSlice";
import {Button, Checkbox, Modal} from "@/shared/components";
import {CompanyForm} from "@/widgets";
import {CompanyNewDataType, CompanyType, ModeType} from "@/shared/types";

export const CompaniesList: FC = () => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [editableData, setEditableData] = useState<CompanyType>();
    const [resetKey, setResetKey] = useState(0);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const listRef = useRef<HTMLUListElement | null>(null);

    const dispatch = useDispatch();
    const companies = useSelector(selectCompanies);
    const checkedCompaniesIds = useSelector(selectCheckedCompaniesIds);
    const currentPage = useSelector(selectCurrentPage);
    const latestPage = useSelector(selectLatestPage);

    const checkHandler = (id: number, isChecked: boolean) => {
        dispatch(checkCompany({id, isChecked}))
    }

    const selectAllHandler = () => {
        setIsAllSelected(!isAllSelected);
        dispatch(selectAllCompanies(!isAllSelected));
    }

    const editHandler = (id: number) => {
        const findItem = companies.find(item => item.id === id);
        if (findItem) {
            setEditableData(findItem);
            setIsModalShown(true);
            setMode('edit');
        }
    }

    const submitHandler = async (mode: ModeType, newData: CompanyNewDataType) => {
        switch (mode){
            case 'add':
                await dispatch(addCompany(newData));
                listRef.current?.scrollTo({top: 0, behavior: 'smooth'});
                break;
            case 'edit':
                dispatch(editCompany(newData as CompanyType));
                break;
        }
        closeHandler();
    }

    const deleteHandler = async () => {
        if (checkedCompaniesIds.length) {
            await dispatch(deleteCompanies(checkedCompaniesIds));
            resizeHandler();
            isAllSelected && setIsAllSelected(false);
        }
    }

    const showModalHandler = () => {
        setIsModalShown(true);
    }

    const closeHandler = () => {
        setIsModalShown(false);
        setEditableData(undefined);
        setMode('add');
        setResetKey(prev => prev + 0.001);
    }

    const loadMoreItemsHandler = (e: UIEvent<HTMLUListElement>) => {
        let element = e.currentTarget;
        const offset = element.scrollHeight - element.scrollTop;
        const height = element.clientHeight;
        if (offset === height && currentPage < latestPage) {
            dispatch(loadMoreItems(currentPage + 1))
        }
    }

    const resizeHandler = () => {
        if (listRef.current) {
            let element = listRef.current;
            if (element.scrollHeight <= element.clientHeight && currentPage < latestPage) {
                dispatch(loadMoreItems(currentPage + 1));
            }
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.btns}>
                <Button onClick={showModalHandler} >
                    Добавить
                </Button>
                {!!checkedCompaniesIds.length
                    && (
                        <Button onClick={deleteHandler}>
                            Удалить выбранное
                        </Button>
                    )
                }
            </div>

            {companies.length
                ? (
                    <ul
                        ref={listRef}
                        className={classes.list}
                        onScroll={loadMoreItemsHandler}
                        onTouchMove={loadMoreItemsHandler}
                    >
                        <li className={classes.header}>
                            <h2 className={classes.title}>Компании</h2>
                            <Checkbox label={'Выделить всё'} value={isAllSelected} onCheck={selectAllHandler} />
                        </li>
                        {companies.map(item => (
                            <Company key={item.id} data={item} onEdit={editHandler} onCheck={checkHandler} />
                        ))}
                    </ul>
                )
                : (
                    <span>Данных нет</span>
                )
            }

            <Modal isShown={isModalShown} onClose={closeHandler}>
                <CompanyForm
                    key={resetKey}
                    mode={mode}
                    data={editableData}
                    onSubmit={submitHandler}
                    onClose={closeHandler}
                />
            </Modal>
        </div>
    )
}
