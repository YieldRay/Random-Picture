<?php
const ALLOW_OUTPUT = false;  // 修改以开启
const NOT_FOUND_IMG = "https://i.loli.net/2020/08/17/J7ZU2VAHPQTbcy8.png";

if (file_exists('../url.txt')) {
    $url = file('../url.txt', FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
} else {
    $url = file('http://' .$_SERVER['HTTP_HOST']. '/url.txt', FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
}

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];

$is_empty = ($id == "") ? true : false;  // 只判断一次
$length = count($url);  // 数组长度
$rand_id = $is_empty ? array_rand($url) : $id;  // 实际id

if (!$is_empty && $id > $length) {
    // exceed maximum length
    $code = 404;
    $target_url = NOT_FOUND_IMG;
} else {
    $code = 200;
    $target_url = $url[$rand_id];
}

/**
 * 只使用以下变量
 * $code $target_url $length
 */

header('Access-Control-Allow-Origin:*'); 
switch ($type) {
    case 'length':
        echo $length;
        break;
    case 'json':
        $result = array("code" => "{$code}", "url" => "{$target_url}");
        header('Content-type:text/json');
        echo json_encode($result);
        break;
    case 'JSON':
        $result = array("code" => "{$code}", "url" => "{$target_url}");
        $imageInfo = getimagesize($target_url);
        $imageSize = get_headers($target_url, 1)['Content-Length'];
        $result['width'] = "{$imageInfo[0]}";
        $result['height'] = "{$imageInfo[1]}";
        $result['mime'] = "{$imageInfo['mime']}";
        $result['size'] = "{$imageSize}";
        header('Content-type:text/json');
        echo json_encode($result);
        break;
    case 'output':
        header($header);
        header("Cache-Control: no-cache");
        header("Pragma: no-cache");
        if (ALLOW_OUTPUT) {
            header('Content-type:image/png');
            echo file_get_contents($target_url);
        } else {
            die("disabled");
        }
        break;
    default:
        header("Location:$target_url");
}
