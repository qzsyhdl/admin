import Mock from 'mockjs';

const posters = [];

for (let i = 1; i < 86; i++) {
	posters.push(Mock.mock({
		id: i,
		cate: Mock.mock('@pick(["女装", "男装", "童装", "工业", "数码", "鞋包", "家居", "食品", "美容", "母婴", "饰品"])'),
		thumb: 'https://img.alicdn.com/imgextra/i4/682952594/TB2z4lLeFXXXXa7XXXXXXXXXXXX-682952594.jpg',
		pic: 'https://img.alicdn.com/imgextra/i3/682952594/TB28DsQbVXXXXbAXXXXXXXXXXXX-682952594.jpg'
	}));
}

export {posters};