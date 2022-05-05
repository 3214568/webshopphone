<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm đơn đặt hàng
	case "insertddh":
        $sodh =$_GET['sodh'];
        $ngaydh=$_GET['ngaydh'];
        $trangthaidh=$_GET['trangthaidh'];
        $ngaygiaodukien=$_GET['ngaygiaodukien'];
        $manvdh =$_GET['manvdh']; 
        $makhdh  =$_GET['makhdh']; 


        $sql="INSERT INTO dondathang (sodh,ngaydh,trangthaidh,ngaygiaodukien,manvdh,makhdh) VALUES('".$sodh."','".$ngaydh."','".$trangthaidh."','".$ngaygiaodukien."','".$manvdh."','".$makhdh."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa đơn đặt hàng
	case "deleteddh":
       
        $maspgh=$_GET['sodh'];
		
        $sql="DELETE FROM dondathang WHERE sodh='".$sodh."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa đơn đặt hàng
	case "updateddh":
        $sodh =$_GET['sodh'];
        $ngaydh=$_GET['ngaydh'];
        $trangthaidh=$_GET['trangthaidh'];
        $ngaygiaodukien=$_GET['ngaygiaodukien'];
        $manvdh =$_GET['manvdh']; 
        $makhdh  =$_GET['makhdh']; 


        $sql="UPDATE  dondathang SET ngaydh='".$ngaydh."',trangthaidh='".$trangthaidh."',ngaygiaodukien='".$ngaygiaodukien."',manvdh='".$manvdh."',makhdh='".$makhdh."' WHERE sodh='".$sodh."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị đơn đặt hàng lên giao diện
    case "getDSddh":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select sodh,ngaydh,trangthaidh,ngaygiaodukien,manvdh,makhdh from dondathang ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['sodh'];
            $usertemp['sodh']=$rows['sodh'];
            $usertemp['ngaydh']=$rows['ngaydh'];
            $usertemp['trangthaidh']=$rows['trangthaidh'];
            $usertemp['ngaygiaodukien']=$rows['ngaygiaodukien'];
            $usertemp['manvdh']=$rows['manvdh'];
            $usertemp['makhdh']=$rows['makhdh'];


            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from dondathang");
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