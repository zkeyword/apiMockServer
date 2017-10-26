FORMAT: A1
FORMAT: A1
FORMAT: A1

# 认证和授权服务API

认证和授权服务的API接口，该接口属于`uaa-service`服务。

注意：

- 由于网关的原因，在第一个版本中需要在url前面添加`/uaa-service`


#  认证 [/v0.1/auth/tokens]

用于认证。用户登录系统（请求生成一个token）以后，系统生成一个访问token对象，并返回给用户。

访问token分为两种，MacToken和BearerToken。具体请参考[《访问安全设计方案》](http://doc.dynamax.io/document/design/auth-design.html)

## 创建Token（登录） [POST /v0.1/auth/tokens]

用户通过该接口获得认证信息。

+ Request (application/json)

        {
            "username": "",
            "password": ""
        }

+ Response 201

        {
            "accessToken": "",   //用户认证的token
            "refreshToken": "",  //用于刷新认证token的token
            "expiresAt": "",    //token的到期时间，格式：2017-10-30T10:27:09.904+0800
            "algorithm": "hmac-sha-256",    //加密算法
            "secret": "",   //加密算法的密钥
            "serverTime": "",   //服务器时间，格式：2017-10-23T10:27:09.907+0800
            "tokenType": ""  //Token的类型，值有：MAC，Bearer等
        }
    
## 获得认证token信息 [GET /v0.1/auth/tokens/{token}]

根据accessToken值获得认证token信息。

+ Parameters
    + token (string) - 认证token信息的accessToken值

+ Response 200 (application/json)

        {
            "accessToken": "",   //用户认证的token
            "refreshToken": "",  //用于刷新认证token的token
            "expiresAt": "",    //token的到期时间，格式：2017-10-30T10:27:09.904+0800
            "algorithm": "hmac-sha-256",    //加密算法
            "secret": "",   //加密算法的密钥
            "serverTime": "",   //服务器时间，格式：2017-10-23T10:27:09.907+0800
            "tokenType": ""  //Token的类型，值有：MAC，Bearer等
        }

## 删除Token（登出） [DELETE /v0.1/auth/tokens/{token}]

用户登出系统。

+ Parameters

    + token (string) - 认证token信息的accessToken值
    
+ Request
    + Headers
    
        Authorization: MAC id="",nonce="",mac=""

+ Response 204

