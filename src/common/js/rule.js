const isImageUrlFn = value => {
	if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(value)) {
		return true;
	} else {
		return false;
	}
};


const isImageUrl = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('图片地址不能为空，请输入图片地址'));
	}
	if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(value)) {
		callback();
	} else {
		callback(new Error('请输入正确的图片地址，后缀必须是gif，jpg，jpeg，png的一种'));
	}
};


const isImagesUrl = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('图片地址不能为空，请输入图片地址'));
	}
	value = value.split('|');
	for (let i = 0; i < value.length; i++) {
		if (!isImageUrlFn(value[i])) {
			return callback('请输入正确的图片地址，后缀必须是gif，jpg，jpeg，png的一种');
		}
	}
	return callback();
};



const isUrl = (rule, value, callback) => {
	var reg = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
	+ "|" // 允许IP和DOMAIN（域名） 
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
	+ "[a-z]{2,6})" // first level domain- .com or .museum  
	+ "(:[0-9]{1,4})?" // 端口- :80  
	+ "((/?)|" // a slash isn't required if there is no file name  
	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  

	var re = new RegExp(reg);  
	if (!value) {
		return callback(new Error('网址不能为空，请输入网址'));
	}

	if (re.test(value)){ 
		callback();
	} else {  
		callback(new Error('请输入正确的网址'));
	}
};

export {isImageUrl, isImagesUrl, isUrl};


