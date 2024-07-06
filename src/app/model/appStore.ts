import {configureStore} from '@reduxjs/toolkit';
import companiesSlice from '@/widgets/model/companies/companiesSlice';

export const store = configureStore({
    reducer: {
        companies: companiesSlice
    },
})

export type RootState = ReturnType<typeof store.getState>