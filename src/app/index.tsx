import {FC} from "react";
import classes from './styles.module.css'
import {MainPage} from "@/pages/main";
import {store} from "@/app/model/appStore.ts";
import {Provider} from "react-redux";

export const App: FC = () => {
  return (
      <div className={classes.app}>
          <Provider store={store}>
              <MainPage />
          </Provider>
      </div>
  )
}
