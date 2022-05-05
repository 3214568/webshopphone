//sự kiện click thêm giỏ hàng
$(".btn_themgh").click(function(){
	var maspgh=$(".txtmaspgh").val();// lay gia tri cua o nhap lieu
	var tenspgh=$(".txttenspgh").val();
	var giabangh=$(".txtgiabangh").val();
	var soluonggh=$(".txtsoluonggh").val(); 
	var tongtien=$(".txttongtiengh").val(); 
	if(maspgh==""){
		alert_info("ma san pham gio hang khác Khoảng Trống");
	   }else if(tenspgh==""){
		   //alert("ten san pham Trống");
		   alert_info("ten san pham  khác Khoảng Trống");
		   }
		   else if(giabangh=="")
		   {
			alert_info("giabangh khác Khoảng Trống"); 
		   }
		   else if(soluonggh=="")
		   {
			alert_info("so luong không Hợp Lệ");
		   }
			else if(tongtien=="")
			{
			alert_info("tong tien không Hợp Lệ");
			}else{
			   var datasend={
				   event:"insertgh",
					maspgh:maspgh,
				   tenspgh:tenspgh,
				   giabangh:giabangh,
				   soluonggh:soluonggh,
				   tongtien:tongtien
			   }
			   queryDataGET_JSON("php/giohang.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertgh"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddsgiohang(giohang_current,recordgiohang);
																		 $(".txtmaspgh").val("");
																		 $(".txttenspgh").val("");
																		 $(".txtgiabangh").val("");
																		 $(".txtsoluonggh").val("")
																		 $(".txttongtiengh").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa giỏ hàng
$(".btn_xoagh").click(function(){
		var maspgh=$(".txtmaspgh").val();
		var tenspgh=$(".txttenspgh").val();
		var giabangh=$(".txtgiabangh").val();
		var soluonggh=$(".txtsoluonggh").val();
		var tongtien=$(".txttongtiengh").val();

		if(maspgh==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("Số hóa đơn khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+maspgh+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletegh",
						maspgh:maspgh,
						tenspgh:tenspgh,
						giabangh:giabangh,
						soluonggh:soluonggh,
						tongtien:tongtien
					}
					queryDataGET_JSON("php/giohang.php",datasend,function(res){
						console.log(res);
						if(res["deletegh"]==1){
							alert_info("Xóa Thành Công");
							builddsgiohang(giohang_current,recordgiohang);
							$(".txtmaspgh").val("");
							$(".txttenspgh").val("");
							$(".txtgiabangh").val("");
							$(".txtsoluonggh").val("")
							$(".txttongtiengh").val("")
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
//sự kiện click sửa giỏ hàng
$(".btn_luugh").click(function(){
	var maspgh=$(".txtmaspgh").val();
	var tenspgh=$(".txttenspgh").val();
	var giabangh=$(".txtgiabangh").val();
	var soluonggh=$(".txtsoluonggh").val();
	var tongtien=$(".txttongtiengh").val();
			if(maspgh==""){
				alert("Mã sản phẩm khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/giohang.php",datasend,function(res){
					console.log(res);
					if(res["updategh"]==1)
					{
						alert_info("Sửa thành công");
						builddsgiohang(giohang_current,recordgiohang);
							$(".txtmaspgh").val("");
							$(".txttenspgh").val("");
							$(".txtgiabangh").val("");
							$(".txtsoluonggh").val("")
							$(".txttongtiengh").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updategh",
						maspgh:maspgh,
						tenspgh:tenspgh,
						giabangh:giabangh,
						soluonggh:soluonggh,
						tongtien:tongtien
					}	
				}
		})


//Để trong file form_sanpham.js

function builddsgiohang(page,record) {
	var dataSend={
		event:"getDSgiohang",
		page:page,
		record:record
	}
$(".listdsgiohang").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/giohang.php",dataSend,function (res)
	{
		$(".listdsgiohang").html("");
		buildHTMLgiohangData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLgiohangData(res) {
if(res.total==0){
		$(".listdsgiohang").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallgiohang=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordgiohang,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-maspgh="' + list.maspgh + '"data-tenspgh="'+list.tenspgh+'"data-giabangh="'+list.giabangh+'"data-soluonggh="'+list.soluonggh+'"data-tongtien="'+list.tongtien+'"data-vt="' + list.maspgh + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.maspgh+'</td>'+
			'<td>' + list.tenspgh+'</td>'+
			'<td>' + list.giabangh+'</td>'+
			'<td>' + list.soluonggh+'</td>'+
			'<td>' + list.tongtien+'</td>'+
			'<td class="click_sua_giohang"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdsgiohang").html(html)
	}
	buildSlidePage($(".pagenumbergiohang"),5,res.page,res.totalpage);
}
}
var giohang_current=0;
$(".pagenumbergiohang").on('click','button',function () {
	
	giohang_current=$(this).val();
	builddsgiohang($(this).val(),recordgiohang);
	
});

//sự kiện click đẩy thông tin lên ô chứa
$(".listdsgiohang").on('click',".click_sua_giohang",function(){
				//alert_info("ok");
				var maspgh=($(this).parents("tr").attr("data-maspgh"));
				var tenspgh=($(this).parents("tr").attr("data-tenspgh"));
				var giabangh=($(this).parents("tr").attr("data-giabangh"));
				var soluonggh=($(this).parents("tr").attr("data-soluonggh"));
				var tongtien=($(this).parents("tr").attr("data-tongtien"));

				$(".txtmaspgh").val(maspgh);
				$(".txttenspgh").val(resallgiohang[maspgh].tenspgh);
				$(".txtgiabangh").val(resallgiohang[maspgh].giabangh);	
				$(".txtsoluonggh").val(resallgiohang[maspgh].soluonggh);
				$(".txttongtiengh").val(resallgiohang[maspgh].tongtien);			  
});