<?php
//account mysql 
$hostname = 'localhost';
$username = 'root';
$password = '';

$dbname = "bandienthoai";
$port=3306;
$conn = mysqli_connect($hostname, $username, $password,$dbname,$port);

if (!$conn) {
 die('Không thể kết nối: ' . mysqli_error($conn));
 exit();
}
//echo 'Kết nối thành công';
mysqli_set_charset($conn,"utf8_general_ci");

?>
