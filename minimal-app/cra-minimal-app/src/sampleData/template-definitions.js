//Content for: http://localhost:8080/magnoliaAuthor/solar-system/mars/phobos.html

const TEMPLATE_DEFINITIONS = {
  "cra-minimal:pages/standard": {
    id: "cra-minimal:pages/standard",
    name: "standard",
    title: "Standard Alien Page",
    templateScript: "/cra-minimal/templates/pages/standard.ftl",
    modelClass:
      "info.magnolia.module.jsmodels.rendering.JavascriptRenderingModel",
    autoGeneration: {
      content: {},
      generatorClass: null
    },
    modelPath: "/cra-minimal/templates/common/definition-extractor-model.js",
    areas: {
      right: {
        name: "right",
        availableComponents: {
          title: {
            roles: [],
            permissions: null,
            id: "cra-minimal:components/title",
            enabled: true
          },
          "text-image": {
            roles: [],
            permissions: null,
            id: "cra-minimal:components/text-image",
            enabled: true
          }
        },
        areas: {}
      }
    }
  },

  "cra-minimal:components/title": {
    id: "cra-minimal:components/title",
    name: "title",
    title: "Alien Title",
    templateScript: null,
    dialog: "cra-minimal:components/title",
    areas: {}
  },

  "cra-minimal:components/text-image": {
    id: "cra-minimal:components/text-image",
    name: "text-image",
    title: "Alien Text image",
    templateScript: null,
    dialog: "cra-minimal:components/text-image",
    areas: {}
  }
};

export default TEMPLATE_DEFINITIONS;
