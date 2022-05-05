<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm khách hàng
	case "insertkh":
        $makh=$_GET['makh'];
        $tenkh=$_GET['tenkh'];
        $sdt=$_GET['sdt'];
        $email=$_GET['email'];


        $sql="INSERT INTO khachhang (makh,tenkh,sdt,email) VALUES('".$makh."','".$tenkh."','".$sdt."','".$email."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa khách hàng
	case "deletekh":
       
        $maspgh=$_GET['makh'];
		
        $sql="DELETE FROM khachhang WHERE makh='".$makh."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa khách hàng
	case "updatekh":
        $makh=$_GET['makh'];
        $tenkh=$_GET['tenkh'];
        $sdt=$_GET['sdt'];
        $email=$_GET['email'];


        $sql="UPDATE  khachhang SET tenkh='".$tenkh."',sdt='".$sdt."',email='".$email."' WHERE makh='".$makh."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị khách hàng lên giao diện
    case "getDSkhachhang":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select makh,tenkh,sdt,email from khachhang ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['makh'];
            $usertemp['makh']=$rows['makh'];
            $usertemp['tenkh']=$rows['tenkh'];
            $usertemp['sdt']=$rows['sdt'];
            $usertemp['email']=$rows['email'];

            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from khachhang");
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