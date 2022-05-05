// JavaScript Document
ShowAvatar();
function ShowAvatar()
{
var username = localStorage.getItem("userBS");
var password = localStorage.getItem("passBS");
var avatar=localStorage.getItem("avatarBS");
if(username==""||username==undefined||username==null){
location.href='login.html';
}else{
$(".myusername").html(username);
$(".myavatar").attr("src","file/"+ avatar);
}
}
//change avartar
$(".btn_change_avartar").click(function () {

	$("#imgSP").val("")
	
	$('.showmodal_changeavartar').modal('show');
	initUploadImage("imgSP","imgSPPreview","onSuccessUploadImageavartar");
	});
	var urlimage="";
	function onSuccessUploadImageavartar(oj){
	console.log(oj);
	$("#imgSPPreview").removeClass("is-hidden");
	$("#imgSPPreview").attr("src",oj.url);
	console.log(oj.attach);
	urlimage=oj.attach;
	}
	//hàm đổi avatar trên csdl
	$(".btn_update_avartar").click(function () {
	var username=localStorage.getItem("userBS");
	
	if(urlimage==""){
	alert_info("Chưa chọn hình");
	}else{
	var datasend = {
	event: "UpdateAvatar",
	
	username:username,
	avatar:urlimage
	};
	console.log(datasend);
	queryDataGET_JSON("php/admin.php",datasend, function (data) {
	
	if(data["UpdateAvatar"]==1){
	alert_info("Update thành công !!");
	//$(".avartarimage").attr("src",urllocal+"file/"+urlimage);
	
	localStorage.removeItem("avatarBS"); //xóa avartar localstorge
	localStorage.setItem("avatarBS",urlimage); //lưu lại avartar localstorge
	ShowAvatar();
	urlimage=""
	}else{
	alert_info("Thất bại !!");
	}
	});
	
	}
	});

//sự kiện click nút thêm sản phẩm mới
$(".btn_themsanpham").click(function(){
	var tsp=$(".txttsp").val();
    var masp=$(".txtmsp").val();//lay gia i tu ô nhập liệu mã sản phẩm
    var manhinh=$(".txtmh").val();
	var hdh=$(".txthdh").val();
	var camt=$(".txtcamt").val();
	var cams=$(".txtcams").val();
	var cpu=$(".txtcpu").val();
	var ram=$(".txtram").val();
	var bnt=$(".txtbnt").val();
	var thesim=$(".txtts").val();
	var dlpin=$(".txtdlp").val();
	var gia=$(".txtgia").val();
		// thông báo với người dùng nếu dữ liệu chưa nhập đầy đủ
	if(tsp==""){
		//alert("Mã thể loại khác khoảng trống");
		alert_info("Tên sản phẩm khác khoảng trống");
	}
	else if(masp==""){
		alert_info("Mã sản phẩm khác khoảng trống");
    
    }
    else if(manhinh==""){
		alert_info("màn hình khác khoảng trống");
    
    }
    else if(hdh==""){
		alert_info(" hệ điều hành khác khoảng trống");
    
    }
    else if(camt==""){
		alert_info("camera trước khác khoảng trống");
    
    }
    else if(cams==""){
		alert_info("camera sau khác khoảng trống");
    
    }
    else if(cpu==""){
		alert_info("CPU khác khoảng trống");
    
    }
    else if(ram==""){
		alert_info("Ram khác khoảng trống");
    
    }
    else if(bnt==""){
		alert_info("bộ nhớ trong khác khoảng trống");
    
    }
    else if(thesim==""){
		alert_info("thẻ sim khác khoảng trống");
    
    }
    else if(dlpin==""){
		alert_info("dung lượng pin khác khoảng trống");
    
    }
    else if(gia==""){
		alert_info("Giá khác khoảng trống");
    
    }
	//đủ điều kiện thì thêm sản phẩm mới vào mysql
    else
	{
		var dataSend={
			event:"insertsp",
			tsp:tsp,
            masp:masp,
            manhinh:manhinh,
            hdh:hdh,
            camt:camt,
            cams:cams,
            cpu:cpu,
            ram:ram,
            bnt:bnt,
            thesim:thesim,
            dlpin:dlpin,
            gia:gia

		}
		//thông báo cho người dùng là đã thêm dữ liệu thành công vào mysql

		queryDataGET_JSON("php/admin.php",dataSend,function(res){
			console.log(res);
			if(res["insertsp"]==1){
                alert_info("Them thanh cong");
                builddsadmin(admin_current,recordadmin);
				$(".txttsp").val("");
                $(".txtmsp").val("");
                $(".txtmh").val("");
				$(".txthdh").val("");
				$(".txtcamt").val("");
				$(".txtcams").val("");
				$(".txtcpu").val("");
				$(".txtram").val("");
				$(".txtbnt").val("");
				$(".txtts").val("");
				$(".txtdlp").val("");
				$(".txtgia").val("");

			}else{
				alert_error("Them khong thanh cong");
			}
		});
	}
});
//thông báo cho người dùng là đã sửa dữ liệu thành công
$(".btn_luusanpham").click(function(){
	var tsp=$(".txttsp").val();
    var masp=$(".txtmsp").val();//lay gia i tu ô nhập liệu mã sản phẩm
    var manhinh=$(".txtmh").val();
	var hdh=$(".txthdh").val();
	var camt=$(".txtcamt").val();
	var cams=$(".txtcams").val();
	var cpu=$(".txtcpu").val();
	var ram=$(".txtram").val();
	var bnt=$(".txtbnt").val();
	var thesim=$(".txtts").val();
	var dlpin=$(".txtdlp").val();
	var gia=$(".txtgia").val();
			if(masp==""){
				alert("Mã sản phẩm khoảng trống");}
			else
				{
				bootbox.confirm("Bạn có chắc sẽ sửa không ?",function(result){
				if(result==true){
					queryDataGET_JSON("php/admin.php",datasend,function(res){
					console.log(res);
					if(res["updatesp"]==1)
					{
						alert_info("Sửa thành công");
						builddsadmin(admin_current,recordadmin);
							$(".txttsp").val("");
							$(".txtmsp").val("");
							$(".txtmh").val("");
							$(".txthdh").val("");
							$(".txtcamt").val("");
							$(".txtcams").val("");
							$(".txtcpu").val("");
							$(".txtram").val("");
							$(".txtbnt").val("");
							$(".txtts").val("");
							$(".txtdlp").val("");
							$(".txtgia").val("");
						}
						else
						{
						alert_info("Sửa không thành công");
						}
						});
				}
				else{}});
					var datasend={
						event:"updatesp",
						tsp:tsp,
						masp:masp,
						manhinh:manhinh,
						hdh:hdh,
						camt:camt,
						cams:cams,
						cpu:cpu,
						ram:ram,
						bnt:bnt,
						thesim:thesim,
						dlpin:dlpin,
						gia:gia
					}	
				}
		})
