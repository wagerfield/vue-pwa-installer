function install(Vue) {
  if (install.installed) return
  install.installed = true

  var installEvent = null

  function prompt() {
    if (installEvent) installEvent.prompt()
  }

  function getter(value) {
    return {
      get: function() {
        return value
      }
    }
  }

  var vm = new Vue({
    data: {
      choice: null,
      canInstall: false,
      hasInstalled: false
    }
  })

  if (typeof Vue.prototype.$installer === "undefined") {
    var installer = Object.create(null)
    Object.defineProperties(installer, {
      hasInstalled: getter(vm.hasInstalled),
      canInstall: getter(vm.canInstall),
      choice: getter(vm.choice),
      prompt: getter(prompt)
    })
    Object.defineProperty(Vue.prototype, "$installer", getter(installer))
  }

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", function(event) {
      event.preventDefault()
      event.userChoice.then(function(choice) {
        vm.choice = choice.outcome
      })

      installEvent = event

      vm.canInstall = true
      vm.hasInstalled = false
    })

    window.addEventListener("appinstalled", function() {
      vm.hasInstalled = true
      vm.canInstall = false
    })
  }
}

module.exports = {
  install: install
}
