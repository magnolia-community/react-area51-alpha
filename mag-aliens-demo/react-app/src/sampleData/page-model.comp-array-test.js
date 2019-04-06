//Content for: http://localhost:8080/magnoliaAuthor/solar-system/mars/phobos.html

const PAGE_MODEL = {
  "@name": "phobos",
  "@path": "/solar-system/mars/phobos",
  "@id": "74c87299-0cd0-4a1a-9d91-8664cb03c5bb",
  "@nodeType": "mgnl:page",
  "jcr:createdBy": "admin",
  "mgnl:template": "react-aliens:pages/standard",
  "mgnl:createdBy": "superuser",
  "title": "Phobos",
  "left": {
      "@name": "left",
      "@path": "/solar-system/mars/phobos/left",
      "@id": "83fc02df-ba94-48f3-bd50-5211b3724104",
      "@nodeType": "mgnl:area",
      "00": "@test-components[0]",
      "@test-components": [
        {
            "@name": "00",
            "@path": "/solar-system/mars/phobos/left/00",
            "@id": "df19e181-12af-40a0-8033-d0bdbdbdf3d2",
            "@nodeType": "mgnl:component",
            "mgnl:template": "magnolia-aliens:components/slideshow",
            "title": "Best Aliens (Phobos)",
            "main": {
                "@name": "main",
                "@path": "/solar-system/mars/phobos/left/00/main",
                "@id": "8e2a03c7-a887-41e5-af9a-6d775436ba97",
                "@nodeType": "mgnl:area",
                "00": "@test-components[0]",
                "0": "@test-components[1]",
                "@test-components": [
                    {
                        "@name": "00",
                        "@path": "/solar-system/mars/phobos/left/00/main/00",
                        "@id": "91e87d03-6cef-4ce2-b750-a02b93ebd100",
                        "@nodeType": "mgnl:component",
                        "body": "Much, much stupider then as portrayed in the Star Wars franchise.",
                        "mgnl:template": "magnolia-aliens:components/slide",
                        "title": "Porg",
                        "@nodes": []
                    },
                    {
                        "@name": "0",
                        "@path": "/solar-system/mars/phobos/left/00/main/0",
                        "@id": "6e4ea870-73ff-44bf-9d70-b9b3d32c0131",
                        "@nodeType": "mgnl:component",
                        "title": "Phorly",
                        "body": "These microbial beings have evolved spiral formed bodies to efficiently extract nutrients from rock.",
                        "@nodes": []
                    }
                ]
            },
            "@nodes": [
                "main"
            ]
        }
      ]
  },
  "right": {
      "@name": "right",
      "@path": "/solar-system/mars/phobos/right",
      "@id": "5d784855-cc82-4079-bee3-2aef24a5adb1",
      "@nodeType": "mgnl:area",
      "0": "@test-components[0]",
      "@test-components": [
        {
            "@name": "0",
            "@path": "/solar-system/mars/phobos/right/0",
            "@id": "b787cd1a-ffbb-44bb-92a8-a932f9724ea8",
            "@nodeType": "mgnl:component",
            "title": "It's a moon of Mars.",
            "mgnl:template": "magnolia-aliens:components/text-image",
            "@nodes": []
        }
      ]
  },
  "schedule": {
      "@name": "schedule",
      "@path": "/solar-system/mars/phobos/schedule",
      "@id": "ee9c2107-050e-4e42-b03c-f115f15da355",
      "@nodeType": "mgnl:area",
      "@nodes": []
  },
  "@nodes": [
      "left",
      "right",
      "schedule"
  ]
};

export default PAGE_MODEL;
