# Vue PWA Installer

Adds an `$installer` interface to [Vue instances][vue-instances] for [installing Progressive Web Apps][app-install-banners].

    yarn add vue-pwa-installer

## Setup

```js
import Vue from "vue"
import VueInstaller from "vue-pwa-installer"

Vue.use(VueInstaller, { /* options */ })
```

## Usage

```vue
<template>
  <div>
    <div v-if="$installer.canInstall">
      <button @click="$installer.prompt">
    </div>
    <p v-if="$installer.choice">
      User {{$installer.choice}} prompt.
    </p>
    <p v-if="$installer.hasInstalled">
      App installed successfully.
    </p>
  </div>
</template>
```

## Interface

| Key          | Type     | Description                                                                          |
| :----------- | :------- | :----------------------------------------------------------------------------------- |
| prompt       | Function | Prompt the user to install the PWA when available.                                   |
| choice       | String?  | User choice following `prompt` dialog. Either `null`, `"accepted"` or `"dismissed"`. |
| canInstall   | Boolean  | Can the app be installed via `prompt`.                                               |
| hasInstalled | Boolean  | Has the app been installed.                                                          |

**NOTE:** Support for the underlying API is [limited][browser-support].

## Options

| Key          | Type   | Default         | Description                                           |
| :----------- | :----- | :-------------- | :---------------------------------------------------- |
| prototypeKey | String | $installer      | Vue prototype key to add the installer instance to.   |
| storageKey   | String | hasInstalledPWA | LocalStorage key to store installed state of the PWA. |

## Nuxt

To [inject][nuxt-inject] a PWA installer into a Nuxt application:

```js
// plugins/installer.js
import Vue from "vue"
import { createInstaller } from "vue-pwa-installer"

export default (context, inject) => {
  const installer = createInstaller(Vue, { /* options */ })
  inject("$installer", installer)
}
```

The `$installer` interface will now be available in Vue components, Nuxt's `app` instance and the Vuex store.

## Author

[Matthew Wagerfield][github]

## License

[MIT][mit]

[vue-instances]: https://vuejs.org/v2/guide/instance
[nuxt-inject]: https://nuxtjs.org/guide/plugins#combined-inject
[app-install-banners]: https://developers.google.com/web/fundamentals/app-install-banners
[browser-support]: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent#Browser_compatibility
[mit]: https://opensource.org/licenses/MIT
[github]: https://github.com/wagerfield
