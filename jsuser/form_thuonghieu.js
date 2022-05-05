//sự kiện click thêm thương hiệu
$(".btn_themth").click(function(){
	var math=$(".txtmath").val();// lay gia tri cua o nhap lieu
	var tenth=$(".txttenth").val();
	var diachi=$(".txtdcth").val();
	var sdt=$(".txtsdtth").val(); 
	var email=$(".txtemailth").val(); 
	if(math==""){
		alert_info("ma thương hiệu khác Khoảng Trống");
	   }else if(tenth==""){
		   //alert("ten san pham Trống");
		   alert_info("tenth  khác Khoảng Trống");
		   }
		   else if(diachi=="")
		   {
			alert_info("diachi khác Khoảng Trống"); 
		   }
		   else if(sdt=="")
		   {
			alert_info("sdt khác trống");
		   }
			else if(email=="")
			{
			alert_info("emai khác trống");
			}else{
			   var datasend={
				   event:"insertth",
					math:math,
				   tenth:tenth,
				   diachi:diachi,
				   sdt:sdt,
				   email:email
			   }
			   queryDataGET_JSON("php/thuonghieu.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertth"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddsthuonghieu(thuonghieu_current,recordthuonghieu);
																		 $(".txtmath").val("");
																		 $(".txttenth").val("");
																		 $(".txtdcth").val("");
																		 $(".txtsdtth").val("")
																		 $(".txtemailth").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa thương hiệu
$(".btn_xoath").click(function(){
	var math=$(".txtmath").val();// lay gia tri cua o nhap lieu
	var tenth=$(".txttenth").val();
	var diachi=$(".txtdcth").val();
	var sdt=$(".txtsdtth").val(); 
	var email=$(".txtemailth").val(); 

		if(math==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("math khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+math+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deleteth",
						math:math,
						tenth:tenth,
						diachi:diachi,
						sdt:sdt,
						email:email
					}
					queryDataGET_JSON("php/thuonghieu.php",datasend,function(res){
						console.log(res);
						if(res["deleteth"]==1){
							alert_info("Xóa Thành Công");
							builddsthuonghieu(thuonghieu_current,recordthuonghieu);
							$(".txtmath").val("");
							$(".txttenth").val("");
							$(".txtdcth").val("");
							$(".txtsdtth").val("")
							$(".txtemailth").val("")
						}else{
							alert_error("Xóa khong thanh cong");
						}
					});
				}
				else //Nếu nhấn cancel
				{
					
				}
			});
			}
		});
//sự kiện click sửa thương hiệu
$(".btn_luuth").click(function(){
	var math=$(".txtmath").val();// lay gia tri cua o nhap lieu
	var tenth=$(".txttenth").val();
	var diachi=$(".txtdcth").val();
	var sdt=$(".txtsdtth").val(); 
	var email=$(".txtemailth").val();
			if(math==""){
				alert("math khác khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/thuonghieu.php",datasend,function(res){
					console.log(res);
					if(res["updateth"]==1)
					{
						alert_info("Sửa thành công");
						builddsthuonghieu(thuonghieu_current,recordthuonghieu);
							$(".txtmath").val("");
							$(".txttenth").val("");
							$(".txtdcth").val("");
							$(".txtsdtth").val("")
							$(".txtemailth").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updateth",
						math:math,
						tenth:tenth,
						diachi:diachi,
						sdt:sdt,
						email:email
					}	
				}
		})




function builddsthuonghieu(page,record) {
	var dataSend={
		event:"getDSthuonghieu",
		page:page,
		record:record
	}
$(".listdsthuonghieu").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/thuonghieu.php",dataSend,function (res)
	{
		$(".listdsthuonghieu").html("");
		buildHTMLthuonghieuData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLthuonghieuData(res) {
if(res.total==0){
		$(".listdsthuonghieu").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallthuonghieu=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordthuonghieu,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-math="' + list.math + '"data-tenth="'+list.tenth+'"data-diachi="'+list.diachi+'"data-sdt="'+list.sdt+'"data-email="'+list.email+'"data-vt="' + list.math + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.math+'</td>'+
			'<td>' + list.tenth+'</td>'+
			'<td>' + list.diachi+'</td>'+
			'<td>' + list.sdt+'</td>'+
			'<td>' + list.email+'</td>'+
			'<td class="click_sua_thuonghieu"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdsthuonghieu").html(html)
	}
	buildSlidePage($(".pagenumberthuonghieu"),5,res.page,res.totalpage);
}
}
var thuonghieu_current=0;
$(".pagenumberthuonghieu").on('click','button',function () {
	
	thuonghieu_current=$(this).val();
	builddsthuonghieu($(this).val(),recordthuonghieu);
	
});

//sự kiện click đẩy thông tin lên ô chứa

$(".listdsthuonghieu").on('click',".click_sua_thuonghieu",function(){
				//alert_info("ok");
				var math=($(this).parents("tr").attr("data-math"));
				var tenth=($(this).parents("tr").attr("data-tenth"));
				var diachi=($(this).parents("tr").attr("data-diachi"));
				var sdt=($(this).parents("tr").attr("data-sdt"));
				var email=($(this).parents("tr").attr("data-email"));

				$(".txtmath").val(math);
				$(".txttenth").val(resallthuonghieu[math].tenth);
				$(".txtdcth").val(resallthuonghieu[math].diachi);	
				$(".txtsdtth").val(resallthuonghieu[math].sdt);
				$(".txtemailth").val(resallthuonghieu[math].email);			  
});