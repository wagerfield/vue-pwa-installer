function getOptions(options) {
  return Object.assign({
    prototypeKey: "$installer",
    storageKey: "hasInstalledPWA"
  }, options)
}

function createInstaller(Vue, installerOptions) {
  var options = getOptions(installerOptions)
  var storageKey = options.storageKey

  var installEvent = null
  var installer = Vue.observable({
    hasInstalled: false,
    canInstall: false,
    choice: null
  })

  installer.prompt = function prompt() {
    if (installEvent) installEvent.prompt()
  }

  function handleUserChoice(choice) {
    installer.choice = choice.outcome
  }

  function handleInstallPrompt(event) {
    installEvent = event
    installEvent.preventDefault()
    installEvent.userChoice.then(handleUserChoice)

    installer.hasInstalled = false
    installer.canInstall = true

    if (storageKey) localStorage[storageKey] = false
  }

  function handleAppInstalled() {
    if (storageKey) localStorage[storageKey] = true

    installer.hasInstalled = true
    installer.canInstall = false

    installEvent = null
  }

  function updateHasInstalled() {
    installer.hasInstalled = localStorage[storageKey] === "true"
  }

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", handleInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)
    if (storageKey) setTimeout(updateHasInstalled, 100)
  }

  return installer
}

function install(Vue, pluginOptions) {
  if (install.installed) return
  install.installed = true

  var options = getOptions(pluginOptions)
  var installer = createInstaller(Vue, pluginOptions)

  Object.defineProperty(Vue.prototype, options.prototypeKey, {
    get: function() {
      return installer
    }
  })
}

module.exports = {
  createInstaller: createInstaller,
  install: install
}
