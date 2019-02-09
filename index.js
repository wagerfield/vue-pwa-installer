function install(Vue) {
  if (install.installed) return
  install.installed = true

  var installEvent = null
  var installer = Vue.observable({
    hasInstalled: false,
    canInstall: false,
    choice: null
  })

  installer.prompt = function prompt() {
    if (installEvent) installEvent.prompt()
  }

  Object.defineProperty(Vue.prototype, "$installer", {
    get: function() {
      return installer
    }
  })

  function handleUserChoice(choice) {
    installer.choice = choice.outcome
  }

  function handleInstallPrompt(event) {
    installEvent = event
    installEvent.preventDefault()
    installEvent.userChoice.then(handleUserChoice)
    localStorage.hasInstalledPWA = false
    installer.hasInstalled = false
    installer.canInstall = true
  }

  function handleAppInstalled() {
    localStorage.hasInstalledPWA = true
    installer.hasInstalled = true
    installer.canInstall = false
    installEvent = null
  }

  function updateHasInstalled() {
    installer.hasInstalled = localStorage.hasInstalledPWA === "true"
  }

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", handleInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)
    setTimeout(updateHasInstalled, 100)
  }
}

module.exports = {
  install: install
}
