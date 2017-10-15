FORMAT: 1A

# Return all the things
Lists all the things from the API

## Things [/api/test]

### Retrieve all the things [GET]

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
