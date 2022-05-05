//sự kiện click thêm hóa đơn
$(".btn_themhoadon").click(function(){
	var sohd=$(".txtsohd").val();// lay gia tri cua o nhap lieu
	var ngayhd=$(".txtngayhd").val();
	var manvhd=$(".txtmanvhd").val();
	var makhhd=$(".txtmakhhd").val(); 
	if(sohd==""){
		alert_info("số hóa đơn khác Khoảng Trống");
	   }else if(ngayhd==""){
		   //alert("ngày hóa đơn Trống");
		   alert_info("ngày hóa đơn  khác Khoảng Trống");
		   }
		   else if(manvhd=="")
		   {
			alert_info("mã nhân viên khác Khoảng Trống"); 
		   }
		   else if(makhhd=="")
		   {
			alert_info("mã khách hàng hóa đơn không Hợp Lệ");
			}else{
			   var datasend={
				   event:"inserthd",
				  sohd:sohd,
				   ngayhd:ngayhd,
				   manvhd:manvhd,
				   makhhd:makhhd
			   }
			   queryDataGET_JSON("php/hoadon.php",datasend,function(res){
																	 console.log(res);
																	 if(res["inserthd"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddshoadon(hoadon_current,recordhoadon);
																		 $(".txtsohd").val("");
																		 $(".txtngayhd").val("");
																		 $(".txtmanvhd").val("");
																		 $(".txtmakhhd").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa hóa đơn
$(".btn_xoahoadon").click(function(){
		var sohd=$(".txtsohd").val();
		var ngayhd=$(".txtngayhd").val();
		var manvhd=$(".txt_manvhd").val();
		var makhhd=$(".txtmakhhd").val();
		if(sohd==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("Số hóa đơn khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+sohd+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletehd",
						sohd:sohd,
						ngayhd:ngayhd,
						manvhd:manvhd,
						makhhd:makhhd
					}
					queryDataGET_JSON("php/hoadon.php",datasend,function(res){
						console.log(res);
						if(res["deletehd"]==1){
							alert_info("Xóa Thành Công");
							builddshoadon(hoadon_current,recordhoadon);
							$(".txtsohd").val("");
							$(".txtngayhd").val("");
							$(".txtmanvhd").val("");
							$(".txtmakhhd").val("")
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
//sự kiện click sửa hóa đơn
$(".btn_luuhoadon").click(function(){
	var sohd=$(".txtsohd").val();
	var ngayhd=$(".txtngayhd").val();
	var manvhd=$(".txt_manvhd").val();
	var makhhd=$(".txtmakhhd").val();
	if(sohd==""){
				alert("Mã sản phẩm khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/hoadon.php",datasend,function(res){
					console.log(res);
					if(res["updatehd"]==1)
					{
						alert_info("Sửa thành công");
						builddshoadon(hoadon_current,recordhoadon);
						$(".txtsohd").val("");
						$(".txtngayhd").val("");
						$(".txtmanvhd").val("");
						$(".txtmakhhd").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatehd",
						sohd:sohd,
						ngayhd:ngayhd,
						manvhd:manvhd,
						makhhd:makhhd
					}	
				}
		})


//Để trong file form_sanpham.js

function builddshoadon(page,record) {
	var dataSend={
		event:"getDShoadon",
		page:page,
		record:record
	}
$(".listdshoadon").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/hoadon.php",dataSend,function (res)
	{
		$(".listdshoadon").html("");
		buildHTMLhoadonData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLhoadonData(res) {
if(res.total==0){
		$(".listdshoadon").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallhoadon=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordhoadon,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-sohd="' + list.sohd + '"data-ngayhd="'+list.ngayhd+'"data-manvhd="'+list.manvhd+'"data-makhhd="'+list.makhhd+'"data-vt="' + list.sohd + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.sohd+'</td>'+
			'<td>' + list.ngayhd+'</td>'+
			'<td>' + list.manvhd+'</td>'+
			'<td>' + list.makhhd+'</td>'+
			'<td class="click_sua_hoadon"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdshoadon").html(html)
	}
	buildSlidePage($(".pagenumberhoadon"),5,res.page,res.totalpage);
}
}
var hoadon_current=0;
$(".pagenumberhoadon").on('click','button',function () {
	
	hoadon_current=$(this).val();
	builddshoadon($(this).val(),recordhoadon);
	
});

//sự kiện click đẩy thông tin lên ô chúa

$(".listdshoadon").on('click',".click_sua_hoadon",function(){
				//alert_info("ok");
				var sohd=($(this).parents("tr").attr("data-sohd"));
				var ngayhd=($(this).parents("tr").attr("data-ngayhd"));
				var manvhd=($(this).parents("tr").attr("data-manvhd"));
				var makhhd=($(this).parents("tr").attr("data-makhhd"));
				$(".txtsohd").val(sohd);
				$(".txtngayhd").val(resallhoadon[sohd].ngayhd);
				$(".txtmanvhd").val(resallhoadon[sohd].manvhd);	
				$(".txtmakhhd").val(resallhoadon[sohd].makhhd);			  
});