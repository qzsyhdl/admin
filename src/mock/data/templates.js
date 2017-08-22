import Mock from 'mockjs';

const templates = [];

for (let i = 0; i < 86; i++) {
	templates.push(Mock.mock({
		tid: Mock.mock('@pick(["14337243679170", "14334037897410", "13678228213646", "13740330518303"])'),//标识
		name: Mock.mock('@csentence(15, 20)'),
		type: Mock.mock('@pick(["旺铺", "官网", "手机", "实力商家"])'),
		cate: Mock.mock('@pick(["日用百货", "女装", "男装", "工艺礼品", "办公文教", "配饰", "数码家电", "运动户外"])'),
		color: Mock.mock('@pick(["蓝", "红", "黑", "绿", "橙粉", "黑白", "炫彩"])'),
		price: Mock.mock('@integer(40, 92)'),
		sale: Mock.mock('@integer(10, 5000)')
	}));
}

export {templates};