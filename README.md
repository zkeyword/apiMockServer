# mockServer

给apiblueprint补充mockjs的功能，实现apiblueprint不能随机的缺点，支持markdown上传编辑，支持多个项目数据mock。

- 其中暂不支持Function部分

- 添加SOCKET写法，由于http本身没有SOCKET方法，所以用固定的形式：

    [SOCKET /control_center/v0.1/devices/counts/constructions/{constructionId}/{countBy}]

#### 目录结构

    / 根目录
    |__ bin node启动相关
    |__ config 中间件配置
    |__ public 前端开发目录
    |__ src 后端开发目录
    |   |__ middleware 中间件
    |   |__ models 数据模型层
    |   |__ routes 路由
    |   |__ services 业务层
    |   |__ views 模板
    |   |__ app.js 应用入口文件
    |__ upload 上传目录
    |__ .eslintrc.js eslint脚本检查配置
    |__ package.json npm依赖管理


#### 环境依赖

- node 6+

- mysql


#### 相关命令

- 安装依赖

    npm i

- 启动项目

    npm run dev

#### 相关文档

+ [API Blueprint 教程](https://apiblueprint.org/documentation/tutorial.html)
+ [Mockjs 实例](http://mockjs.com/examples.html)

#### TODO LIST

- 支持markdown在线编辑
- 渲染apiBlueprint解析的数据
- 支持多个项目
- 支持简单的用户模块，支持后台管理
- json语法检查
