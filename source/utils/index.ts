/**
 * 格式化数字
 * @param number 待处理的数字
 * @param fixed 保留的小数位数
 * @returns {string} 返回格式化后的字符串
 */

export const partition = (number: number, fixed: number) => {
    return number.toFixed(fixed).replace(/\d(?=(?:\d{3})+\b)/g, '$&,')
};

/**
 * 像素转换rem
 * @param px
 * @returns {number}
 */
const scaleToRem = (px: number) => {
    return px * 10 / 750;
};

/**
 * 判断设备类型
 * @returns {*|string}
 */
const judgeMediaTypes = () => {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.indexOf('ipad') >= 0;
    const bIsIphoneOs = sUserAgent.indexOf('iphone os') >= 0;
    const bIsMidp = sUserAgent.indexOf('midp') >= 0;
    const bIsUc7 = sUserAgent.indexOf('rv:1.2.3.4') >= 0;
    const bIsUc = sUserAgent.indexOf('ucweb') >= 0;
    const bIsAndroid = sUserAgent.indexOf('android') >= 0;
    const bIsCE = sUserAgent.indexOf('windows ce') >= 0;
    const bIsWM = sUserAgent.indexOf('windows mobile') >= 0;
    const bIsWeChart = sUserAgent.indexOf('micromessenger') >= 0;
    let mediaType = bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ? 'phone' : 'pc';
    mediaType = bIsWeChart ? 'weChart' : mediaType;

    return mediaType;
};

/**
 * 解析浏览器url参数转化为对象
 * @param url
 */
const getUrlParams = (url: string) => {
    const reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(url),
        ret: any = {};
    if (arr_url && arr_url[1]) {
        const str_para = arr_url[1];
        let result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
};

/**
 * 生成n位长度的随机字符串
 * @param n
 */
const randomStr = (n: number) => { // 生成n位长度的字符串
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 可以作为常量放到random外面
    let result = '';
    for (let i = 0; i < n; i++) {
        result += str[parseInt(String(Math.random() * str.length))];
    }
    return result;
};

/**
 * 数字转为千分位表达
 * @param num
 * @param precision
 * @param type
 */
const staticNumber = (num: number, precision?: number, type?: string): string => {
    const p = precision || 0;
    const t = type || 'number';
    if (t === 'percent') {
        num = num * 100;
    }
    const numStr = num.toString();
    const nums = numStr.split('.');
    let str = nums[0];
    str = str.replace(/\d{1,3}(?=(\d{3})+$)/g, (s: string) => {
        return s + ',';
    });

    // 小数位保留两位小数
    let prec = '';
    if (nums.length === 1) {
        for (let i = 0; i < p; i++) {
            prec += '0';
        }
    }
    if (nums.length === 2) {
        for (let i = 0; i < p; i++) {
            if (nums[1][i]) {
                prec += nums[1][i];
            } else {
                prec += '0';
            }
        }
    }
    let result = '';
    if (p === 0) {
        result = str;
    } else {
        result = `${str}.${prec}`;
    }
    if (t === 'percent') {
        return result + '%';
    } else {
        return result;
    }
};

const waitTime = (time: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        window.setTimeout(() => {
            resolve();
        }, time)
    })
}


const similar = (s: string, t: string, f?: number | undefined): number => {
    if (!s || !t) {
        return 0
    }
    const l = s.length > t.length ? s.length : t.length
    const n = s.length
    const m = t.length
    const d: any = []
    f = f || 3
    const min = (a: number, b: number, c: number) => {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    let i: number, j, si: string, tj: string, cost: number
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    const res = (1 - d[n][m] / l)
    return parseFloat(res.toFixed(f))
}

const quickSort = (arr: Array<any>, sort: string, key?: string): Array<any> => {
    if (arr.length <= 1) {
        return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (sort === 'desc') {
            if (key) {
                if (arr[i][key] > pivot[key]) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            } else {
                if (arr[i] > pivot) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
        }
        if (sort === 'asc') {
            if (key) {
                if (arr[i][key] < pivot[key]) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            } else {
                if (arr[i] < pivot) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
        }
    }
    return quickSort(left, sort, key).concat([pivot], quickSort(right, sort, key));
};

const getUrlRelativePath = (): string => {
    const url = document.location.toString();
    const arrUrl = url.split('//');

    const start = arrUrl[1].indexOf('/');
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf('?') !== -1) {
        relUrl = relUrl.split('?')[0];
    }
    return relUrl;
}

const debounce = (fn: Function, wait: number) => {
    let timer: number | NodeJS.Timeout | null = null;
    return () => {
        if (timer !== null) {
            clearTimeout(<NodeJS.Timeout>timer);
        }
        timer = setTimeout(fn, wait);
    }
}

export {
    scaleToRem,
    judgeMediaTypes,
    getUrlParams,
    randomStr,
    staticNumber,
    waitTime,
    similar,
    quickSort,
    getUrlRelativePath,
    debounce,
}
