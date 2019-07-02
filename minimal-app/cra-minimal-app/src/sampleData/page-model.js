//Content for: http://localhost:8080/magnoliaAuthor/solar-system/mars/phobos.html

const PAGE_MODEL = {
  "@name": "cra-minimal-page",
  "@path": "/cra-minimal",

  "@id": "74c87299-0cd0-4a1a-9d91-8664cb03c5bb",
  "@nodeType": "mgnl:page",
  "jcr:createdBy": "admin",
  "mgnl:template": "cra-minimal:pages/standard",
  "mgnl:createdBy": "superuser",
  title: "CRA Minimal Page",

  right: {
    "@name": "right",
    "@path": "/cra-minimal/right",
    "@id": "5d784855-cc82-4079-bee3-2aef24a5adb1",
    "@nodeType": "mgnl:area",
    "0": {
      "@name": "0",
      "@path": "/cra-minimal/right/0",
      "@id": "b787cd1a-ffbb-44bb-92a8-a932f9724ea8",
      "@nodeType": "mgnl:component",
      title: "It's a moon of Mars.",
      "mgnl:template": "cra-minimal:components/text-image",
      "@nodes": []
    },

    "1": {
      "@name": "0",
      "@path": "/cra-minimal/right/0",
      "@id": "fake-b787cd1a-ffbb-44bb-92a8-a932f9724ea8",
      "@nodeType": "mgnl:component",
      title: "It's a moon of Mars.",
      "mgnl:template": "cra-minimal:components/text-image",
      "@nodes": []
    },

    "@nodes": ["0", "1"]
  },

  "@nodes": ["right"]
};

export default PAGE_MODEL;
