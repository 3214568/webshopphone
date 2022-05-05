<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm chi tiết hóa đơn
	case "insertcthoadon":
    $maspcthd=$_GET['maspcthd'];
	$sohdct=$_GET['sohdct'];   
    $soluong=$_GET['soluong'];
	$dongia=$_GET['dongia']; 

        $sql="INSERT INTO chitiethoadon (maspcthd,sohdct,soluong,dongia) VALUES('".$maspcthd."','".$sohdct."','".$soluong."','".$dongia."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa chi tiết hóa đơn
	case "deletecthoadon":
       
        $sohd=$_GET['maspcthd'];
		
        $sql="DELETE FROM chitiethoadon WHERE maspcthd='".$maspcthd."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa chi tiết hóa đơn
	case "updatecthoadon":
       $sohd=$_GET['maspcthd'];
	   $ngayhd=$_GET['sohdct'];
       $manvhd=$_GET['soluong'];
	   $makhhd=$_GET['dongia'];

        $sql="UPDATE  chitiethoadon SET sohdct='".$sohdct."',soluong='".$soluong."',dongia='".$dongia."' WHERE maspcthd='".$maspcthd."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị chi tiết hóa đơn lên giao diện
    case "getDScthoadon":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select maspcthd,sohdct,soluong,dongia from chitiethoadon ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['maspcthd'];
            $usertemp['maspcthd']=$rows['maspcthd'];
            $usertemp['sohdct']=$rows['sohdct'];
            $usertemp['soluong']=$rows['soluong'];
            $usertemp['dongia']=$rows['dongia'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from chitiethoadon");
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