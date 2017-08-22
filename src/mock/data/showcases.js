import Mock from 'mockjs';

const showcases = [];

for (let i = 1; i < 68; i++) {
	showcases.push(Mock.mock({
		id: i,
		name: Mock.mock('@csentence(15, 18)'),
		cate: Mock.mock('@pick(["日用百货", "女装", "男装", "工艺礼品", "办公文教", "配饰", "数码家电", "运动户外"])'),
		type: Mock.mock('@pick(["其它", "全屏海报", "拼图广告", "活动节日", "产品陈列", "分类导航", "客服中心",])'),
		star: Mock.mock('@pick(["不推荐", "一星", "二星", "三星", "四星", "五星", "六星", "七星", "八星", "九星"])'),
		ctime: Mock.mock('@date("y-MM-dd")'),
		thumb: Mock.mock('@pick(["https://img.alicdn.com/imgextra/i4/682952594/TB29V04tJ0opuFjSZFxXXaDNVXa-682952594.png", "https://img.alicdn.com/imgextra/i1/682952594/TB2nToTcSB0XKJjSZFsXXaxfpXa-682952594.jpg"])'),
		code: 'mk^W:1659X:H:1617X:I:url();background-repeat:no-repeat;background-position:50% 0%;background-attachment:fixed;C:transparent;,true,true~tp^W:1399X:H:1591X:L:261X:T:27X:cursor:default;overflow:hidden;z-index:0;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i4/682952594/TB2cK4WqChlpuFjSspkXXa1ApXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~tp^W:455X:H:729X:L:473X:T:92X:cursor:default;overflow:hidden;z-index:1;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i4/682952594/TB2zVGNqB0kpuFjSsppXXcGTXXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~tp^W:177X:H:49X:L:670X:T:819X:cursor:default;overflow:hidden;z-index:2;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i3/682952594/TB2pau2qr8kpuFjy0FcXXaUhpXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~wb^W:146X:H:21X:L:701X:T:756X:font-family:宋体;text-align:left;z-index:3;,overflow-x:hidden;overflow-y:auto;color:#000;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,趣味卡通T恤,javascript:void(0);,_self,close,0.5,ease~wb^W:161X:H:29X:L:703X:T:784X:font-family:Arial;text-align:left;z-index:4;,overflow-x:hidden;overflow-y:auto;color:#f84a4c;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,RMB 48.00,javascript:void(0);,_self,close,0.5,ease~tp^W:505X:H:729X:L:1096X:T:303X:cursor:default;overflow:hidden;z-index:5;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i4/682952594/TB2R6p.qB0kpuFjSsziXXa.oVXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~wb^W:158X:H:25X:L:1138X:T:323X:font-family:宋体;text-align:left;z-index:6;,overflow-x:hidden;overflow-y:auto;color:#000;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,趣味卡通T恤,javascript:void(0);,_self,close,0.5,ease~wb^W:161X:H:29X:L:1139X:T:354X:font-family:Arial;text-align:left;z-index:7;,overflow-x:hidden;overflow-y:auto;color:#f84a4c;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,RMB 48.00,javascript:void(0);,_self,close,0.5,ease~tp^W:177X:H:49X:L:1113X:T:389X:cursor:default;overflow:hidden;z-index:8;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i3/682952594/TB2pau2qr8kpuFjy0FcXXaUhpXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~tp^W:491X:H:396X:L:327X:T:945X:cursor:default;overflow:hidden;z-index:9;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i3/682952594/TB2QwWpqrtlpuFjSspoXXbcDpXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~wb^W:146X:H:33X:L:713X:T:1286X:font-family:宋体;text-align:left;z-index:10;,overflow-x:hidden;overflow-y:auto;color:#000;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,趣味卡通T恤,javascript:void(0);,_self,close,0.5,ease~wb^W:161X:H:29X:L:713X:T:1312X:font-family:Arial;text-align:left;z-index:11;,overflow-x:hidden;overflow-y:auto;color:#f84a4c;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,RMB 48.00,javascript:void(0);,_self,close,0.5,ease~tp^W:177X:H:49X:L:682X:T:1342X:cursor:default;overflow:hidden;z-index:12;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i3/682952594/TB2pau2qr8kpuFjy0FcXXaUhpXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~tp^W:364X:H:598X:L:1122X:T:1006X:cursor:default;overflow:hidden;z-index:13;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i1/682952594/TB2scNrqCBjpuFjy1XdXXaooVXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true~wb^W:146X:H:33X:L:1016X:T:1096X:font-family:宋体;text-align:left;z-index:14;,overflow-x:hidden;overflow-y:auto;color:#000;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,趣味卡通T恤,javascript:void(0);,_self,close,0.5,ease~wb^W:161X:H:29X:L:1017X:T:1130X:font-family:Arial;text-align:left;z-index:15;,overflow-x:hidden;overflow-y:auto;color:#f84a4c;font-size:20X:text-decoration:none;cursor:default;line-H:28X:,x,RMB 48.00,javascript:void(0);,_self,close,0.5,ease~tp^W:177X:H:49X:L:1001X:T:1165X:cursor:default;overflow:hidden;z-index:16;,javascript:void(0);,_self,o,s100,ho,lrx,tbx,hs,I:url(https://imgY:imgextra/i3/682952594/TB2pau2qr8kpuFjy0FcXXaUhpXa-682952594.png);C:transparent;background-position:center;background-repeat:no-repeat;M:all 0.5s ease;E:all 0.5s ease;O:all 0.5s ease;N:all 0.5s ease;,0.5,ease,true'

	}));
}

export {showcases};

