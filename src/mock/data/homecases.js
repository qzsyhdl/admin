import Mock from 'mockjs';

const homecases = [];

for (let i = 1; i < 68; i++) {
	homecases.push(Mock.mock({
		id: i,
		name: Mock.mock('@csentence(15, 18)'),
		intro:  Mock.mock('@csentence(20, 28)'),
		thumb: Mock.mock('@pick(["https://img.alicdn.com/imgextra/i4/682952594/TB2k3xveiRnpuFjSZFCXXX2DXXa-682952594.jpg", "https://img.alicdn.com/imgextra/i2/682952594/TB20ibgq3xlpuFjSszgXXcJdpXa-682952594.jpg"])'),
		pic: Mock.mock('@pick(["https://img.alicdn.com/imgextra/i1/682952594/TB2FfwsehBmpuFjSZFsXXcXpFXa-682952594.jpg", "https://img.alicdn.com/imgextra/i4/682952594/TB2PSwBehxmpuFjSZFNXXXrRXXa-682952594.jpg"])'),
		detail: 'https://img.alicdn.com/imgextra/i4/682952594/TB2sYdjotFopuFjSZFHXXbSlXXa-682952594.jpg|https://img.alicdn.com/imgextra/i3/682952594/TB26k6RlYBkpuFjy1zkXXbSpFXa-682952594.jpg|https://img.alicdn.com/imgextra/i4/682952594/TB2rjVvoC0mpuFjSZPiXXbssVXa-682952594.jpg|https://img.alicdn.com/imgextra/i1/682952594/TB2DfEvlYRkpuFjSspmXXc.9XXa-682952594.jpg|https://img.alicdn.com/imgextra/i2/682952594/TB2bAMjl3xlpuFjSszbXXcSVpXa-682952594.jpg|https://img.alicdn.com/imgextra/i4/682952594/TB2UoNbmgxlpuFjy0FoXXa.lXXa-682952594.jpg'
	}));
}

export {homecases};

