FORMAT: 2A

# Return all the things
Lists all the things from the API222

## Things [/api/test]

### Retrieve all the things [GET]

This is the `application/vnd.siren+json` message resource representation.

+ Response 200 (application/json;charset=UTF-8)

    + Body

        {
            "array|1-10": [
                {
                    "name|+1": [
                        "Hello",
                        "Mock.js",
                        "!"
                    ]
                }
            ]
        }

+ Response 401 (application/json;charset=UTF-8)

### Retrieve all the things [PUT]

+ Response 200 (application/json;charset=UTF-8)

    + Body

        {
            "array|1-10": [
                {
                    "name|+1": [
                        "Hello",
                        "Mock.js",
                        "!"
                    ]
                }
            ]
        }