// JavaScript Document
$(".btn_login").click(function(){
	var username=$(".txtuser").val();//lay gia i tu ô nhập liệu mã thể loại
	var password=$(".txtpass").val();
	if(username==""){
		//alert("Mã thể loại khác khoảng trống");
		alert_info("Username khac rong");
	}
	else if(password==""){
		alert_info("pass khac rong");
	
	}else
	{
		var datasend={
			event:"login",
			username:username,
			password:password
		}
		queryDataGET_JSON("php/login.php",datasend,function(res){
			console.log(res);
			if(res.event==1){
				localStorage.setItem("userBS",res.items.username);
				localStorage.setItem("passBS",password);
				localStorage.setItem("avatar",res.items.avatar);
				location.href='admin.html';//đăng nhập đúng sẽ chuyển đến trang admin.html
			}else
			{
				alert_info("Username hoac mat khau sai");
			}
		});
	}
});
