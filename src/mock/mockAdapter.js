import axios from 'axios'//异步加载
import MockAdapter from 'axios-mock-adapter'//模拟异步加载
import {templates} from './data/templates';
import {signs} from './data/signs';
import {posters} from './data/posters';
import {usercases} from './data/usercases';
import {homecases} from './data/homecases';
import {detailcases} from './data/detailcases';
import {showcases} from './data/showcases';
import {loginusers} from './data/loginusers';



let mock = new MockAdapter(axios);

let [_posters, _signs, _usercases, _homecases, _detailcases, _showcases] = [posters, signs, usercases, homecases, detailcases, showcases];


mock.onPost('/login').reply(config => {
	let {username, password} = JSON.parse(config.data);
	return new Promise((resolve, reject) => {
		let user = null;
		setTimeout(() => {
			let hasUser = loginusers.some(item => {
				if (item.username === username && item.password === password) {
					user = JSON.parse(JSON.stringify(item));
					delete user.password;
					delete user.username;
					delete user.id;
					return true;
				}
			});
			console.log(hasUser);
			if (hasUser) {
				resolve([200, {code: 200, msg: '登录成功', user}]);
			} else {
				resolve([200, {code: 500, msg: '账号或密码错误'}]);
			}
		}, 500);
	})
});


// 获取模板数据
mock.onGet('/ali/template').reply(config=>{
	let {page, name} = config.params;
	let list = templates.filter(item=>{
		if (name && item.name.indexOf(name) === -1) return false;
		return true;
	});
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 1000);
	});
});



// 获取海报数据
mock.onGet('/ali/poster').reply(config=>{
	let {page, id} = config.params;
	let list = _posters;
	if (id) {
		id = id.split('|');//多个ID用 | 分隔
		list = _posters.filter(item => {
			if (!id.includes(item.id.toString())) return false;
			return true;
		});
	}
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 200)
	});
});

// 编辑海报
mock.onGet('/ali/poster_edit').reply(config => {
	let {id, cate, thumb, pic} = config.params;
	_posters.some(item => {
		if (item.id === id) {
			item.cate = cate;
			item.thumb = thumb;
			item.pic = pic;
			return true;
		}
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '编辑成功'
			}])
		}, 200)
	})
});

// 删除海报
mock.onGet('/ali/poster_del').reply(config => {
	let {id} = config.params;
	_posters = _posters.filter(item => item.id !== id);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200)
	})
});

// 多选删除海报
mock.onGet('/ali/poster_del_multi').reply(config => {
	let {ids} = config.params;
	ids = ids.split(',');
	_posters = _posters.filter(item => !ids.includes(item.id.toString()));
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}]);
		}, 200)
	})
});

// 新增海报
mock.onGet('/ali/poster_add').reply(config => {
	let {cate, thumb, pic} = config.params;
	let id = _posters[_posters.length-1].id + 1;
	_posters.push({
		id: id,
		cate: cate,
		thumb: thumb,
		pic: pic
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '新增成功'
			}])
		}, 200)
	})
})



// 获取店招数据
mock.onGet('/ali/sign').reply(config => {
	let {page, id} = config.params;
	let list = _signs;
	if (id) {
		id = id.split('|');
		list = _signs.filter(item => {
			if (!id.includes(item.id.toString())) return false;
			return true;
		})
	}
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 200)
	});
});

// 编辑店招
mock.onGet('/ali/sign_edit').reply(config => {
	let {id, cate, pic} = config.params;
	_signs.some(item => {
		if (item.id === id) {
			item.cate = cate;
			item.pic = pic;
			return true;
		}
	});
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve([200, {
				code: 200,
				msg: '编辑成功'
			}])
		}, 200)
	})
});

// 删除店招
mock.onGet('/ali/sign_del').reply(config => {
	let {id} = config.params;
	_signs = _signs.filter(item => item.id !== id);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200)
	})
})

// 多选删除店招
mock.onGet('/ali/sign_del_multi').reply(config => {
	let {ids} = config.params;
	ids = ids.split(',');
	_signs = _signs.filter(item => !ids.includes(item.id.toString()));
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200);
	})
});


// 新增店招
mock.onGet('/ali/sign_add').reply(config => {
	let {cate, pic} = config.params;
	let id = _signs[_signs.length-1].id + 1;
	_signs.push({
		id: id,
		cate: cate,
		pic: pic
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '新增成功'
			}])
		}, 200)
	})
});



// 获取客户案例
mock.onGet('/ali/usercases').reply(config => {
	let {page, id} = config.params;
	let list = _usercases;
	if (id) {
		id = id.split('|');
		list = _usercases.filter(item => {
			if (!id.includes(item.id.toString())) return false;
			return true;
		})
	}
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 200)
	})
});

// 删除客户案例
mock.onGet('/ali/usercases_del').reply(config => {
	let {id} = config.params;
	_usercases = _usercases.filter(item => item.id !== id);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200)
	})
});

// 多选删除客户案例
mock.onGet('/ali/usercases_del_multi').reply(config => {
	let {ids} = config.params;
	ids = ids.split(',');
	_usercases = _usercases.filter(item => !ids.includes(item.id.toString()));
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200);
	})
});

// 编辑客户案例
mock.onGet('/ali/usercases_edit').reply(config => {
	let {id, name, cate, shop, thumb, pic, tid} = config.params;
	_usercases.some(item => {
		if (item.id === id) {
			item.name = name;
			item.cate = cate;
			item.shop = shop;
			item.thumb = thumb;
			item.pic = pic;
			item.tid = tid;
			return true;
		}
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '编辑成功'
			}])
		})
	});
});

