<?php $a=file('url.txt')[array_rand(file('url.txt'))];header("Location:$a");
