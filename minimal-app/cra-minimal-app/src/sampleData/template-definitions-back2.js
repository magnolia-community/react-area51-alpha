//Content for: http://localhost:8080/magnoliaAuthor/solar-system/mars/phobos.html

const TEMPLATE_DEFINITIONS = {
  "cra-minimal:pages/standard": {
    id: "cra-minimal:pages/standard",
    name: "standard",
    title: "Standard Alien Page",
    templateScript: "/cra-minimal/templates/pages/standard.ftl",
    renderType: "freemarker",
    description: null,
    i18nBasename: null,
    modelClass:
      "info.magnolia.module.jsmodels.rendering.JavascriptRenderingModel",
    autoGeneration: {
      content: {},
      generatorClass: null
    },
    variations: {},
    autoPopulateFromRequest: null,
    fragmentDefinition: null,
    parameters: {},
    visible: true,
    dialog: null,
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    modelPath: "/cra-minimal/templates/common/definition-extractor-model.js",
    areas: {
      right: {
        id: null,
        name: "right",
        title: null,
        templateScript: null,
        renderType: "freemarker",
        description: null,
        i18nBasename: null,
        modelClass: null,
        autoGeneration: {
          content: {},
          generatorClass: null
        },
        variations: {},
        autoPopulateFromRequest: null,
        fragmentDefinition: null,
        parameters: {},
        visible: null,
        dialog: null,
        templateAvailability: {},
        type: null,
        subtype: null,
        editable: null,
        moveable: null,
        deletable: null,
        writable: null,
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
        enabled: null,
        optional: null,
        contentStructure: null,
        inheritance: null,
        maxComponents: null,
        createAreaNode: null,
        areas: {}
      }
    }
  },
  "cra-minimal:components/title": {
    id: "cra-minimal:components/title",
    name: "title",
    title: "Alien Title",
    templateScript: null,
    renderType: "freemarker",
    description: null,
    i18nBasename: null,
    modelClass: null,
    autoGeneration: {
      content: {},
      generatorClass: null
    },
    variations: {},
    autoPopulateFromRequest: null,
    fragmentDefinition: null,
    parameters: {},
    visible: null,
    dialog: "cra-minimal:components/title",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    areas: {}
  },

  "cra-minimal:components/text-image": {
    id: "cra-minimal:components/text-image",
    name: "text-image",
    title: "Alien Text image",
    templateScript: null,
    renderType: "freemarker",
    description: null,
    i18nBasename: null,
    modelClass: null,
    autoGeneration: {
      content: {},
      generatorClass: null
    },
    variations: {},
    autoPopulateFromRequest: null,
    fragmentDefinition: null,
    parameters: {},
    visible: null,
    dialog: "cra-minimal:components/text-image",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    areas: {}
  }
};

export default TEMPLATE_DEFINITIONS;
