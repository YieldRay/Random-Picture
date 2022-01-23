import { serve } from "https://deno.land/std@0.122.0/http/server.ts";

// 修改下面的地址即可
const recordURL =
    "https://raw.githubusercontent.com/YieldRay/Random-Picture/master/url.csv";

const randomNum = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/favicon.ico") {
        // return new Response(null, { status: 404 });
        return await fetch("https://deno.land/favicon.ico");
    }
    const searchParams = new URLSearchParams(url.search);
    // 获取id
    try {
        let tmp: any = await fetch(recordURL);
        tmp = await tmp.text();
        tmp = (tmp as string).split(/\r\n|\r|\n/);
        let stringNumber: any = NaN;
        if (searchParams.has("id")) {
            // 指定id
            stringNumber = searchParams.get("id");
        } else {
            const matched = url.pathname.match(
                /^\/(\d+)\.(?:jpg|jpeg|png|gif|webp)$/
            );
            if (matched) {
                stringNumber = matched[1];
            }
        }
        let id = Number(stringNumber);
        if (Number.isNaN(id)) {
            id = randomNum(0, tmp.length - 1);
        } else {
            if (id < 0 || id >= tmp.length) id = randomNum(0, tmp.length - 1);
        }
        const remoteURL = tmp[id];
        console.log(`${Date()}: ${id} of ${tmp.length}`);

        // 调整发送格式json/raw/302
        if (searchParams.has("json")) {
            return new Response(JSON.stringify({ url: remoteURL }), {
                headers: {
                    "access-control-allow-origin": "*",
                    "content-type": "application/json; charset=utf-8",
                },
            });
        } else if (searchParams.has("raw")) {
            return await fetch(remoteURL, {
                headers: {
                    Referer: "https://www.pixiv.net/",
                    "User-Agent": "PixivIOSApp/6.7.1 (iOS 10.3.1; iPhone8,1)",
                },
            });
        } else {
            return new Response(null, {
                status: 302,
                headers: {
                    location: remoteURL,
                },
            });
        }
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}

// example:
// localhost/?id=123
// localhost/3.jpg
// localhost/3.png?json
// localhost/3.jpeg?raw
// localhost/?raw

const port = 8000;
console.log(`Listening on port ${port}`);
serve(handler, { port });
