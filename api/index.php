<?php

const ALLOW_RAW_OUTPUT = false;
// 是否开启 ?raw 选项，可能会消耗服务器较多流量

function has_query($query)
{
    return isset($_GET[$query]);
}
if (file_exists('../url.csv')) {
    $imgs_array = file('../url.csv', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
} else {
    $imgs_array = file('http://' . $_SERVER['HTTP_HOST'] . '/url.csv', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}
if (count($imgs_array) == 0) {
    $imgs_array = ['https://http.cat/503'];
}

$id = $_GET['id'] ?? "";
if (strlen($id) > 0 && is_numeric($id)) {
    settype($id, 'int');
    $len = count($imgs_array);
    if ($id >= $len || $id < 0) {
        $id = array_rand($imgs_array);
    } else {
        header('Cache-Control: public, max-age=86400');
    }
} else {
    header('Cache-Control: no-cache');
    $id = array_rand($imgs_array);
}


if (has_query('json')) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode(['id' => $id, 'url' => $imgs_array[$id]]);
} else if (has_query('raw')) {
    if (!ALLOW_RAW_OUTPUT) {
        header('HTTP/1.1 403 Forbidden');
        exit();
    }
    header('Content-Type: image/png');
    echo file_get_contents($imgs_array[$id]);
} else {
    header('Location: ' . $imgs_array[$id]);
}

exit();
