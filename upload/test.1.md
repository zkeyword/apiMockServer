FORMAT:1A
HOST: http://api.dev.dynamax.io/boss

#企业信息
> 企业信息维护、查询

## Data Structures
### Institute 
+ name:福建德诺迈斯信息技术有限公司 (string,required) - 企业名称
+ type:互联网和软件     (string) - 企业行业分类
+ fax:075588251673      (number) - 传真
+ artificialPerson:蔡剑斌   (string,required)- 法人
+ phone:05925194586         (string)    - 企业电话
+ bank: 6225882019870231    (string)    - 银行帐号
+ address:厦门市思明区吕岭路1806号802   (string,required) - 企业地址
+ contact:张三  (string,required)  - 企业联系人
+ contactNumber:13607821913(string,required)    - 企业联系人电话
+ adminAccount:dynamax_admin    (string,required)    - 企业管理员帐号
+ adminPassword:dys@!321        (string,required)    - 企业管理员密码
+ attachments:(array[string]) - 企业相关附件
    + http://www.baidu.com/1.jpg
    + http://www.baidu.com/2.jpg
+ salesman:王丹      (string)    - 业务员
+ salesmanNumber:18023410932 (string)  - 业务员电话
+ updateBy:张三       (string)    - 最近更新人姓名
+ updateTime:2017-06-16T13:23:42Z       - 最近更新时间
+ creatorName:张三    (string)    - 创建人姓名
+ createTime:2017-07-16T17:25:47Z   (string)    - 创建时间

# 企业信息 [/v0.1/institutes]

+ Attributes (Institute)

## 新增企业信息 [POST]

+ Request (application/json)
    
    + Attributes (Institute)

+ Response 201 (application/json)

    + Attributes (Institute)

## 修改企业信息 [PUT /v0.1/institutes/{institute_id}]

+ Parameters
    + institute_id (Number) - 企业ID

+ Request (application/json)

    + Attributes (Institute)

+ Response 201 (application/json)

    + Attributes (Institute)
    


## 删除企业信息 [DELETE /v0.1/institutes/{institute_id}]

+ Parameters
    + institute_id (Number) - 企业ID

+ Response 204

## 获取指定企业信息 [GET /v0.1/institutes/{institute_id}]


+ Parameters
    + institute_id (Number) - 企业ID

+ Response 200 (application/json)
    
    + Attributes (Institute)

## 获取企业信息列表 [GET /v0.1/institutes{?page}{?size}]

+ Parameters
    + page: 0  (optional,number) - 页码
    + size: 10 (optional,number) - 每页大小

+ Response 200 (application/json)
    + Attributes (array[Institute])
