<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm hóa đơn
	case "inserthd":
    $sohd=$_GET['sohd'];
	$ngayhd=$_GET['ngayhd'];   
    $manvhd=$_GET['manvhd'];
	$makhhd=$_GET['makhhd']; 

        $sql="INSERT INTO hoadon (sohd,ngayhd,manvhd,makhhd) VALUES('".$sohd."','".$ngayhd."','".$manvhd."','".$makhhd."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa hóa đơn
	case "deletehd":
       
        $sohd=$_GET['sohd'];
		
        $sql="DELETE FROM hoadon WHERE sohd='".$sohd."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa hóa đơn
	case "updatehd":
       $sohd=$_GET['sohd'];
	   $ngayhd=$_GET['ngayhd'];
       $manvhd=$_GET['manvhd'];
	   $makhhd=$_GET['makhhd'];

        $sql="UPDATE  hoadon SET ngayhd='".$ngayhd."',manvhd='".$manvhd."',makhhd='".$makhhd."' WHERE sohd='".$sohd."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị hóa đơn lên giao diện
    case "getDShoadon":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select sohd,ngayhd,manvhd,makhhd from hoadon ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['sohd'];
            $usertemp['sohd']=$rows['sohd'];
            $usertemp['ngayhd']=$rows['ngayhd'];
            $usertemp['manvhd']=$rows['manvhd'];
            $usertemp['makhhd']=$rows['makhhd'];
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