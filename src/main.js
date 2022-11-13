import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import i18n from '@/i18n'
import '@/router/permission'
import * as ELIcons from '@element-plus/icons-vue'
import filters from "./utils/filters";

const app = createApp(App)
// 图标
for(const iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
// 时间过滤
filters(app)
app.use(store).use(router).use(i18n).mount('#app')
