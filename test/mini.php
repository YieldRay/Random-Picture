<?php $a=file('url.csv');$b=$a[array_rand($a)];header("Location:$b");
