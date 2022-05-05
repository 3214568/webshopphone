//thêm chi tiết đơn hàng
$(".btn_themctdonhang").click(function(){
	var id =$(".txtid").val();// lay gia tri cua o nhap lieu
	var sodhct=$(".txtsodhct").val();
	var maspct=$(".txtmaspct").val();
	var soluong=$(".txtsoluong").val(); 
	var giatien=$(".txtgiatien").val(); 
	if(id==""){
		alert_info("id khác Khoảng Trống");
	   }else if(sodhct==""){
		   //alert("ten san pham Trống");
		   alert_info("sodhct khác Khoảng Trống");
		   }
		   else if(maspct=="")
		   {
			alert_info("maspct khác Khoảng Trống"); 
		   }
		   else if(soluong=="")
		   {
			alert_info("so luong không Hợp Lệ");
		   }
			else if(giatien=="")
			{
			alert_info("giatien không Hợp Lệ");
			}else{
			   var datasend={
				   event:"insertctdh",
                   id:id,
				   sodhct:sodhct,
				   maspct:maspct,
				   soluong:soluong,
				   giatien:giatien
			   }
			   queryDataGET_JSON("php/ctdonhang.php",datasend,function(res){
																	 console.log(res);
																	 if(res["insertctdh"]==1){
																		 alert_info("Thêm Thành Công ");
																		 builddsctdonhang(ctdonhang_current,recordctdonhang);
																		 $(".txtid").val("");
																		 $(".txtsodhct").val("");
																		 $(".txtmaspct").val("");
																		 $(".txtsoluong").val("")
																		 $(".txtgiatien").val("")
																	 }else{
																		 alert_info("Thêm Không Thành Công");
																	 }
																	 })
		   }		
		});
//xóa chi tiết đơn hàng đã được chọn
$(".btn_xoactdonhang").click(function(){
    var id =$(".txtid").val();// lay gia tri cua o nhap lieu
	var sodhct=$(".txtsodhct").val();
	var maspct=$(".txtmaspct").val();
	var soluong=$(".txtsoluong").val(); 
	var giatien=$(".txtgiatien").val(); 

		if(id==""){
			//alert("Mã sản phẩm khác khoảng trống");
			alert_info("id khác khoảng trống");
		}
		else
		{
			bootbox.confirm("Bạn có chắc xóa hóa đơn "+id+" không?",function(res){
				if(res==true){ //nếu nhấn ok
				var datasend={
						event:"deletectdh",
                        id:id,
                        sodhct:sodhct,
                        maspct:maspct,
                        soluong:soluong,
                        giatien:giatien
					}
					queryDataGET_JSON("php/ctdonhang.php",datasend,function(res){
						console.log(res);
						if(res["deletectdh"]==1){
							alert_info("Xóa Thành Công");
                            builddsctdonhang(ctdonhang_current,recordctdonhang);
                            $(".txtid").val("");
                            $(".txtsodhct").val("");
                            $(".txtmaspct").val("");
                            $(".txtsoluong").val("")
                            $(".txtgiatien").val("")
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
//sửa chi tiết đơn hàng 
$(".btn_luuctdonhang").click(function(){
	var id =$(".txtid").val();// lay gia tri cua o nhap lieu
	var sodhct=$(".txtsodhct").val();
	var maspct=$(".txtmaspct").val();
	var soluong=$(".txtsoluong").val(); 
	var giatien=$(".txtgiatien").val(); 
			if(id==""){
				alert("id khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/ctdonhang.php",datasend,function(res){
					console.log(res);
					if(res["updatectdh"]==1)
					{
						alert_info("Sửa thành công");
                        builddsctdonhang(ctdonhang_current,recordctdonhang);
                        $(".txtid").val("");
                        $(".txtsodhct").val("");
                        $(".txtmaspct").val("");
                        $(".txtsoluong").val("")
                        $(".txtgiatien").val("")
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatectdh",
						id:id,
                        sodhct:sodhct,
                        maspct:maspct,
                        soluong:soluong,
                        giatien:giatien
					}	
				}
		})




function builddsctdonhang(page,record) {
	var dataSend={
		event:"getDSctdonhang",
		page:page,
		record:record
	}
$(".listdsctdonhang").html("<img src='images/loading.gif' width='30px' height='30px'/>");
	queryDataGET_JSON("php/ctdonhang.php",dataSend,function (res)
	{
		$(".listdsctdonhang").html("");
		buildHTMLctdonhangData(res);
		//alert_info("Đã Lấy Dữ Liệu Được" + res); 
	}); 
}
//hiển thị dữ liếu
function buildHTMLctdonhangData(res) {
if(res.total==0){
		$(".listdsctdonhang").html("Chưa có nội dung");
}else{  
	var data = res.items;
	resallctdonhang=data;
	var stt=1;
	var currentpage=parseInt(res.page);
	stt=printSTT(recordctdonhang,currentpage);
	var html='';
	var vt=0;
	for (item in data) {
		var list=data[item];
        
		html=html +
			'<tr data-id="' + list.id + '"data-sodhct="'+list.sodhct+'"data-maspct="'+list.maspct+'"data-soluong="'+list.soluong+'"data-giatien="'+list.giatien+'"data-vt="' + list.id + '">' +
			
			'<td>' + stt + '</td>' +
			'<td>' + list.id+'</td>'+
			'<td>' + list.sodhct+'</td>'+
			'<td>' + list.maspct+'</td>'+
			'<td>' + list.soluong+'</td>'+
			'<td>' + list.giatien+'</td>'+
			'<td class="click_sua_ctdonhang"><i class="fa fa-eye"></i></td>'+
			'</tr>';
		stt++;
		vt++;
		$(".listdsctdonhang").html(html)
	}
	buildSlidePage($(".pagenumberctdonhang"),5,res.page,res.totalpage);
}
}
var ctdonhang_current=0;
$(".pagenumberctdonhang").on('click','button',function () {
	
	ctdonhang_current=$(this).val();
	builddsctdonhang($(this).val(),recordctdonhang);
	
});

//click vào xem để đưa thông tin lên ô chứa
$(".listdsctdonhang").on('click',".click_sua_ctdonhang",function(){
				//alert_info("ok");
				var id=($(this).parents("tr").attr("data-id"));
				var sodhct=($(this).parents("tr").attr("data-sodhct"));
				var maspct=($(this).parents("tr").attr("data-maspct"));
				var soluong=($(this).parents("tr").attr("data-soluong"));
				var giatien=($(this).parents("tr").attr("data-giatien"));

				$(".txtid").val(id);
				$(".txtsodhct").val(resallctdonhang[id].sodhct);
				$(".txtmaspct").val(resallctdonhang[id].maspct);	
				$(".txtsoluong").val(resallctdonhang[id].soluong);
				$(".txtgiatien").val(resallctdonhang[id].giatien);			  
});