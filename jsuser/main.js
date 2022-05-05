// JavaScript Document
//alert("hello");
//bắt sự kiện click
//các sự kiện click các form
var recordhoadon=5;
$(".menu_hoadon").click(function(){
	console.log("click menu hoadon");
	swapmain("form_hoadon");
	builddshoadon(0,recordhoadon);
});
swapmain("form_hoadon");
var html='<li><a href="#">'+
'<i class="fa fa-tasks">'+
'<li class="active">Hóa Đơn</li>';

var recordcthoadon=5;
$(".menu_cthoadon").click(function(){
	console.log("click menu cthoadon");
	swapmain("form_cthoadon");
	builddscthoadon(0,recordcthoadon);
});
swapmain("form_cthoadon");
var html='<li><a href="#">'+
'<i class="">'+
'<li class="active">chi tiết Hóa Đơn</li>';

var recordctdonhang=5;
$(".menu_ctdonhang").click(function(){
	console.log("click menu ctdonhang");
	swapmain("form_ctdonhang");
	builddsctdonhang(0,recordctdonhang);
});
swapmain("form_ctdonhang");
var html='<li><a href="#">'+
'<i class="">'+
'<li class="active">chi tiết Đơn hàng</li>';

var recordddh=5;
$(".menu_ddh").click(function(){
	console.log("click menu ddh");
	swapmain("form_ddh");
	builddsddh(0,recordddh);
});
swapmain("form_ddh");
var html='<li><a href="#">'+
'<i class="">'+
'<li class="active">Đơn đặt hàng</li>';

var recordgiohang=5;
$(".menu_giohang").click(function(){
	console.log("click menu giohang");
	swapmain("form_giohang");
	builddsgiohang(0,recordgiohang);
});
swapmain("form_giohang");
var html='<li><a href="#">'+
'<i class="">'+
'<li class="active">Giỏ hàng</li>';

var recordnhanvien=5;
$(".menu_nhanvien").click(function(){
	console.log("click menu nhanvien");
	swapmain("form_nhanvien");
	builddsnhanvien(0,recordnhanvien);
});
swapmain("form_nhanvien");
var html='<li><a href="#">'+
'<i class="">'+
'<li class="active">nhân vien</li>';

var recordkhachhang=5;
$(".menu_khachhang").click(function(){
	console.log("click menu khachhang");
	swapmain("form_khachhang");
	builddskhachhang(0,recordkhachhang);
});
swapmain("form_khachhang");
var html='<li><a href="#">'+
'<i class="">'+
'<li class="active">Khách hàng</li>';

var recordthuonghieu=5;
$(".menu_thuonghieu").click(function(){
	console.log("click menu thuonghieu");
	swapmain("form_thuonghieu");
	builddsthuonghieu(0,recordthuonghieu);
});
swapmain("form_thuonghieu");
var html='<li><a href="#">'+
'<i class="menu_thuonghieu">'+
'<li class="active">thương hiệu</li>';
var recordspthuonghieu=5;
$(".menu_spthuonghieu").click(function(){
	console.log("click menu spthuonghieu");
	swapmain("form_spthuonghieu");
	builddsspthuonghieu(0,recordspthuonghieu);
});
swapmain("form_spthuonghieu");
var html='<li><a href="#">'+
'<i class="menu_spthuonghieu">'+
'<li class="active">sản phẩm thương hiệu</li>';

var recordadmin=5;
$(".menu_sanpham").click(function(){
	console.log("click menu sanpham");
	swapmain("form_sanpham");
	builddsadmin(0,recordadmin);
});
swapmain("form_sanpham");
var html='<li><a href="#">'+
'<i class="fa fa-mobile">'+

'<li class="active">Sản phẩm</li>';

$(".menu_theloai").click(function(){
	console.log("click menu theloai");
	//gọi hàm swapmain
	
	swapmain("form_thongtintheloai");
	var html='<li><a href="#">'+
			 '<i class="fa fa-home">'+
			 '</i> Danh mục</a></li>'+
             '<li class="active">Thể loại</li>';
	$(".titlebreadcrumb").html(html);		 
});
$(".menu_tacgia").click(function(){
	console.log("click menu tac gia");
	//gọi hàm swapmain
	swapmain("form_tacgia");
	var html='<li><a href="#">'+
			 '<i class="fa fa-home">'+
			 '</i> Danh mục</a></li>'+
             '<li class="active">Tác giả</li>';
	$(".titlebreadcrumb").html(html);	
});
$(".menu_nxb").click(function(){
	console.log("click menu nha xb");
	//gọi hàm swapmain
	swapmain("form_nhaxuatban");
	var html='<li><a href="#">'+
			 '<i class="fa fa-home">'+
			 '</i> Danh mục</a></li>'+
             '<li class="active">Nhà xuất bản</li>';
	$(".titlebreadcrumb").html(html);	
});
$(".menu_sach").click(function(){
	console.log("click menu sach");
	//gọi hàm swapmain
});
$(".menu_ddh").click(function(){
	swapmain("form_ddh");
});
//viết hàm trong javascript
//main: form_thongtintheloai,
function swapmain(main){
	$(".form_ddh").addClass("is-hidden");
	$(".form_thongtintheloai").addClass("is-hidden");
	$(".form_tacgia").addClass("is-hidden");
	$(".form_nhaxuatban").addClass("is-hidden");
	$("."+main).removeClass("is-hidden");
}
swapmain("form_ddh");
//xử lý sự kiệm click vào nút xử lý đơn hàng
$(".listallddh").on('click',".btn_xulydh",function(){
	console.log("click button xu ly don hang");
	//hiển thị modal 
	$(".showxulydh").modal("show");
});
$(".listallddh").on('click',".btn_xoadh",function(){
	bootbox.confirm("Bạn có chắc xóa đơn hàng",function(result){
		if(result==true){ //nếu nhấn ok
			console.log("ban da chon ok");
		}else //Nếu nhấn cancel
		{
			
		}
		
	});
});

