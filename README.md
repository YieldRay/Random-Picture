# Random-Picture

通过随机发送`url.csv`文件中给出的图床链接来实现一个随机图片 API

## 演示地址:

<https://miku.x10.mx/> _(无稳定性保证)_  
<https://random-picture.vercel.app/> _(部署到 vercel，访问此地址查看使用说明)_

> 演示图片来自<https://www.pixiv.net/users/8236670>

## 部署到 Vercel

请 fork 后，修改自己仓库的 `url.csv`，然后在 Vercel 平台上导入自己的项目  
你也可以直接修改<https://github.com/YieldRay/Random-Picture/blob/master/url.csv>来创建 fork  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FYieldRay%2FRandom-Picture)

## 部署到虚拟主机

上传至虚拟主机即可

## 伪静态

伪静态是可选的。  
开启伪静态后支持以<https://example.net/:id.png>形式访问  
例如 <https://random-picture.vercel.app/1.jpg> <https://random-picture.vercel.app/2.jpg>  
Apache 和 Vercel 环境无需配置，默认支持伪静态。  
Nginx 参照以下配置：

```nginx
location / {
        if (!-e $request_filename) {
            rewrite  ^(\w)*\.(?:jpg|jpeg|png|gif|bmp|webp)$  /api/index.php?id=$1  last;
        }
}
```

## Deno 版本

Deno 版本需要你能够托管一个文本文件，并获取这个文本文件的网址  
下面托管在 Github

登录<https://dash.deno.com/>  
![deno.png](https://s2.loli.net/2022/03/20/tLITdUB4kWHe7VO.png)  
点击 `New Playground`  
![deno2.png](https://s2.loli.net/2022/03/20/h53uRYrnmQxwAz1.png)  
进入<https://github.com/YieldRay/Random-Picture/blob/master/test/deno.ts>  
或者复制<https://github.com/YieldRay/Random-Picture/raw/master/test/deno.ts>所有代码  
删除编辑器所有原有代码，再将复制的代码粘贴，最后点击 `✔ Saved & Deployed` 即可
