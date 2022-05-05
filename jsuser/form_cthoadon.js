//sự kiện click thêm chi tiết hóa đơn
$(".btn_themcthoadon").click(function(){
	var maspcthd=$(".txtmaspcthd").val();// lay gia tri cua o nhap lieu
	var sohdct=$(".txtsohdct").val();
	var soluong=$(".txsoluong").val();
	var dongia=$(".txtdongia").val(); 
	if(maspcthd==""){
		alert_info("maspcthd khác Khoảng Trống");
	   }else if(sohdct==""){
		   //alert("ngày hóa đơn Trống");
		   alert_info("sohdct  khác Khoảng Trống");
		   }
		   else if(soluong=="")
		   {
			alert_info("soluong khác Khoảng Trống"); 
		   }
		   else if(dongia=="")
		   {
			alert_info("dongia đơn không Hợp Lệ");
			}else{
			   var datasend={
				   event:"insertcthoadon",
                   maspcthd:maspcthd,
				   sohdct:sohdct,
				   soluong:soluong,
				   dongia:dongia
			   }
			   queryDataGET_JSON("php/cthoadon.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertcthoadon"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddscthoadon(cthoadon_current,recordcthoadon);
																		 $(".txtmaspcthd").val("");
																		 $(".txtsohdct").val("");
																		 $(".txsoluong").val("");
																		 $(".txtdongia").val("");
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa chi tiết hóa đơn
$(".btn_xoacthoadon").click(function(){
    var maspcthd=$(".txtmaspcthd").val();// lay gia tri cua o nhap lieu
	var sohdct=$(".txtsohdct").val();
	var soluong=$(".txsoluong").val();
	var dongia=$(".txtdongia").val(); 
		if(maspcthd==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("maspcthd khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+maspcthd+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletecthoadon",
                        maspcthd:maspcthd,
				   sohdct:sohdct,
				   soluong:soluong,
				   dongia:dongia
					}
					queryDataGET_JSON("php/cthoadon.php",datasend,function(res){
						console.log(res);
						if(res["deletecthoadon"]==1){
							alert_info("Xóa Thành Công");
                            builddscthoadon(cthoadon_current,recordcthoadon);
                            $(".txtmaspcthd").val("");
                            $(".txtsohdct").val("");
                            $(".txsoluong").val("");
                            $(".txtdongia").val("");
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
//sự kiện click sửa chi tiết hóa đơn
$(".btn_luucthoadon").click(function(){
    var maspcthd=$(".txtmaspcthd").val();// lay gia tri cua o nhap lieu
	var sohdct=$(".txtsohdct").val();
	var soluong=$(".txsoluong").val();
	var dongia=$(".txtdongia").val(); 
	if(maspcthd==""){
				alert("maspcthd khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/cthoadon.php",datasend,function(res){
					console.log(res);
					if(res["updatecthoadon"]==1)
					{
						alert_info("Sửa thành công");
						builddscthoadon(cthoadon_current,recordcthoadon);
                            $(".txtmaspcthd").val("");
                            $(".txtsohdct").val("");
                            $(".txsoluong").val("");
                            $(".txtdongia").val("");
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatecthoadon",
                        maspcthd:maspcthd,
                        sohdct:sohdct,
                        soluong:soluong,
                        dongia:dongia
					}	
				}
		})




function builddscthoadon(page,record) {
	var dataSend={
		event:"getDScthoadon",
		page:page,
		record:record
	}
$(".listdscthoadon").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/cthoadon.php",dataSend,function (res)
	{
		$(".listdscthoadon").html("");
		buildHTMLcthoadonData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLcthoadonData(res) {
if(res.total==0){
		$(".listdscthoadon").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallcthoadon=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordcthoadon,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-maspcthd="' + list.maspcthd + '"data-sohdct="'+list.sohdct+'"data-soluong="'+list.soluong+'"data-dongia="'+list.dongia+'"data-vt="' + list.maspcthd + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.maspcthd+'</td>'+
			'<td>' + list.sohdct+'</td>'+
			'<td>' + list.soluong+'</td>'+
			'<td>' + list.dongia+'</td>'+
			'<td class="click_sua_cthoadon"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdscthoadon").html(html)
	}
	buildSlidePage($(".pagenumbercthoadon"),5,res.page,res.totalpage);
}
}
var cthoadon_current=0;
$(".pagenumbercthoadon").on('click','button',function () {
	
	cthoadon_current=$(this).val();
	builddscthoadon($(this).val(),recordcthoadon);
	
});

//sự kiện click đẩy thông tin lên ô chứa
$(".listdscthoadon").on('click',".click_sua_cthoadon",function(){
				//alert_info("ok");
				var maspcthd=($(this).parents("tr").attr("data-maspcthd"));
				var sohdct=($(this).parents("tr").attr("data-sohdct"));
				var soluong=($(this).parents("tr").attr("data-soluong"));
				var dongia=($(this).parents("tr").attr("data-dongia"));
				$(".txtmaspcthd").val(maspcthd);
				$(".txtsohdct").val(resallcthoadon[maspcthd].sohdct);
				$(".txtsoluong").val(resallcthoadon[maspcthd].soluong);	
				$(".txtdongia").val(resallcthoadon[maspcthd].dongia);			  
});