// 新增客户案例
mock.onGet('/ali/usercases_add').reply(config => {
	let {name, cate, shop, thumb, pic, tid} = config.params;
	let id = _usercases[_usercases.length-1].id + 1;
	_usercases.push({
		id: id,
		name: name,
		cate: cate,
		shop: shop,
		thumb: thumb,
		pic: pic,
		tid: tid
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '新增成功'
			}])
		}, 200)
	})
});



// 获取首页定制案例
mock.onGet('/ali/homecases').reply(config => {
	let {page, id} = config.params;
	let list = _homecases;
	if (id) {
		id = id.split('|');
		list = _homecases.filter(item => {
			if (!id.includes(item.id.toString())) return false;
			return true;
		})
	}
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 200)
	})
});

// 删除首页定制案例
mock.onGet('/ali/homecases_del').reply(config => {
	let {id} = config.params;
	_homecases = _homecases.filter(item => item.id !== id);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200)
	})
});

// 多选删除首页定制案例
mock.onGet('/ali/homecases_del_multi').reply(config => {
	let {ids} = config.params;
	ids = ids.split(',');
	_homecases = _homecases.filter(item => !ids.includes(item.id.toString()));
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200);
	})
});

// 编辑首页定制案例
mock.onGet('/ali/homecases_edit').reply(config => {
	let {id, name, intro, thumb, pic, detail} = config.params;
	_homecases.some(item => {
		if (item.id === id) {
			item.name = name;
			item.intro = intro;
			item.thumb = thumb;
			item.pic = pic;
			item.detail = detail;
			return true;
		}
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '编辑成功'
			}])
		}, 200);
	})
});

// 新增首页定制案例
mock.onGet('/ali/homecases_add').reply(config => {
	let {name, intro, thumb, pic, detail} = config.params;
	let id = _homecases[_homecases.length-1].id + 1;
	_homecases.push({
		id: id,
		name: name,
		intro: intro,
		thumb: thumb,
		pic: pic,
		detail: detail
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '新增成功'
			}])
		})
	})
});



// 获取详情定制案例
mock.onGet('/ali/detailcases').reply(config => {
	let {page, id} = config.params;
	let list = _detailcases;
	if (id) {
		id = id.split('|');
		list = _detailcases.filter(item => {
			if (!id.includes(item.id.toString())) return false;
			return true;
		})
	}
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 200)
	})
});

// 删除详情定制案例
mock.onGet('/ali/detailcases_del').reply(config => {
	let {id} = config.params;
	_detailcases = _detailcases.filter(item => item.id !== id);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200)
	})
});

// 多选删除详情定制案例
mock.onGet('/ali/detailcases_del_multi').reply(config => {
	let {ids} = config.params;
	ids = ids.split(',');
	_detailcases = _detailcases.filter(item => !ids.includes(item.id.toString()));
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200);
	})
});

// 编辑详情定制案例
mock.onGet('/ali/detailcases_edit').reply(config => {
	let {id, name, thumb, pic, detail} = config.params;
	_detailcases.some(item => {
		if (item.id === id) {
			item.name = name;
			item.thumb = thumb;
			item.pic = pic;
			item.detail = detail;
			true;
		}
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '编辑成功'
			}])
		}, 200);
	})
});

// 新增详情定制案例
mock.onGet('/ali/detailcases_add').reply(config => {
	let {name, thumb, pic, detail} = config.params;
	let id = _detailcases[_detailcases.length-1].id + 1;
	_detailcases.push({
		id: id,
		name: name,
		thumb: thumb,
		pic: pic,
		detail: detail
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '新增成功'
			}])
		})
	})
});




// 获取工具案例案例
mock.onGet('/ali/showcases').reply(config => {
	let {page, id} = config.params;
	let list = _showcases;
	if (id) {
		id = id.split('|');
		list = _showcases.filter(item => {
			if (!id.includes(item.id.toString())) return false;
			return true;
		})
	}
	let total = list.length;
	list = list.slice((page-1)*15, page*15);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				total: total,
				list: list
			}])
		}, 200)
	})
});

// 删除工具案例案例
mock.onGet('/ali/showcases_del').reply(config => {
	let {id} = config.params;
	_showcases = _showcases.filter(item => item.id !== id);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200)
	})
});

// 多选删除工具案例案例
mock.onGet('/ali/showcases_del_multi').reply(config => {
	let {ids} = config.params;
	ids = ids.split(',');
	_showcases = _showcases.filter(item => !ids.includes(item.id.toString()));
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '删除成功'
			}])
		}, 200);
	})
});

// 编辑工具案例案例
mock.onGet('/ali/showcases_edit').reply(config => {
	let {id, name, cate, type, star, thumb, code} = config.params;
	_showcases.some(item => {
		if (item.id === id) {
			item.name = name;
			item.cate = cate;
			item.type = type;
			item.star = star;
			item.code = code;
			item.thumb = thumb;
			return true;
		}
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '编辑成功'
			}])
		}, 200);
	})
});

// 新增工具案例案例
mock.onGet('/ali/showcases_add').reply(config => {
	let {name, cate, type, star, thumb, code} = config.params;
	let id = _showcases[_showcases.length-1].id + 1;

	_showcases.push({
		id: id,
		name: name,
		cate: cate,
		type: type,
		star: star,
		code: code,
		thumb: thumb,
		ctime: '06-05-17'
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([200, {
				code: 200,
				msg: '新增成功'
			}])
		})
	})
});