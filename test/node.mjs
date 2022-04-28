import axios from "axios";
// 需要先安装 axios
// 填入环境变量，或者修改下面的地址，这个地址应该返回一个文本文件，每行一个图片地址
const recordURL = process.env.RECORD_URL || "https://raw.githubusercontents.com/YieldRay/Random-Picture/master/url.csv";

/*
 * Program Start
 */
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const imagesArray = ["https://http.cat/503"];
(async () => {
    const text = await axios.get(recordURL).then((res) => res.data);
    const imgs = text.split(/\r|\n|\r\n/).filter((item) => item.length > 5);
    imagesArray.splice(0, 1, ...imgs);
})();

export default async function (req /*: http.IncomingMessage*/, res /*: http.ServerResponse*/) {
    const url = new URL("http://localhost" + req.url);
    if (req.url === "/favicon.ico") {
        res.writeHead(404);
        res.end();
        return;
    }
    const { searchParams } = url;
    let stringNumber; // 获取id
    const matched = url.pathname.match(/^\/(\d+)\.(?:jpg|jpeg|png|gif|webp)$/);
    if (matched) {
        stringNumber = matched[1];
    } else {
        stringNumber = searchParams.get("id") ?? "";
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
    if (searchParams.has("json")) {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
        });
        res.write(JSON.stringify({ id, url: remoteURL }));
        res.end();
    } else if (searchParams.has("raw")) {
        console.log(`send raw ${remoteURL}`);
        const response = await axios({
            method: "get",
            url: remoteURL,
            responseType: "stream",
            headers: {
                Referer: "https://www.pixiv.net/",
                "User-Agent": "PixivIOSApp/6.7.1 (iOS 10.3.1; iPhone8,1)",
            }, // 这个Header允许调用pixiv上面的图片
        });
        res.writeHead(200, {
            "Content-Type": response.headers["content-type"],
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
        });
        response.data.pipe(res);
    } else {
        res.writeHead(302, {
            Location: remoteURL,
            "Cache-Control": "no-cache",
        });
        res.end();
    }
}
