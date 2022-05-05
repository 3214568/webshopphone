<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm giỏ hàng
	case "insertgh":
        $maspgh=$_GET['maspgh'];
        $tenspgh=$_GET['tenspgh'];
        $giabangh=$_GET['giabangh'];
        $soluonggh=$_GET['soluonggh'];
        $tongtien=$_GET['tongtien']; 


        $sql="INSERT INTO giohang (maspgh,tenspgh,giabangh,soluonggh,tongtien) VALUES('".$maspgh."','".$tenspgh."','".$giabangh."','".$soluonggh."','".$tongtien."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa giỏ hàng
	case "deletegh":
       
        $maspgh=$_GET['maspgh'];
		
        $sql="DELETE FROM giohang WHERE maspgh='".$maspgh."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa giỏ hàng
	case "updategh":
       $maspgh=$_GET['maspgh'];
	   $tenspgh=$_GET['tenspgh'];
       $giabangh=$_GET['giabangh'];
       $soluonggh=$_GET['soluonggh'];
       $tongtien=$_GET['tongtien'];


        $sql="UPDATE  giohang SET tenspgh='".$tenspgh."',giabangh='".$giabangh."',soluonggh='".$soluonggh."',tongtien='".$tongtien."' WHERE maspgh='".$maspgh."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị giỏ hàng lên giao diện
    case "getDSgiohang":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select maspgh,tenspgh,giabangh,soluonggh,tongtien from giohang ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['maspgh'];
            $usertemp['maspgh']=$rows['maspgh'];
            $usertemp['tenspgh']=$rows['tenspgh'];
            $usertemp['giabangh']=$rows['giabangh'];
            $usertemp['soluonggh']=$rows['soluonggh'];
            $usertemp['tongtien']=$rows['tongtien'];

            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from giohang");
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