# mockServer

给apiblueprint补充mockjs的功能，实现apiblueprint不能随机的缺点，支持markdown上传编辑，支持多个项目数据mock。

#### 目录结构

    / 根目录
    |__ bin node启动相关
    |__ config 中间件配置
    |__ public 前端开发目录
    |__ script sql、初始化等相关脚本
    |__ src 后端开发目录
    |   |__ controllers 控制器
    |   |__ dao 数据模型层
    |   |__ middleware 中间件
    |   |__ routes 路由
    |   |__ services 业务层
    |   |__ views 模板
    |   |__ app.js 应用入口文件
    |__ upload 上传目录
    |__ .eslintrc.js eslint脚本检查配置
    |__ package.json npm依赖管理


#### 相关命令

- 安装依赖

    npm i

- 启动项目

    npm run dev 