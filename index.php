<?php
$url = explode("\n", file_get_contents('url.txt'));
$i = rand(0, count($url));
$x = $url[rand(0, $i)];
$img = file_get_contents($x, true);
$id = $_REQUEST['id'];
$type = $_REQUEST['type'];
$result = array("code" => "200", "url" => "{$x}");
switch ($type) {
    case json:
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
    case js:
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Cache-Control: no-cache");
        header("Pragma: no-cache");
        header("Content-type:application/x-javascript");
        echo "var pic_random=" . "'" . $url[rand(0, $i)] . "'" . ";";
        echo "var pic_end=" . count($url) . ";";
        echo "var pic_rdn=" . $i . ";";
        break;
    case output:
        $mime = getimagesize($x)[mime];
        $header = "Content-Type: " . $mime . ";";
        header($header);
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Cache-Control: no-cache");
        header("Pragma: no-cache");
        echo $img;
        break;
    default:
        if ($id == "") {
            header("Location:$x");
        } else {
            header("Location:$url[$id]");
        }
}