//thông báo cho người dùng xóa sản phẩm
$(".btn_xoasanpham").click(function(){
	var tsp=$(".txttsp").val();
    var masp=$(".txtmsp").val();//lay gia i tu ô nhập liệu mã sản phẩm
    var manhinh=$(".txtmh").val();
	var hdh=$(".txthdh").val();
	var camt=$(".txtcamt").val();
	var cams=$(".txtcams").val();
	var cpu=$(".txtcpu").val();
	var ram=$(".txtram").val();
	var bnt=$(".txtbnt").val();
	var thesim=$(".txtts").val();
	var dlpin=$(".txtdlp").val();
	var gia=$(".txtgia").val();

	if(masp==""){
		//alert("Mã thể loại khác khoảng trống");
		alert_info("Mã sản phẩm khác khoảng trống");
	}
	else
	{
		bootbox.confirm("Bạn có chắc xóa sản phẩm "+masp+" không?",function(result){
		if(result==true){ //nếu nhấn ok
			var dataSend={
				event:"deletesp",
                tsp:tsp,
                masp:masp,
                manhinh:manhinh,
                hdh:hdh,
                camt:camt,
                cams:cams,
                cpu:cpu,
                ram:ram,
                bnt:bnt,
                thesim:thesim,
                dlpin:dlpin,
                gia:gia
			}
			queryDataGET_JSON("php/admin.php",dataSend,function(res){
				console.log(res);
				if(res["deletetl"]==1)
				{
					alert_error("Xóa không 	thanh cong"+admin_current);
					builddsadmin(admin_current,recordadmin);
						$(".txttsp").val("");
						$(".txtmsp").val("");
						$(".txtmh").val("");
						$(".txthdh").val("");
						$(".txtcamt").val("");
						$(".txtcams").val("");
						$(".txtcpu").val("");
						$(".txtram").val("");
						$(".txtbnt").val("");
						$(".txtts").val("");
						$(".txtdlp").val("");
						$(".txtgia").val("");
				}
				else
				{
					alert_info("Xóa  thanh cong");
				}
			});
		}
		else //Nếu nhấn cancel
		{
			
		}
		
	});
		
	}
});

