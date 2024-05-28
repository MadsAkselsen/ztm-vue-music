export default {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/*.vue', { eager: true }) // Updated path
    for (const path in baseComponents) {
      const component = baseComponents[path].default
      app.component(component.name, component)
    }
  }
}
