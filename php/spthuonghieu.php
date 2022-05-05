<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm sản phẩm thương hiệu
	case "insertspth":
        $maspth=$_GET['maspth'];
        $mathsp=$_GET['mathsp'];
        $masp=$_GET['masp'];
        $giaban=$_GET['giaban'];


        $sql="INSERT INTO sanphamthuonghieu (maspth,mathsp,masp,giaban) VALUES('".$maspth."','".$mathsp."','".$masp."','".$giaban."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa sản phẩm thương hiệu
	case "deletespth":
       
        $maspgh=$_GET['maspth'];
		
        $sql="DELETE FROM sanphamthuonghieu WHERE maspth='".$maspth."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa sản phẩm thương hiệu
	case "updatespth":
       $maspth=$_GET['maspth'];
	   $mathsp=$_GET['mathsp'];
       $masp=$_GET['masp'];
       $giaban=$_GET['giaban'];
       


        $sql="UPDATE  sanphamthuonghieu SET mathsp='".$mathsp."',masp='".$masp."',giaban='".$giaban."' WHERE maspth='".$maspth."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị sản phẩm thương hiệu lên giao diện
    case "getDSspthuonghieu":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select maspth,mathsp,masp,giaban from sanphamthuonghieu ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['maspth'];
            $usertemp['mathsp']=$rows['mathsp'];
            $usertemp['masp']=$rows['masp'];
            $usertemp['giaban']=$rows['giaban'];
            

            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sanphamthuonghieu");
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