////



function builddsadmin(page,record) {
   
    var dataSend={
		event:"getDSadmin",
		page:page,
        record:record
    }
    
    $(".listdsadmin").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/admin.php",dataSend,function (res) {
           $(".listdsadmin").html("");
			buildHTMLadminData(res);
         // alert_info("Da lay du lieu duoc"+res);  
      
    });
	
}
var resalladmin;//mang
//hien thi du lieu json lay tu server 
function buildHTMLadminData(res) {
   if(res.total==0){
	    $(".listdsadmin").html("Chưa có nội dung");
		
   }else{  
    var data = res.items;
   
    resalladmin=data;
	var stt=1;
   var currentpage=parseInt(res.page);
    stt=printSTT(recordadmin,currentpage);
    var html='';
	var vt=0;
    for (item in data) {
		var list=data[item];
		html=html +
		'<tr data-masp="' + list.masp + '" data-name="'+list.tsp + '" data-manhinh="'+list.manhinh+ '" data-hdh="'+list.hdh+ '" data-camt="'+list.camt+ '" data-cams="'+list.cams+ '" data-cpu="'+list.cpu+ '" data-ram="'+list.ram+ '" data-bnt="'+list.bnt+ '" data-thesim="'+list.thesim+ '" data-dlpin="'+list.dlpin+ '" data-gia="'+list.gia +'" data-vt="' + list.masp + '">' +
		'<td>' + stt + '</td>' +
		'<td>' + list.masp+'</td>'+
		'<td>' + list.tsp+'</td>'+
		'<td>' + list.manhinh+'</td>'+
		'<td>' + list.hdh+'</td>'+
		'<td>' + list.camt+'</td>'+
		'<td>' + list.cams+'</td>'+
		'<td>' + list.cpu+'</td>'+
		'<td>' + list.ram+'</td>'+
		'<td>' + list.bnt+'</td>'+
		'<td>' + list.thesim+'</td>'+
		'<td>' + list.dlpin+'</td>'+
		'<td>' + list.gia+'</td>'+

		'<td class="click_sua_admin"><i class="fa fa-eye"></i></td>'+
		'</tr>';
	stt++;
	vt++;
	
        $(".listdsadmin").html(html)
    }
    buildSlidePage($(".pagenumberadmin"),5,res.page,res.totalpage);
   }
}
var admin_current=0;
$(".pagenumberadmin").on('click','button',function () {
    
    admin_current=$(this).val();
    builddsadmin($(this).val(),recordadmin);
    
});
//click vào xem để đưa thông tin lên ô chứa

$(".listdsadmin").on('click',".click_sua_admin",function(){
	var masp=($(this).parents("tr").attr("data-masp"));
    var tsp=($(this).parents("tr").attr("data-name"));
    var manhinh=($(this).parents("tr").attr("data-manhinh"));
    var hdh=($(this).parents("tr").attr("data-hdh"));
    var camt=($(this).parents("tr").attr("data-camt"));
    var cams=($(this).parents("tr").attr("data-cams"));
    var cpu=($(this).parents("tr").attr("data-cpu"));
    var ram=($(this).parents("tr").attr("data-ram"));
    var bnt=($(this).parents("tr").attr("data-bnt"));
    var thesim=($(this).parents("tr").attr("data-thesim"));
    var dlpin=($(this).parents("tr").attr("data-dlpin"));
	var gia=($(this).parents("tr").attr("data-gia"));
    $(".txtmsp").val(resalladmin[masp].masp);
    $(".txttsp").val(resalladmin[masp].tsp);
	$(".txtmh").val(resalladmin[masp].manhinh);
    $(".txthdh").val(resalladmin[masp].hdh);
	$(".txtcamt").val(resalladmin[masp].camt);
	$(".txtcams").val(resalladmin[masp].cams);
	$(".txtcpu").val(resalladmin[masp].cpu);
	$(".txtram").val(resalladmin[masp].ram);
	$(".txtbnt").val(resalladmin[masp].bnt);
	$(".txtts").val(resalladmin[masp].thesim);
	$(".txtdlp").val(resalladmin[masp].dlpin);
	$(".txtgia").val(resalladmin[masp].gia);
	
});
