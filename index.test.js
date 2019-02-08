const { createLocalVue, mount } = require("@vue/test-utils")
const VueInstaller = require("./index")

const localVue = createLocalVue()

localVue.use(VueInstaller)

test(name, () => {
  const wrapper = mount({
    template: "<div/>",
  }, {
    localVue
  })

  expect(wrapper.isVueInstance()).toBeTruthy()
})
