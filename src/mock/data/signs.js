import Mock from 'mockjs';

const signs = [];

for (let i = 0; i < 86; i++) {
	signs.push(Mock.mock({
		id: Mock.mock('@increment()'),
		cate: Mock.mock('@pick(["女装", "男装", "童装", "工业", "数码", "鞋包", "家居", "食品", "美容", "母婴", "饰品"])'),
		pic: 'https://img.alicdn.com/imgextra/i3/682952594/TB28DsQbVXXXXbAXXXXXXXXXXXX-682952594.jpg'
	}));
}


export {signs};