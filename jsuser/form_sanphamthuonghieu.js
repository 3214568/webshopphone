//sự kiện click thêm sản phầm thương hiệu
$(".btn_themspth").click(function(){
	var maspth=$(".txtmaspth").val();// lay gia tri cua o nhap lieu
	var mathsp=$(".txtmathsp").val();
	var masp=$(".txtmasp1").val();
	var giaban=$(".txtgiabanspth").val(); 
	if(maspth==""){
		alert_info("maspth khác Khoảng Trống");
	   }else if(mathsp==""){
		   //alert("ngày hóa đơn Trống");
		   alert_info("mathsp  khác Khoảng Trống");
		   }
		   else if(masp=="")
		   {
			alert_info("masp khác Khoảng Trống"); 
		   }
		   else if(giaban=="")
		   {
			alert_info("giaban không Hợp Lệ");
			}else{
			   var datasend={
				   event:"insertspth",
                   maspth:maspth,
				   mathsp:mathsp,
				   masp:masp,
				   giaban:giaban
			   }
			   queryDataGET_JSON("php/spthuonghieu.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertspth"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddsspthuonghieu(spthuonghieu_current,recordspthuonghieu);
																		 $(".txtmaspth").val("");
																		 $(".txtmathsp").val("");
																		 $(".txtmasp1").val("");
																		 $(".txtgiabanspth").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa sản phầm thương hiệu
$(".btn_xoaspth").click(function(){
    var maspth=$(".txtmaspth").val();
	var mathsp=$(".txtmathsp").val();
	var masp=$(".txtmasp1").val();
	var giaban=$(".txtgiabanspth").val(); 
		if(maspth==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("Mã sản phẩm khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+maspth+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletespth",
						maspth:maspth,
				        mathsp:mathsp,
				        masp:masp,
				        giaban:giaban
					}
					queryDataGET_JSON("php/spthuonghieu.php",datasend,function(res){
						console.log(res);
						if(res["deletespth"]==1){
							alert_info("Xóa Thành Công");
							builddsspthuonghieu(spthuonghieu_current,recordspthuonghieu);
							$(".txtmaspth").val("");
							$(".txtmathsp").val("");
							$(".txtmasp1").val("");
							$(".txtgiabanspth").val("")
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
//sự kiện click sửa sản phầm thương hiệu
$(".btn_luuspth").click(function(){
	var maspth=$(".txtmaspth").val();
	var mathsp=$(".txtmathsp").val();
	var masp=$(".txtmasp1").val();
	var giaban=$(".txtgiabanspth").val(); 
	if(maspth==""){
				alert("Mã sản phẩm khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/spthuonghieu.php",datasend,function(res){
					console.log(res);
					if(res["updatespth"]==1)
					{
						alert_info("Sửa thành công");
						builddsspthuonghieu(spthuonghieu_current,recordspthuonghieu);
						$(".txtmaspth").val("");
						$(".txtmathsp").val("");
						$(".txtmasp1").val("");
						$(".txtgiabanspth").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatespth",
						maspth:maspth,
						mathsp:mathsp,
                            masp:masp,
                            giaban:giaban
					}	
				}
		})


//Để trong file form_sanpham.js

function builddsspthuonghieu(page,record) {
	var dataSend={
		event:"getDSspthuonghieu",
		page:page,
		record:record
	}
$(".listdsspthuonghieu").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/spthuonghieu.php",dataSend,function (res)
	{
		$(".listdsspthuonghieu").html("");
		buildHTMLspthuonghieuData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLspthuonghieuData(res) {
if(res.total==0){
		$(".listdsspthuonghieu").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallspthuonghieu=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordspthuonghieu,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-maspth="' + list.maspth + '"data-mathsp="'+list.mathsp+'"data-masp="'+list.masp+'"data-giaban="'+list.giaban+'"data-vt="' + list.maspth + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.maspth+'</td>'+
			'<td>' + list.mathsp+'</td>'+
			'<td>' + list.masp+'</td>'+
			'<td>' + list.giaban+'</td>'+
			'<td class="click_sua_spthuonghieu"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdsspthuonghieu").html(html)
	}
	buildSlidePage($(".pagenumberspthuonghieu"),5,res.page,res.totalpage);
}
}
var spthuonghieu_current=0;
$(".pagenumberspthuonghieu").on('click','button',function () {
	
	spthuonghieu_current=$(this).val();
	builddsspthuonghieu($(this).val(),recordspthuonghieu);
	
});

//sự kiện click đẩy thông tin lên ô chứa
$(".listdsspthuonghieu").on('click',".click_sua_spthuonghieu",function(){
				//alert_info("ok");
				var maspth=($(this).parents("tr").attr("data-maspth"));
				var mathsp=($(this).parents("tr").attr("data-mathsp"));
				var masp=($(this).parents("tr").attr("data-masp"));
				var giaban=($(this).parents("tr").attr("data-giaban"));
				$(".txtmaspth").val(maspth);
				$(".txtmathsp").val(resallspthuonghieu[maspth].mathsp);
				$(".txtmasp1").val(resallspthuonghieu[maspth].masp);	
				$(".txtgiabanspth").val(resallspthuonghieu[maspth].giaban);			  
});