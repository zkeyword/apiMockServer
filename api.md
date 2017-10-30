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


# 项目管理

用于项目管理的api

##  添加项目 [POST /v0.1/api/project]

+ Request (application/json)

        {
            "name": "apiMockService",
            "alias": "123456",
            "description": "apiMock"
        }

+ Response 200

        {
            "id": 3,
            "name": "apiMockService",
            "alias": "123456",
            "description": "apiMock"
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }
    
## 获取项目列表 [GET /v0.1/api/project/{id}]

+ Parameters
    + id (string) - 项目id

+ Response 200 (application/json)

        {
            "id": 3,
            "name": "apiMockService",
            "alias": "123456",
            "description": "apiMock"
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }

## 删除项目 [DELETE /v0.1/api/project/{id}]

+ Parameters
    + id (string) - 项目id

+ Response 204

## 修改项目 [PUT /v0.1/api/project/{id}]

+ Parameters
    + id (string) - 项目id

+ Request (application/json)

        {
            "name": "apiMockService",
            "alias": "123456",
            "description": "apiMock"
        }

+ Response 200

        {
            "id": 3,
            "name": "apiMockService",
            "alias": "123456",
            "description": "apiMock"
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }


# 接口管理

用于接口管理的api

##  添加接口 [POST /v0.1/api/interfaces]

+ Request (application/json)

        {
            "name": "apiMockService",
            "content": "123456"
        }

+ Response 200

        {
            "id": 3,
            "name": "apiMockService",
            "content": "123456"
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }
    
## 获取接口列表 [GET /v0.1/api/interfaces/{id}]

+ Parameters
    + id (string) - 接口id

+ Response 200 (application/json)

        {
            "id": 3,
            "name": "apiMockService",
            "content": "123456"
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }

## 删除接口 [DELETE /v0.1/api/interfaces/{id}]

+ Parameters
    + id (string) - 接口id

+ Response 204

## 修改接口 [PUT /v0.1/api/interfaces/{id}]

+ Parameters
    + id (string) - 接口id

+ Request (application/json)

        {
            "name": "apiMockService",
            "content": "123456"
        }

+ Response 200

        {
            "id": 3,
            "name": "apiMockService",
            "content": "123456"
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }