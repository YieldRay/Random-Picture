<?php
// Bing Wallpaper 1920x1080
$json = file_get_contents('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
$arr = json_decode($json,true);
$img = 'https://cn.bing.com'.$arr['images'][0]['url'];
header("Location:$img");
