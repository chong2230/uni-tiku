// 格式化时间，格式为12:00:00
export const formatTime = (second) => {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
      i = parseInt(s / 60);
      s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
      return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
}
// 时间戳（毫秒）转化成年-月-日
export const formatDateString = (timestamp) => {
    if (timestamp === undefined) {
        return '';
    }
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    const month = parseInt(date.getMonth()) + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
};

// 时间戳（毫秒）转化成月-日
export const formatDateToMonthDay = (timestamp) => {
    if (timestamp === undefined) {
        return '';
    }
    const date = new Date(parseInt(timestamp));
    const month = parseInt(date.getMonth()) + 1;
    const day = date.getDate();
    return `${month}-${day}`;
};

export const formatStringWithHtml = (originString) => {
    if (originString === undefined) {
        return '';
    }
    const newString = originString
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    return newString;
};

// 格式化到二位时间格式，分钟：秒
export const formateMinSec = (sec) => {
    let minite = parseInt(sec / 60);
    if (minite < 10) minite = '0' + minite;
    let second = sec % 60;
    if (second < 10) second = '0' + second;
    return minite + ':' + second;
};

// 格式化到日期格式，传入参数：2018-09-30 22:13:55.0 转化成 2018-09-30
export const formatDate = (time) => {
    if (!time) return '';
    return time.substr(0, 10);
}

// 格式化到日期格式，传入参数：2018-09-30 22:13:55.0 转化成 2018-09-30 22:13:55
export const formatFullTime = (time) => {
    if (!time) return '';
    return time.substr(0, 19);
}

// 移除字符串前后的空白字符
export const trim = (str) => {
    if (!str) return '';
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 接收原生传回的字符串参数，转成对象, 如id=5&from=map
export const parseNativeArgs = (str) => {
    if (!str) return {};
    let obj = {};
    let arr = str.split('&');
    for (let i in arr) {
        let sub = arr[i].split('=');
        obj[sub[0]] = sub[1];
    }
    return obj;
}

// 获取播放量，低于10000显示具体数字，大于等于一万显示X.X万
export const getPlayNumber = (num) => {
    if (typeof num != 'number') return 0;
    if (num < 10000) return num;
    else if (num % 10000 < 500) return parseInt(num / 10000) + '万';
    else return (num / 10000).toFixed(1) + '万';
}

// 是否可转换为json
export const isJson = (str) => {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    return false;
}

// 获取字符串长度
export function getLength(str) {
    let reg1 = /^[\u4E00-\u9FA5]+$/ // 判断中文
    let count = 0
        // 判断中文标点
    for (let i = 0, len = str.length; i < len; i++) {
        if (!reg1.test(str[i])) {
            if (str[i].charCodeAt() > 255) {
                count++
            } else {
                count += .5
            }
        } else {
            count++
        }
    }
    return Math.ceil(count);
}

// 将对象转换为参数
export function parseObj(obj) {
	if (Object.prototype.toString.call(obj) !== '[object Object]') return '';
	var str = '';
	for (var key in obj) {
		let val = obj[key];
		str += key + '=' + val + '&';
	}
	return str.substr(0, str.length-1);
}

