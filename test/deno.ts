import { serve } from "https://deno.land/std@0.136.0/http/server.ts";

// 如果修改了环境变量 RECORD_URL 则无需修改任何代码，否则，修改下面的地址，这个地址应该返回一个文本文件，每行一个图片地址
const recordURL = "https://raw.githubusercontents.com/YieldRay/Random-Picture/master/url.csv";
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
const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const imagesArray = await fetch(Deno.env.get("RECORD_URL") || recordURL)
    .then((res) => res.text())
    .then((text) => text.split(/\r|\n|\r\n/).filter((url) => url.length > 5));

async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/favicon.ico") {
        // return new Response(null, { status: 404 });
        return await fetch("https://deno.land/favicon.ico");
    }
    const { searchParams } = url;
    try {
        let stringNumber: string; // 获取id
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
            if (id < 0 || id >= imagesArray.length) {
                id = randomNum(0, imagesArray.length - 1);
            }
        }
        const remoteURL = imagesArray[id];
        console.log(`send ${id} of ${imagesArray.length} with ${req.url}`);
        // 调整发送格式json/raw/302
        if (searchParams.has("json")) {
            return new Response(JSON.stringify({ id, url: remoteURL }), {
                headers: {
                    "access-control-allow-origin": "*",
                    "content-type": "application/json; charset=utf-8",
                    "cache-control": "no-cache",
                },
            });
        } else if (searchParams.has("raw")) {
            return await fetch(remoteURL, {
                headers: {
                    Referer: "https://www.pixiv.net/",
                    "User-Agent": "PixivIOSApp/6.7.1 (iOS 10.3.1; iPhone8,1)",
                }, // 这个Header允许调用pixiv上面的图片
            });
        } else {
            return new Response(null, {
                status: 302,
                headers: {
                    location: remoteURL,
                    "cache-control": "no-cache",
                },
            });
        }
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}

serve(handler);
