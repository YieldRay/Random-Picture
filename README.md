# Random-Picture

随机图片api
JUST FOR FUN

## 实验地址:

[http://miku.ueuo.com/](http://miku.ueuo.com/)*(无稳定性保证)*
[https://random-picture.vercel.app/](https://random-picture.vercel.app/)*(部署到vercel)*

### 注意:

| 路径 | 说明 |
| --- | --- |
| ./url.txt | 务必一行一个url，不要输入不完整的url |
| ./api/index.php | 修改ALLOW_OUTPUT以开启output |

## 部署到vercel

建议fork后，自行修改配置，然后在vercel平台上导入自己的项目
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FCrazy-White%2FRandom-Picture)

<section>
    <h3><strong>直接调用</strong></h3>
    <p>访问./api即可，跳转至图片地址</p>
    <p>访问./api/?id=数字，跳转至指定图片</p>
    <p>注：api附加参数 api=数字 亦可跳转至指定图片</p>
    <p>如：<a href="./api/?type=json&id=3">./api/?type=json&id=3</a></p>
    <p>另：若包含参数cache (./api/?cache  ./api/?type=length&cache) 则请求缓存一天</p>
    <p>使用：通过脚本发起请求时，附加随机参数 ('./api/?cache&r=' + Math.random())则可能通过url找回图片</p>
  </section>
  <section>
    <h3><strong>访问<a href="./api/?type=length">./api/?type=length</a></strong></h3>
    <p>返回图片总量，即id的最大值</p>
  </section>
  <section>
    <h3><strong>访问<a href="./api/?type=output">./api/?type=output</a></strong></h3>
    <p>服务器读取后输出，一般不建议使用，默认禁用</p>
  </section>
  <section>
    <h3><strong>访问<a href="./api/?type=json">./api/?type=json</a></strong></h3>
    <p>服务器输出json</p>
    <pre class="language-json">
    <code class="language-json">     
{&quot;code&quot;:&quot;200&quot;,&quot;url&quot;:&quot;https:\/\/fp1.fghrsh.net\/2019\/07\/15\/c2549aaa63db078834ead6a92fe63b61.jpg&quot;}
    </code>
</pre>
  </section>
  <section>
    <h3><strong>访问<a href="./api/?type=JSON">./api/?type=JSON</a></strong></h3>
    <p>服务器读取图片信息后输出json，如非需要图片信息不建议使用</p>
    <pre class="language-json">
    <code class="language-json">     
{&quot;code&quot;:&quot;200&quot;,&quot;url&quot;:&quot;https:\/\/fp1.fghrsh.net\/2019\/07\/15\/c2549aaa63db078834ead6a92fe63b61.jpg&quot;,&quot;width&quot;:&quot;1920&quot;,&quot;height&quot;:&quot;1080&quot;,&quot;mime&quot;:&quot;image\/jpeg&quot;,&quot;size&quot;:&quot;821735&quot;}
    </code>
</pre>
  </section>
