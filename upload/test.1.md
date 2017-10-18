FORMAT: 2A

# test 资源

这个是test资源的相关操作

## Things [/api/test]

### Retrieve all the things [GET]

This is the `application/vnd.siren+json` message resource representation.

+ Response 200 (application/json;charset=UTF-8)

    + Headers

        X-My-Message-Header: 42

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
                        "@image()"
                    ]
                }
            ]
        }