import axios from 'axios';
// 填入环境变量，或者修改下面的地址，这个地址应该返回一个文本文件，每行一个图片地址
const recordURL = process.env.RECORD_URL || 'https://raw.githubusercontents.com/YieldRay/Random-Picture/master/url.csv';
/**
 * 有?json则返回json，否则如有?raw直接输出图像否则302跳转
 * 优先获取123.jpg中的id，其次?id
 * example:
 * https://rand.deno.dev/?id=123
 * https://rand.deno.dev/3.jpg
 * https://rand.deno.dev/3.png?json
 * https://rand.deno.dev/3.jpeg?raw
 * https://rand.deno.dev/?raw
 */

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const imagesArray = ['https://http.cat/503'];
(async () => {
    const text = await axios.get(recordURL).then(res => res.data);
    console.log(text);
    const imgs = text.split(/\r|\n|\r\n/);
    imagesArray.splice(0, 1, ...imgs);
})();

export default async function (req /*: http.IncomingMessage*/, res /*: http.ServerResponse*/) {
    const url = new URL('http://localhost' + req.url);
    if (req.url === '/favicon.ico') {
        res.writeHead(503);
        res.end();
        return;
    }
    const searchParams = new URLSearchParams(url.search);
    let stringNumber; // 获取id
    const matched = url.pathname.match(/^\/(\d+)\.(?:jpg|jpeg|png|gif|webp)$/);
    if (matched) {
        stringNumber = matched[1];
    } else {
        stringNumber = searchParams.get('id') ?? '';
    }
    let id = Number(stringNumber);
    if (stringNumber.length === 0 || Number.isNaN(id)) {
        id = randomNum(0, imagesArray.length - 1);
    } else {
        if (id < 0 || id >= imagesArray.length) id = randomNum(0, imagesArray.length - 1);
    }
    const remoteURL = imagesArray[id];
    console.log(`send ${id} of ${imagesArray.length} with ${req.url}`);
    // 调整发送格式json/raw/302
    if (searchParams.has('json')) {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.write(JSON.stringify({ url: remoteURL }));
        res.end();
    } else if (searchParams.has('raw')) {
        console.log(`send raw ${remoteURL}`);
        const response = await axios({
            method: 'get',
            url: remoteURL,
            responseType: 'stream',
            headers: {
                Referer: 'https://www.pixiv.net/',
                'User-Agent': 'PixivIOSApp/6.7.1 (iOS 10.3.1; iPhone8,1)',
            }, // 这个Header允许调用pixiv上面的图片
        });
        response.data.pipe(res);
    } else {
        res.writeHead(302, {
            Location: remoteURL,
        });
        res.end();
    }
}
