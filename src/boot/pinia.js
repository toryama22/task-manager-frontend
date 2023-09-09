import { boot } from "quasar/wrappers";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

export default boot(({ app }) => {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedState)
  app.use(pinia);

});
