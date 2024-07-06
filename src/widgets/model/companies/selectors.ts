import {createSelector} from "@reduxjs/toolkit";
export const selectCompanies = (state: RootState) => state.companies.companies;
export const selectCheckedCompaniesIds = createSelector([selectCompanies], (companies) => {
    const ids = [];
    for (const item of companies) {
        if (item.isChecked) {
            ids.push(item.id)
        }
    }
    return ids;
});

export const selectCurrentPage = (state: RootState) => state.companies.currentPage;
export const selectLatestPage = (state: RootState) => state.companies.latestPage;