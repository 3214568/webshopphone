<?php
require_once("server.php");
$event=$_GET['event'];

switch ($event) {
    //thay đổi ảnh đại diện
    case "UpdateAvatar":
        $avatar=$_GET['avatar'];
        $username=$_GET['username'];
        $sql="update users set avatar='".$avatar."' where username='".$username."'";
        
        
        if (mysqli_query($conn, $sql)) {
        $res[$event] = 1;
        } else {
        $res[$event] = 0;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        
        //thêm sản phẩm 
	case "insertsp":
    $tsp=$_GET['tsp'];
    $masp=$_GET['masp'];
    $manhinh=$_GET['manhinh'];
    $hdh=$_GET['hdh'];
    $camt=$_GET['camt'];
    $cams=$_GET['cams'];
    $cpu=$_GET['cpu'];
    $ram=$_GET['ram'];
    $bnt=$_GET['bnt'];
    $thesim=$_GET['thesim'];
    $dlpin=$_GET['dlpin'];
    $gia=$_GET['gia'];
    $sql="INSERT INTO `product` (tsp,masp,manhinh,hdh,camt,cams,cpu,ram,bnt,thesim,dlpin,gia) VALUES('".$tsp."','".$masp."','".$manhinh."','".$hdh."','".$camt."','".$cams."','".$cpu."','".$ram."','".$bnt."','".$thesim."','".$dlpin."','".$gia."')";
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa sản phẩm
	case "deletesp":
       
        $masp=$_GET['masp'];
        $sql="DELETE FROM `product` WHERE masp='".$masp."'";
			mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa sản phẩm
	case "updatesp":
		$sql="UPDATE  `product` SET tsp='".$tsp."',manhinh='".$manhinh."',hdh='".$hdh."',camt='".$camt."',cams='".$cams."',cpu='".$cpu."',ram='".$ram."',bnt='".$bnt."',thesim='".$thesim."',dlpin='".$dlpin."',gia='".$gia."' WHERE masp='".$masp."'";
           if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
		
            //hiển thị dữ liệu từ mysql lên giao diện
        case "getDSadmin":
            $mang=array();
            $record=$_GET['record'];
            $page=$_GET['page'];
              $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,"select * from product ".$limit); 
            while($rows=mysqli_fetch_array($sql))
            {
                $id=$rows['masp'];
                $usertemp['masp']=$rows['masp'];
                $usertemp['tsp']=$rows['tsp'];
                $usertemp['manhinh']=$rows['manhinh'];
                $usertemp['hdh']=$rows['hdh'];
                $usertemp['camt']=$rows['camt'];
                $usertemp['cams']=$rows['cams'];
                $usertemp['cpu']=$rows['cpu'];
                $usertemp['ram']=$rows['ram'];
                $usertemp['bnt']=$rows['bnt'];
                $usertemp['thesim']=$rows['thesim'];
                $usertemp['dlpin']=$rows['dlpin'];
                $usertemp['gia']=$rows['gia'];
    
                
                $mang[$id]=$usertemp;
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from product");
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