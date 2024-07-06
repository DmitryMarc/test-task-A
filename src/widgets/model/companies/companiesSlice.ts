import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CompanyType} from "@/shared/types";
import {companies} from "@/shared/assets/mocks";

type CompaniesStateType = {
    companies: CompanyType[];
    currentPage: number;
    latestPage: number;
}

const limit = 10

export const initialState: CompaniesStateType = {
    companies: companies.slice(0, limit) || [],
    currentPage: 1,
    latestPage: Math.ceil(companies.length / limit)
}

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        loadMoreItems(state, action: PayloadAction<number>) {
            const firstIndex = state.currentPage * limit;
            const lastIndex = firstIndex + limit
            state.currentPage = action.payload;
            const newItems = companies.slice(firstIndex, lastIndex);
            state.companies.push(...newItems);
        },
        addCompany(state, action: PayloadAction<Omit<CompanyType, "id" | "isChecked">>) {
            const {name, address} = action.payload;
            const newCompany = {
                id: state.companies[0]?.id + 1 || 0,
                isChecked: false,
                name,
                address
            };
            state.companies.unshift(newCompany);
        },
        editCompany(state, action: PayloadAction<CompanyType>) {
            const {id} = action.payload;
            let foundIndex = state.companies.findIndex(item => item.id === id);
            if (foundIndex >= 0) {
                state.companies.splice(foundIndex, 1, action.payload);
            }
        },
        deleteCompanies(state, action: PayloadAction<number[]>) {
            state.companies = state.companies.filter(item => !action.payload.includes(item.id))
        },
        checkCompany(state, action: PayloadAction<{ id: number, isChecked: boolean }>) {
            const {id, isChecked} = action.payload;

            const foundIndex = state.companies.findIndex(item => item.id === id);
            if (foundIndex >= 0) {
                state.companies[foundIndex].isChecked = isChecked;
            }
        },
        selectAllCompanies(state, action: PayloadAction<boolean>) {
            const isAllSelected = action.payload;
            if (isAllSelected) {
                state.companies = state.companies.map(item => {
                    if (!item.isChecked) {
                        item.isChecked = true;
                    }
                    return item;
                })
            } else {
                state.companies = state.companies.map(item => {
                    if (item.isChecked) {
                        item.isChecked = false;
                    }
                    return item;
                })
            }
        }
    }
})

export const {
    loadMoreItems,
    addCompany,
    editCompany,
    deleteCompanies,
    checkCompany,
    selectAllCompanies
} = companiesSlice.actions
export default companiesSlice.reducer