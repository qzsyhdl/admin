import Mock from 'mockjs';

const usercases = [];

for (let i = 1; i < 68; i++) {
	usercases.push(Mock.mock({
		id: i,
		name: Mock.mock('@csentence(15, 18)'),
		tid: Mock.mock('@pick(["14337243679170", "14334037897410", "13678228213646", "13740330518303"])'),//标识
		cate: Mock.mock('@pick(["日用百货", "女装", "男装", "工艺礼品", "办公文教", "配饰", "数码家电", "运动户外"])'),
		shop: Mock.mock('@pick(["https://ivslan.1688.com", "https://runboym.1688.com", "https://fgss168.1688.com", "https://dfkids.1688.com"])'),
		thumb: Mock.mock('@pick(["https://img.alicdn.com/imgextra/i4/682952594/TB285.Je0RopuFjSZFtXXcanpXa-682952594.jpg", "https://img.alicdn.com/imgextra/i4/682952594/TB2pHc0lwRkpuFjy1zeXXc.6FXa-682952594.jpg"])'),
		pic: Mock.mock('@pick(["https://img.alicdn.com/imgextra/i4/682952594/TB27hIJe4xmpuFjSZFNXXXrRXXa-682952594.jpg", "https://img.alicdn.com/imgextra/i4/682952594/TB26R.xnItnpuFjSZFvXXbcTpXa-682952594.jpg"])')
	}));
}

export {usercases};


