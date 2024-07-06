import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import classes from './styles.module.css';
import {Button, Icon, Input} from "@/shared/components";
import {CompanyType, ModeType, CompanyNewDataType} from "@/shared/types";

interface IProps {
    mode?: ModeType;
    data?: CompanyType;
    onSubmit: (mode: ModeType, newData: CompanyNewDataType) => void;
    onClose?: () => void;
}

export const CompanyForm: FC<IProps> = (props) => {
    const {
        mode = 'add',
        data,
        onSubmit,
        onClose
    } = props;

    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (data) {
            setCompanyName(data.name);
            data.address && setAddress(data.address);
        }
    }, [data])

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('');
        }
        setCompanyName(e.target.value);
    }

    const changeAddressHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!companyName) {
            setError('Обязательное поле');
            return;
        }

        const newData: CompanyNewDataType = {
            name: companyName,
            address
        }

        if (mode === 'edit' && data) {
            (newData as CompanyType).id = data.id;
            (newData as CompanyType).isChecked = data.isChecked;
        }
        onSubmit(mode, newData);
        setCompanyName('');
        setAddress('');
        setError('');
    }

    const closeHandler = () => {
        setError('');
        onClose && onClose();
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Button customClass={classes.btn} onClick={closeHandler}>
                <Icon customClass={classes.icon} iconName={'close'} />
            </Button>
            <legend className={classes.title}>
                {mode === 'add'
                    ? 'Добавление'
                    : 'Редактирование'
                }
            </legend>
            <Input
                label={'Название компании:'}
                placeholder={'Введите название...'}
                value={companyName}
                onChange={changeNameHandler}
                error={error}
            />
            <Input
                label={'Адрес компании:'}
                placeholder={'Введите адрес...'}
                value={address}
                onChange={changeAddressHandler}
            />
            <Button type={'submit'}>
                Сохранить
            </Button>
        </form>
    )
}
