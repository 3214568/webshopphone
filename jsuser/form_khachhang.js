//sự kiện click thêm khách hàng
$(".btn_themkh").click(function(){
	var makh=$(".txtmakh").val();// lay gia tri cua o nhap lieu
	var tenkh=$(".txttenkh").val();
	var sdt=$(".txtsdt").val();
	var email=$(".txtemail").val(); 
	if(makh==""){
		alert_info("makh khác Khoảng Trống");
	   }else if(tenkh==""){
		   //alert("ngày hóa đơn Trống");
		   alert_info("tenkh  khác Khoảng Trống");
		   }
		   else if(sdt=="")
		   {
			alert_info("sdt khác Khoảng Trống"); 
		   }
		   else if(email=="")
		   {
			alert_info("email không Hợp Lệ");
			}else{
			   var datasend={
				   event:"insertkh",
                   makh:makh,
				   tenkh:tenkh,
				   sdt:sdt,
				   email:email
			   }
			   queryDataGET_JSON("php/khachhang.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertkh"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddskhachhang(khachhang_current,recordkhachhang);
																		 $(".txtmakh").val("");
																		 $(".txttenkh").val("");
																		 $(".txtsdt").val("");
																		 $(".txtemail").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa khách hàng
$(".btn_xoakh").click(function(){
    var makh=$(".txtmakh").val();// lay gia tri cua o nhap lieu
	var tenkh=$(".txttenkh").val();
	var sdt=$(".txtsdt").val();
	var email=$(".txtemail").val(); 
		if(makh==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("Số hóa đơn khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+sohd+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletekh",
						makh:makh,
				   tenkh:tenkh,
				   sdt:sdt,
				   email:email
					}
					queryDataGET_JSON("php/khachhang.php",datasend,function(res){
						console.log(res);
						if(res["deletekh"]==1){
							alert_info("Xóa Thành Công");
                            builddskhachhang(khachhang_current,recordkhachhang);
                            $(".txtmakh").val("");
                            $(".txttenkh").val("");
                            $(".txtsdt").val("");
                            $(".txtemail").val("")
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
//sự kiện click sửa khách hàng
$(".btn_luukh").click(function(){
	var makh=$(".txtmakh").val();// lay gia tri cua o nhap lieu
	var tenkh=$(".txttenkh").val();
	var sdt=$(".txtsdt").val();
	var email=$(".txtemail").val(); 
	if(makh==""){
				alert("Mã sản phẩm khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/khachhang.php",datasend,function(res){
					console.log(res);
					if(res["updatekh"]==1)
					{
						alert_info("Sửa thành công");
						builddskhachhang(khachhang_current,recordkhachhang);
                            $(".txtmakh").val("");
                            $(".txttenkh").val("");
                            $(".txtsdt").val("");
                            $(".txtemail").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatekh",
						makh:makh,
				   tenkh:tenkh,
				   sdt:sdt,
				   email:email
					}	
				}
		})


//Để trong file form_sanpham.js

function builddskhachhang(page,record) {
	var dataSend={
		event:"getDSkhachhang",
		page:page,
		record:record
	}
$(".listdskhachhang").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/khachhang.php",dataSend,function (res)
	{
		$(".listdskhachhang").html("");
		buildHTMLkhachhangData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLkhachhangData(res) {
if(res.total==0){
		$(".listdskhachhang").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallkhachhang=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordkhachhang,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-makh="' + list.makh + '"data-tenkh="'+list.tenkh+'"data-sdt="'+list.sdt+'"data-email="'+list.email+'"data-vt="' + list.makh + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.makh+'</td>'+
			'<td>' + list.tenkh+'</td>'+
			'<td>' + list.sdt+'</td>'+
			'<td>' + list.email+'</td>'+
			'<td class="click_sua_khachhang"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdskhachhang").html(html)
	}
	buildSlidePage($(".pagenumberkhachhang"),5,res.page,res.totalpage);
}
}
var khachhang_current=0;
$(".pagenumberkhachhang").on('click','button',function () {
	
	khachhang_current=$(this).val();
	builddskhachhang($(this).val(),recordkhachhang);
	
});

//sự kiện click hiển thị thông tin lên ô chứa

$(".listdskhachhang").on('click',".click_sua_khachhang",function(){
				//alert_info("ok");
				var makh=($(this).parents("tr").attr("data-makh"));
				var tenkh=($(this).parents("tr").attr("data-tenkh"));
				var sdt=($(this).parents("tr").attr("data-sdt"));
				var email=($(this).parents("tr").attr("data-email"));
				$(".txtmakh").val(makh);
				$(".txttenkh").val(resallkhachhang[makh].tenkh);
				$(".txtsdt").val(resallkhachhang[makh].sdt);	
				$(".txtemail").val(resallkhachhang[makh].email);			  
});