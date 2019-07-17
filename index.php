<?php
$url = explode("\n", file_get_contents('url.txt'));//url数组
$i = rand(0, count($url));//随机id
$x = $url[rand(0, $i)];//随机图片
$id = $_REQUEST['id'];
$type = $_REQUEST['type'];
switch ($type) {
    case 'json':
        $result = array("code" => "200", "url" => "{$x}");
        $imageInfo = getimagesize($x);
        $imageSize = get_headers($x, 1)['Content-Length'];
        $result['width'] = "{$imageInfo[0]}";
        $result['height'] = "{$imageInfo[1]}";
        $result['mime'] = "{$imageInfo['mime']}";
        $result['size'] = "{$imageSize}";
        header('Access-Control-Allow-Origin:*'); 
        header('Content-type:text/json');
        echo json_encode($result);
        break;
    case 'js':
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Cache-Control: no-cache");
        header("Pragma: no-cache");
        header("Content-type:application/x-javascript");
        echo "var pic_random=" . "'" . $url[rand(0, $i)] . "'" . ";";
        echo "var pic_end=" . count($url) . ";";
        echo "var pic_rdn=" . $i . ";";
        break;
    case 'output':
        $mime = getimagesize($x)[mime];
        $header = "Content-Type: " . $mime . ";";
        header($header);
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Cache-Control: no-cache");
        header("Pragma: no-cache");
        echo file_get_contents($x, true);
        break;
    default:
        if ($id == "") {
            header("Location:$x");
        } else {
            header("Location:$url[$id]");
        }
}
