const TEMPLATE_DEFINITIONS = {
  "react-aliens:pages/home": {
    id: "react-aliens:pages/home",
    name: "home",
    title: "React Train station page",
    templateScript: "/react-aliens/templates/pages/home.ftl",
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
    modelPath:
      "/magnolia-aliens/templates/common/definition-extractor-model.js",
    areas: {
      left: {
        id: null,
        name: "left",
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
            id: "magnolia-aliens:components/title",
            enabled: true
          },
          subtitle: {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/subtitle",
            enabled: true
          },
          "text-image": {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/text-image",
            enabled: true
          },
          slideshow: {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/slideshow",
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
      },
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
            id: "magnolia-aliens:components/title",
            enabled: true
          },
          subtitle: {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/subtitle",
            enabled: true
          },
          "text-image": {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/text-image",
            enabled: true
          },
          slideshow: {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/slideshow",
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
      },
      schedule: {
        id: null,
        name: "schedule",
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
            id: "magnolia-aliens:components/time-table",
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
  "magnolia-aliens:components/text-image": {
    id: "magnolia-aliens:components/text-image",
    name: "text-image",
    title: "Train Station Text image",
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
    dialog: "magnolia-aliens:components/text-image",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    personalizable: null,
    areas: {}
  },
  "magnolia-aliens:components/time-table": {
    id: "magnolia-aliens:components/time-table",
    name: "time-table",
    title: "Train Station Time table",
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
    dialog: "magnolia-aliens:components/time-table",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    personalizable: null,
    areas: {}
  },
  "magnolia-aliens:components/slideshow": {
    id: "magnolia-aliens:components/slideshow",
    name: "slideshow",
    title: "Slide Show",
    templateScript: "magnolia-aliens/templates/components/slideshow.ftl",
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
    dialog: "magnolia-aliens:components/slideshow",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    personalizable: null,
    areas: {
      main: {
        id: null,
        name: "main",
        title: null,
        templateScript: null,
        renderType: null,
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
          "text-image": {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/text-image",
            enabled: true
          },
          slide: {
            roles: [],
            permissions: null,
            id: "magnolia-aliens:components/slide",
            enabled: true
          }
        },
        enabled: null,
        optional: null,
        contentStructure: null,
        inheritance: null,
        maxComponents: null,
        createAreaNode: true,
        areas: {}
      }
    }
  },
  "magnolia-aliens:components/slide": {
    id: "magnolia-aliens:components/slide",
    name: "slide",
    title: "Slide",
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
    dialog: "magnolia-aliens:components/slide",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    personalizable: null,
    areas: {}
  },
  "magnolia-aliens:components/subtitle": {
    id: "magnolia-aliens:components/subtitle",
    name: "subtitle",
    title: "Train Station Subtitle",
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
    dialog: "magnolia-aliens:components/subtitle",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    personalizable: null,
    areas: {}
  },
  "magnolia-aliens:components/title": {
    id: "magnolia-aliens:components/title",
    name: "title",
    title: "Train Station Title",
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
    dialog: "magnolia-aliens:components/title",
    templateAvailability: {},
    type: "content",
    subtype: null,
    editable: null,
    moveable: null,
    deletable: null,
    writable: null,
    personalizable: null,
    areas: {}
  }
};

export default TEMPLATE_DEFINITIONS;
