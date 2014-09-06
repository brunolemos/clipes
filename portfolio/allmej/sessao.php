<?php
header('Access-Control-Allow-Origin: *');
session_id($_POST["sid"]);
session_start();
$result = "ID: ".session_id()."\n".$_SESSION["FOG"]."\n";
echo $result;
?> 