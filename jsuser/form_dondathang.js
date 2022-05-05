//sự kiện click thêm đơn đặt hàng
$(".btn_themddh").click(function(){
	var sodh =$(".txtsodh").val();// lay gia tri cua o nhap lieu
	var ngaydh=$(".txtngaydh").val();
	var trangthaidh=$(".txttrangthaidh").val();
	var ngaygiaodukien=$(".txtngaygiaodukien").val(); 
    var manvdh =$(".txtmanvdh").val(); 
    var makhdh  =$(".txtmakhdh").val(); 

	if(sodh==""){
		alert_info("sodh khác Khoảng Trống");
	   }else if(ngaydh==""){
		   //alert("ten san pham Trống");
		   alert_info("ngaydh  khác Khoảng Trống");
		   }
		   else if(trangthaidh=="")
		   {
			alert_info("trangthaidh khác Khoảng Trống"); 
		   }
		   else if(ngaygiaodukien=="")
		   {
			alert_info("ngaygiaodukien khác trống");
		   }
			else if(manvdh=="")
			{
			alert_info("manvdh khác trống");
            }
            else if(makhdh=="")
			{
			alert_info("makhdh khác trống");
			}else{
			   var datasend={
				   event:"insertddh",
                   sodh:sodh,
				   ngaydh:ngaydh,
				   trangthaidh:trangthaidhs,
				   ngaygiaodukien:ngaygiaodukien,
                   manvdh:manvdh,
                   makhdh:makhdh
			   }
			   queryDataGET_JSON("php/ddh.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertddh"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddsddh(ddh_current,recordddh);
																		 $(".txtsodh").val("");
																		 $(".txtngaydh").val("");
																		 $(".txttrangthaidh").val("");
																		 $(".txtngaygiaodukien").val("")
                                                                         $(".txtmanvdh").val("")
                                                                         $(".txtmakhdh").val("")

																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//sự kiện click xóa đơn đặt hàng
$(".btn_xoaddh").click(function(){
	var sodh =$(".txtsodh").val();// lay gia tri cua o nhap lieu
	var ngaydh=$(".txtngaydh").val();
	var trangthaidh=$(".txttrangthaidh").val();
	var ngaygiaodukien=$(".txtngaygiaodukien").val(); 
    var manvdh =$(".txtmanvdh").val(); 
    var makhdh  =$(".txtmakhdh").val(); 

		if(sodh==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("sodh khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+sodh+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deleteddh",
                        sodh:sodh,
                        ngaydh:ngaydh,
                        trangthaidh:trangthaidhs,
                        ngaygiaodukien:ngaygiaodukien,
                        manvdh:manvdh,
                        makhdh:makhdh
					}
					queryDataGET_JSON("php/ddh.php",datasend,function(res){
						console.log(res);
						if(res["deleteddh"]==1){
							alert_info("Xóa Thành Công");
                            builddsddh(ddh_current,recordddh);
                            $(".txtsodh").val("");
                            $(".txtngaydh").val("");
                            $(".txttrangthaidh").val("");
                            $(".txtngaygiaodukien").val("")
                            $(".txtmanvdh").val("")
                            $(".txtmakhdh").val("")
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
//sự kiện click sửa đơn đặt hàng
$(".btn_luuddh").click(function(){
	var sodh =$(".txtsodh").val();// lay gia tri cua o nhap lieu
	var ngaydh=$(".txtngaydh").val();
	var trangthaidh=$(".txttrangthaidh").val();
	var ngaygiaodukien=$(".txtngaygiaodukien").val(); 
    var manvdh =$(".txtmanvdh").val(); 
    var makhdh  =$(".txtmakhdh").val(); 
			if(sodh==""){
				alert("sodh khác khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/ddh.php",datasend,function(res){
					console.log(res);
					if(res["updateddh"]==1)
					{
						alert_info("Sửa thành công");
                        builddsddh(ddh_current,recordddh);
                        $(".txtsodh").val("");
                        $(".txtngaydh").val("");
                        $(".txttrangthaidh").val("");
                        $(".txtngaygiaodukien").val("")
                        $(".txtmanvdh").val("")
                        $(".txtmakhdh").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updateddh",
                        sodh:sodh,
                        ngaydh:ngaydh,
                        trangthaidh:trangthaidhs,
                        ngaygiaodukien:ngaygiaodukien,
                        manvdh:manvdh,
                        makhdh:makhdh
					}	
				}
		})




function builddsddh(page,record) {
	var dataSend={
		event:"getDSddh",
		page:page,
		record:record
	}
$(".listdsddh").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/ddh.php",dataSend,function (res)
	{
		$(".listdsddh").html("");
		buildHTMLddhData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}

function buildHTMLddhData(res) {
if(res.total==0){
		$(".listdsddh").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallddh=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordddh,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
	
		html=html +
			'<tr data-sodh="' + list.sodh + '"data-ngaydh="'+list.ngaydh+'"data-trangthaidh="'+list.trangthaidh+'"data-ngaygiaodukien="'+list.ngaygiaodukien+'"data-manvdh="'+list.manvdh+'"data-makhdh="'+list.makhdh+'"data-vt="' + list.sodh + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.sodh+'</td>'+
			'<td>' + list.ngaydh+'</td>'+
			'<td>' + list.trangthaidh+'</td>'+
			'<td>' + list.ngaygiaodukien+'</td>'+
            '<td>' + list.manvdh+'</td>'+
            '<td>' + list.makhdh+'</td>'+

			'<td class="click_sua_ddh"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdsddh").html(html)
	}
	buildSlidePage($(".pagenumberddh"),5,res.page,res.totalpage);
}
}
var ddh_current=0;
$(".pagenumberddh").on('click','button',function () {
	
	ddh_current=$(this).val();
	builddsddh($(this).val(),recordddh);
	
});

//sự kiện click đẩy thông tin lên ô chứa
$(".listdsddh").on('click',".click_sua_ddh",function(){
				//alert_info("ok");
				var sodh=($(this).parents("tr").attr("data-sodh"));
				var ngaydh=($(this).parents("tr").attr("data-ngaydh"));
				var trangthaidh=($(this).parents("tr").attr("data-trangthaidh"));
				var ngaygiaodukien=($(this).parents("tr").attr("data-ngaygiaodukien"));
                var manvdh=($(this).parents("tr").attr("data-manvdh"));
                var makhdh=($(this).parents("tr").attr("data-makhdh"));


				$(".txtsodh").val(sodh);
				$(".txtngaydh").val(resallddh[sodh].ngaydh);
				$(".txttrangthaidh").val(resallddh[sodh].trangthaidh);	
				$(".txtngaygiaodukien").val(resallddh[sodh].ngaygiaodukien);
                $(".txtmanvdh").val(resallddh[sodh].manvdh);		
                $(".txtmakhdh").val(resallddh[sodh].makhdh);			  
	  
});