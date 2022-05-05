//sự kiện click thêm nhân viên
$(".btn_themnv").click(function(){
	var manv=$(".txtmanv").val();// lay gia tri cua o nhap lieu
	var hotennv=$(".txthtnv").val();
	var gioitinh=$(".txtgt").val();
	var ngaysinh=$(".txtns").val(); 
	if(manv==""){
		alert_info("manv khác Khoảng Trống");
	   }else if(hotennv==""){
		   //alert("ngày hóa đơn Trống");
		   alert_info("hotennv  khác Khoảng Trống");
		   }
		   else if(gioitinh=="")
		   {
			alert_info("gioitinh khác Khoảng Trống"); 
		   }
		   else if(ngaysinh=="")
		   {
			alert_info("ngaysinh đơn không Hợp Lệ");
			}else{
			   var datasend={
				   event:"insertnv",
                   manv:manv,
				   hotennv:hotennv,
				   gioitinh:gioitinh,
				   ngaysinh:ngaysinh
			   }
			   queryDataGET_JSON("php/nhanvien.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertnv"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddsnhanvien(nhanvien_current,recordnhanvien);
																		 $(".txtmanv").val("");
																		 $(".txthtnv").val("");
																		 $(".txtgt").val("");
																		 $(".txtns").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa nhân viên
$(".btn_xoanv").click(function(){
    var manv=$(".txtmanv").val();// lay gia tri cua o nhap lieu
	var hotennv=$(".txthtnv").val();
	var gioitinh=$(".txtgt").val();
	var ngaysinh=$(".txtns").val(); 
		if(manv==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("manv khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+manv+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletenv",
                        manv:manv,
                        hotennv:hotennv,
                        gioitinh:gioitinh,
                        ngaysinh:ngaysinh
					}
					queryDataGET_JSON("php/nhanvien.php",datasend,function(res){
						console.log(res);
						if(res["deletenv"]==1){
							alert_info("Xóa Thành Công");
                            builddsnhanvien(nhanvien_current,recordnhanvien);
                            $(".txtmanv").val("");
                            $(".txthtnv").val("");
                            $(".txtgt").val("");
                            $(".txtns").val("")
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
//sự kiện click sửa nhân viên
$(".btn_luunv").click(function(){
    var manv=$(".txtmanv").val();// lay gia tri cua o nhap lieu
	var hotennv=$(".txthtnv").val();
	var gioitinh=$(".txtgt").val();
	var ngaysinh=$(".txtns").val(); 
	if(manv==""){
				alert("manv khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/nhanvien.php",datasend,function(res){
					console.log(res);
					if(res["updatenv"]==1)
					{
						alert_info("Sửa thành công");
						builddsnhanvien(nhanvien_current,recordnhanvien);
                            $(".txtmanv").val("");
                            $(".txthtnv").val("");
                            $(".txtgt").val("");
                            $(".txtns").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatenv",
						manv:manv,
                        hotennv:hotennv,
                        gioitinh:gioitinh,
                        ngaysinh:ngaysinh
					}	
				}
		})


//Để trong file form_sanpham.js

function builddsnhanvien(page,record) {
	var dataSend={
		event:"getDSnhanvien",
		page:page,
		record:record
	}
$(".listdsnhanvien").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/nhanvien.php",dataSend,function (res)
	{
		$(".listdsnhanvien").html("");
		buildHTMLnhanvienData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLnhanvienData(res) {
if(res.total==0){
		$(".listdsnhanvien").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallnhanvien=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordnhanvien,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-manv="' + list.manv + '"data-hotennv="'+list.hotennv+'"data-gioitinh="'+list.gioitinh+'"data-ngaysinh="'+list.ngaysinh+'"data-vt="' + list.manv + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.manv+'</td>'+
			'<td>' + list.hotennv+'</td>'+
			'<td>' + list.gioitinh+'</td>'+
			'<td>' + list.ngaysinh+'</td>'+
			'<td class="click_sua_nhanvien"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdsnhanvien").html(html)
	}
	buildSlidePage($(".pagenumbernhanvien"),5,res.page,res.totalpage);
}
}
var nhanvien_current=0;
$(".pagenumbernhanvien").on('click','button',function () {
	
	nhanvien_current=$(this).val();
	builddsnhanvien($(this).val(),recordnhanvien);
	
});

//sự kiện click đẩy thông tin lên ô chứa
$(".listdsnhanvien").on('click',".click_sua_nhanvien",function(){
				//alert_info("ok");
				var manv=($(this).parents("tr").attr("data-manv"));
				var hotennv=($(this).parents("tr").attr("data-hotennv"));
				var gioitinh=($(this).parents("tr").attr("data-gioitinh"));
				var ngaysinh=($(this).parents("tr").attr("data-ngaysinh"));
				$(".txtmanv").val(manv);
				$(".txthtnv").val(resallnhanvien[manv].hotennv);
				$(".txtgt").val(resallnhanvien[manv].gioitinh);	
				$(".txtns").val(resallnhanvien[manv].ngaysinh);			  
});