//Ham duoc goi khi thao tac that bai
function alert_error(mes) {
    bootbox.alert({
        size: "small",
        title: "<span style='color: red'>Thất bại</span>",
        message: mes,
        callback: function(){ /* your callback code */ }
    });
}
//Ham duoc goi khi thao tac thanh cong
function alert_success(mes,callback) {
    bootbox.alert({
        size: "small",
        title: "Thành công",
        message: mes,
        callback: callback
    });
}
//Ham duoc goi khi thao tac nhac nho user 
function alert_info(mes) {
    bootbox.alert({
        size: "small",
        title: "Thông báo",
        message: mes,
        callback: function(){ /* your callback code */ }
    });
}
function isNumber(n) { 
	return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
}

function queryDataPOST(url,dataSend,callback){
    
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'json',
        success: callback
    });
}
function queryDataGET_TEXT(url,dataSend,callback){
    
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'text',
        success: callback
    });
}
function queryDataPOST_TEXT(url,dataSend,callback){
    
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'text',
        success: callback
    });
}
//goi ham
//Gui data Phuong Thuc GET

function queryDataGET_JSON(url,dataSend,callback){
    
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'JSON',
        success: callback
    });
}
function printSTT(record,pageCurr){
    if ((pageCurr+1)==1) {
        return 1;
    }else{
        return record*(pageCurr+1)-(record-1);
    }
}
//bo vao main
function buildSlidePage(obj, codan, pageActive, totalPage) {
	var html = "";
	pageActive = parseInt(pageActive);
	for (i = 1; i <= codan; i++) {
	if (pageActive - i < 0) break;
	html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">' + (pageActive - i + 1) + '</button>' + html;
	}
	if (pageActive > codan) {
	html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">...</button>' + html;
	}
	html += '<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' + pageActive + '">' + (pageActive + 1) + '</button>';
	for (i = 1; i <= codan; i++) {
	if (pageActive + i >= totalPage) break;
	html = html + '<button  type="button" class="btn btn-outline btn-default" value="' + (pageActive + i) + '">' + (pageActive + i + 1) + '</button>';
	}
	if (totalPage - pageActive > codan + 1) {
	html = html + '<button type="button" value="' + (pageActive + i) + '" class="btn btn-outline btn-default">...</button>';
	}
	obj.html(html);
	}
	
	
	function initUploadImage(idInput,idpreview,nameFuncion){
	'use strict';
	// Initialise resize library
	var resize = new window.resize();
	resize.init();
	// console.log("no");
	// Upload photo
	document.querySelector('#'+idInput).addEventListener('change', function (event) {
	event.preventDefault();
	
	// var input=$("#"+idInput);
	$("#"+idInput).change(function ()
	{
	// $("#"+idpreview).show();
	if (typeof(FileReader)!="undefined"){
	
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.ico|.jpg|.jpeg|.gif|.png)$/;
	
	$($(this)[0].files).each(function () {
	var getfile = $(this);
	if (regex.test(getfile[0].name.toLowerCase())) {
	var reader = new FileReader();
	reader.onload = function (e) {
	$("#imgPreviewStatus").attr("src",e.target.result);
	}
	reader.readAsDataURL(getfile[0]);
	//document.getElementById("savepath").value=getfile[0].name;
	//console.log(getfile[0]);
	}
	else {
	alert(getfile[0].name + " Không phải là file .");
	return false;
	}
	});
	}
	else {
	alert("Browser does not supportFileReader.");
	}
	});
	var files = event.target.files;
	var countFile=files.length;
	for (var i in files) {
	if (typeof files[i] !== 'object') return false;
	
	(function () {
	
	var initialSize = files[i].size;
	
	resize.photo(files[i], 1200, 'file', function (resizedFile) {
	
	var resizedSize = resizedFile.size;
	
	upload(resizedFile, function(res){
	console.log(res);
	var s=nameFuncion+"("+res+")";
	eval(s);
	});
	
	// This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
	resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {
	//console.log('Display the thumbnail to the user: ', thumbnail);
	});
	
	});
	
	}());
	
	}
	
	});
	};
	var upload = function (photo, callback) {

		var formData = new FormData();
		formData.append('photo', photo);
		
		$.ajax({
		url: './spuploadimagestatus/process.php',
		type : 'POST',
		data : formData,
		async: true,
		xhrFields: {
		withCredentials: true
		},
		processData: false,  // tell jQuery not to process the data
		contentType: false,  // tell jQuery not to set contentType
		success : callback
		});
		};
