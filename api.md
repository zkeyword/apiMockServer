# 用户管理

用于用户管理的api

##  添加用户 [POST /v0.1/api/users]

+ Request (application/json)

        {
            "username": "apiMockService",
            "password": "123456",
            "nick": "apiMock"
        }

+ Response 200

        {
            "id": 3,
            "username": "1",
            "password": "1",
            "nick": "1",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }
    
## 获取用户列表 [GET /v0.1/api/users/{id}]

+ Parameters
    + id (string) - 用户id

+ Response 200 (application/json)

        {
            "id": 3,
            "username": "1",
            "password": "1",
            "nick": "1",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }

## 删除用户 [DELETE /v0.1/api/users/{id}]

+ Parameters
    + id (string) - 用户id

+ Response 204

## 修改用户 [PUT /v0.1/api/users/{id}]

+ Parameters
    + id (string) - 用户id

+ Request (application/json)

        {
            "username": "apiMockService",
            "password": "123456",
            "nick": "apiMock"
        }

+ Response 200

        {
            "id": 3,
            "username": "1",
            "password": "1",
            "nick": "1",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }