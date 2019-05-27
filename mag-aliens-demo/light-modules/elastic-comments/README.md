# elastic-comments

## Setup

### Create Index

```json
PUT / comments
```

### Create Mappings

```json
PUT comments/_mapping/comment
{
    "properties": {
        "name":     { "type": "keyword"  },
        "message":     { "type": "text"  },
        "page":      { "type": "keyword" },
        "time":  {
            "type":   "date",
            "format": "strict_date_optional_time||epoch_millis"
        }
    }
}
```

## Notes

### Interesting Reading

<https://scotch.io/tutorials/build-an-airbnb-clone-with-react-and-elasticsearch>

<https://codeburst.io/how-to-build-an-e-commerce-search-ui-with-react-and-elasticsearch-a581c823b2c3>
