# Random-Picture

通过随机发送 `url.csv` 文件中给出的图床链接来实现一个随机图片 API  
本仓库含 php(vercel), deno(deno.dev) 版本，API 一致  
另外给出了 node.js 实现，仅供测试  
作为一个简易的 API， 切勿在 `url.csv` 中添加过多的图片地址

## 演示

-   <https://random-picture.vercel.app/> _(vercel, php 版本)_
-   <https://random-picture.vercel.app/random.jpg>
-   <https://random-picture.vercel.app/api/>
-   <https://random-picture.vercel.app/api/?json>

-   <https://rand.deno.dev/> (deno 版本)
-   <https://rand.deno.dev/?json>
-   <https://rand.deno.dev/?raw>
-   <https://rand.deno.dev/?id=3>
-   <https://rand.deno.dev/3.jpg>
-   <https://rand.deno.dev/random.png?raw>

> 演示图片来自<https://www.pixiv.net/users/8236670>

## php 部署到 Vercel

fork 后，修改自己仓库的 `url.csv`，然后在 Vercel 平台上导入自己的项目  
你也可以直接修改<https://github.com/YieldRay/Random-Picture/blob/master/url.csv>来创建 fork  
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FYieldRay%2FRandom-Picture)

## php 部署到虚拟主机

支持 php >= 5.3  
直接将下载项目然后上传至虚拟主机即可，此时 API 路径在 `./api` 文件夹下  
或者下载项目的 `./api/index.php` 和 `./url.csv` ，将这两个文件上传至同一目录即可

## deno 部署到 deno.dev

Deno 版本需要你能够托管一个文本文件，文件格式同 `./url.csv`  
获取这个文本文件的链接。例如：`https://raw.githubusercontents.com/YieldRay/Random-Picture/master/url.csv`  
[![Deploy to Deno](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/YieldRay/Random-Picture/master/test/deno.ts&env=RECORD_URL)点击此按钮  
将链接填入环境变量  
![deno.png](https://s2.loli.net/2022/04/28/ajWebXNYfw7Mtpv.png)  
也可以部署后在此修改环境变量  
![deno2.png](https://s2.loli.net/2022/04/28/VtMBlj1Uuxysboc.png)

## php 伪静态

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
