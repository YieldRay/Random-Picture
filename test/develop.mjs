// 本地测试
import http from "http";
import handler from "./node.mjs";
const port = process.env.PORT || 8000;
console.log(`Server is running at http://localhost:${port}`);
http.createServer(handler).listen(port);
