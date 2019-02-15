const { createLocalVue, mount } = require("@vue/test-utils")
const { install, createInstaller } = require("./index")

const installerShape = {
  prompt: expect.any(Function),
  hasInstalled: false,
  canInstall: false,
  choice: null
}

const wrap = (options) => {
  const template = "<div/>"
  const localVue = createLocalVue()
  localVue.use({ install }, options)
  return mount({ template }, { localVue })
}

test("install", () => {
  const wrapper = wrap()
  expect(wrapper.isVueInstance()).toBeTruthy()
  expect(wrapper.vm.$installer).toMatchObject(installerShape)
})

test("options", () => {
  const prototypeKey = "$foo"
  const wrapper = wrap({ prototypeKey })
  expect(wrapper.isVueInstance()).toBeTruthy()
  expect(wrapper.vm[prototypeKey]).toMatchObject(installerShape)
})

test("createInstaller", () => {
  const localVue = createLocalVue()
  const installer = createInstaller(localVue)
  expect(installer).toMatchObject(installerShape)
})
