FORMAT: 1A

# Named Endpoints API
This API example demonstrates how to define a standalone endpoint with an identifier.


# Group Quick start

## Create message [POST /messages]

Start out by creating a message for the world to see.

+ Request (application/json)

        { "message": "Hello World!" }

+ Response 201

    + Headers

            Location: /messages/1337

## Create a new task [POST /tasks]

Now create a task that you need to do at a later date.

+ Request (application/json)

        {
            "name": "Exercise in gym",
            "done": false,
            "type": "task"
        }

+ Response 201

    + Headers

            Location: /tasks/1992