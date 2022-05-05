<?php
require_once("server.php");
$event=$_GET['event'];
switch ($event) {
    //thêm thương hiệu
	case "insertth":
        $math=$_GET['math'];
        $tenth=$_GET['tenth'];
        $diachi=$_GET['diachi'];
        $sdt=$_GET['sdt'];
        $email=$_GET['email']; 


        $sql="INSERT INTO thuonghieu (math,tenth,diachi,sdt,email) VALUES('".$math."','".$tenth."','".$diachi."','".$sdt."','".$email."')";
      
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //xóa thương hiệu
	case "deleteth":
       
        $maspgh=$_GET['math'];
		
        $sql="DELETE FROM thuonghieu WHERE math='".$math."'";
       mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)>0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //sửa thương hiệu
	case "updateth":
       $math=$_GET['math'];
	   $tenth=$_GET['tenth'];
       $diachi=$_GET['diachi'];
       $sdt=$_GET['sdt'];
       $email=$_GET['email'];


        $sql="UPDATE  thuonghieu SET tenth='".$tenth."',diachi='".$diachi."',sdt='".$sdt."',email='".$email."' WHERE math='".$math."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        //hiển thị thương hiệu lên giao diện
    case "getDSthuonghieu":
		
		$mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select math,tenth,diachi,sdt,email from thuonghieu ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['math'];
            $usertemp['math']=$rows['math'];
            $usertemp['tenth']=$rows['tenth'];
            $usertemp['diachi']=$rows['diachi'];
            $usertemp['sdt']=$rows['sdt'];
            $usertemp['email']=$rows['email'];

            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from thuonghieu");
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