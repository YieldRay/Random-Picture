# Random-Picture
随机图片api



**直接调用**

访问index.php即可，跳转至图片地址

访问?id=数字，跳转至指定图片


**访问?type=output**

服务器读取图片后输出

不建议使用


**访问?type=json**

服务器读取图片后输出
    `     
{&quot;code&quot;:&quot;200&quot;,&quot;url&quot;:&quot;https:\/\/fp1.fghrsh.net\/2019\/07\/15\/c2549aaa63db078834ead6a92fe63b61.jpg&quot;,&quot;width&quot;:&quot;1920&quot;,&quot;height&quot;:&quot;1080&quot;,&quot;mime&quot;:&quot;image\/jpeg&quot;,&quot;size&quot;:&quot;821735&quot;}
    `


**访问?type=js**

输出js
    `
        var pic_random='https://fp1.fghrsh.net/2019/07/15/aceb221b57c4987ac324e10aeaf69ede.jpg';

        var pic_end=34;  //最后一张图片的id

        var pic_rdn=25;  //随机图片的id，每次不同
    `
