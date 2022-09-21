import { Footer, Header } from "./layouts"
import Router from "./router"
import { Provider } from "mobx-react";
import StarWarsStore from "./store/StarWarsStore"

export const StarWarsApp = () => {
  return (
    <Provider StarWarsStore={StarWarsStore} >
      <Header />
      <Router />
      <Footer />
    </Provider>
  )
}

