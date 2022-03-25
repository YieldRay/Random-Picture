# Random-Picture

通过随机发送`url.csv`文件中给出的图床链接来实现一个随机图片 API  
本仓库含 php(vercel), node.js(vercel), deno(deno.dev) 版本，API 一致

## 演示

-   <https://random-picture.vercel.app/> _(vercel 演示)_
-   <https://random-picture.vercel.app/api/> _(vercel, php 版本)_
-   <https://random-picture.vercel.app/random.jpg>
-   <https://random-picture.vercel.app/api/?json>
-   <https://random-picture.vercel.app/api/node/> _(vercel, nodejs 版本)_
-   <https://random-picture.vercel.app/api/node/?json>

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
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FYieldRay%2FRandom-Picture)  
php 版本也可以直接上传到虚拟主机

## node.js 部署到 Vercel

![env.png](https://s2.loli.net/2022/03/25/ocECsXr2v1aKShG.png)
部署到 vercel 后设置环境变量 `RECORD_URL` 为图片地址，或直接修改源码给定位置  
如果你已经 frok 了本项目，环境变量填入`https://raw.githubusercontents.com/YieldRay/Random-Picture/master/url.csv`即可  
**注意将用户名换为你自己的 Github 用户名**  
当然你也可以自行托管此文本，但是每次修改需要重新部署才能获取到更新后的地址

nodejs 及 deno 版本每次部署时将图床地址读入内存，因此 API 不宜托管过多图床链接

## deno 部署到 deno.dev

Deno 版本需要你能够托管一个文本文件，并获取这个文本文件的网址。下面托管在 Github

登录<https://dash.deno.com/>  
![deno.png](https://s2.loli.net/2022/03/20/tLITdUB4kWHe7VO.png)  
点击 `New Playground`  
![deno2.png](https://s2.loli.net/2022/03/20/h53uRYrnmQxwAz1.png)  
进入<https://github.com/YieldRay/Random-Picture/blob/master/test/deno.ts>  
或者复制<https://github.com/YieldRay/Random-Picture/raw/master/test/deno.ts>所有代码  
删除编辑器所有原有代码，再将复制的代码粘贴，最后点击 `✔ Saved & Deployed` 即可

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
