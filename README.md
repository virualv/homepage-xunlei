# homepage-xunlei
fullPage.js+webpack模仿迅雷首页  

![预览图](https://raw.githubusercontent.com/yshenhua/homepage-xunlei/gh-pages/preview.gif)

## 优化配置
- 处理图片文件（小于1k的转为base64，其余的压缩80%）
- 提取样式文件
- 分离第三方代码和业务代码
- 长缓存优化

## 下载运行
``` bash
# download the project
git clone https://github.com/yshenhua/homepage-xunlei.git

# install dependencies
cd homepage-xunlei && npm install

# serve at localhost:3000
npm run dev

# build for production with minification
npm run build
```

## 在线预览
<https://yshenhua.github.io/homepage-xunlei>
