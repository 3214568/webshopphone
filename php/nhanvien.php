<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm nhân viên
	case "insertnv":
    $manv=$_GET['manv'];
	$hotennv=$_GET['hotennv'];   
    $gioitinh=$_GET['gioitinh'];
	$ngaysinh=$_GET['ngaysinh']; 

        $sql="INSERT INTO nhanvien (manv,hotennv,gioitinh,ngaysinh) VALUES('".$manv."','".$hotennv."','".$gioitinh."','".$ngaysinh."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa nhân viên
	case "deletenv":
       
        $sohd=$_GET['manv'];
		
        $sql="DELETE FROM nhanvien WHERE manv='".$manv."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa nhân viên
	case "updatenv":
       $sohd=$_GET['manv'];
	   $ngayhd=$_GET['hotennv'];
       $manvhd=$_GET['gioitinh'];
	   $makhhd=$_GET['ngaysinh'];

        $sql="UPDATE  nhanvien SET hotennv='".$hotennv."',gioitinh='".$gioitinh."',ngaysinh='".$ngaysinh."' WHERE manv='".$manv."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị nhân viên lên giao diện
    case "getDSnhanvien":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select * from nhanvien ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['manv'];
            $usertemp['manv']=$rows['manv'];
            $usertemp['hotennv']=$rows['hotennv'];
            $usertemp['gioitinh']=$rows['gioitinh'];
            $usertemp['ngaysinh']=$rows['ngaysinh'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from hoadon");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
		default:
        # code...
        break;
}
?>