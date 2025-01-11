import type { App} from "vue";

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string, locale?: string) => string
  }
}


export default {
    install: (app: App, options: any) => {
      app.config.globalProperties.$translate = (key: string, locale: string = 'en') => {

        return key.split('.').reduce((o: any, i: string) => {
          if (o && o[locale]) return o[locale][i]
        }, options)
      }
    }
}

