import type { App} from "vue";

export default {
    install: (app: App, options: any) => {
      // введение глобально доступного метода $translate()
      app.config.globalProperties.$translate = (key: string, locale: string = 'en') => {
        // получить вложенное свойство в `options`,
        // используя `key` в качестве пути
        return key.split('.').reduce((o: any, i: string) => {
          if (o && o[locale]) return o[locale][i]
        }, options)
      }
    }
}

