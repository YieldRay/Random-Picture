<?php $a=file('url.csv')[array_rand(file('url.csv'))];header("Location:$a");
