<!DOCTYPE html>
<html>
 <head> 
  <title>随机图片api</title> 
  <meta charset="utf-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net/">
  <link rel="preload" href="https://cdn.jsdelivr.net/gh/kylelogue/mustard-ui/dist/css/mustard-ui.min.css" as="style">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kylelogue/mustard-ui/dist/css/mustard-ui.min.css" /> 
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/jieyou/lazyload/lazyload.min.js"></script>
  <script>
$(document).ready(function() {
    $('.scroll-down, .get-started').on('click', function(e) {
        e.preventDefault()
        $('html, body').animate({
            scrollTop: $('section:first-of-type').offset().top
        }, 300)
    })
});
$(function() {
    $("img.lazyload").lazyload()});
</script> 
<style>header{background:#a0e5e4}
.get-started{background:#43ccc8;border:3px solid #50d0cc}
*{word-break:break-all}
.panel img{width:100%}
.right{float:right}
</style>
  </head>
  <body>
  <header> 
   <h1 class="title">随机图片api</h1> 
   <h2 class="subtitle">图片一览</h2> 
   <p class="disclaimer"><a href="description.html">查看说明文档</a></p> 
   <button class="get-started button button-primary button-large">详情</button> 
   <a class="scroll-down" href="#"></a> 
  </header> 
<div class="row">
  <?php 
$list = file("url.txt");
$length = count($list);
for ($x = 0; $x < $length; $x++) {
    echo "<div class=\"col col-xs-12 col-sm-6 col-md-4 col-lg-3\">";
    echo "<div class=\"panel\"><div class=\"panel-head\">";
    echo "<p class=\"panel-title\">图片ID:" . $x . "</p></div>";
    echo "<img class=\"lazyload\" data-original=\"" . $list[$x] . "\" alt=" . "\"{$list[$x]}\">";
    echo "<div class=\"panel-footer\">";
    echo "<a href=\"" . $list[$x] . "\"><button class=\"button-primary right\">查看图片</button></a></div></div></div>";
}
/*
   $newline = "\n".$_GET["add"];
    file_put_contents("url.txt", $newline, FILE_APPEND | LOCK_EX);
*/
?>
</div>

<footer>
  <p class="copyright align-center">Made by <a href="https://blog.poo.li/">Crazy白茫茫</a>.  <a href="https://github.com/Crazy-White/Random-Picture">Github(Source Code)</a></p>
</footer>
</body>
</html>
