export type CompanyType = {
    id: number;
    isChecked: boolean;
    name: string;
    address?: string;
}

export type CompanyNewDataType = CompanyType | Pick<CompanyType, "name" | "address">

export type ModeType = 'edit' | 'add';