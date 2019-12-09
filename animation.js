function animation(dom,target,time,callBack){
    var start = {};     // 存放dom样式的初始值
    var speed = {};     // 存放dom样式变化的速度

    // 获取需要变化的属性，遍历对象 atter是属性名
    for(var atter in target) {
        // console.log(atter);
        start[atter] = parseFloat(getStyle(dom, atter));        // 记得将字符串变为数字，即去掉单位
        speed[atter] = (target[atter] - start[atter])/time;       // 元素变化的速度
    }

    // 获取元素的初始值
    function getStyle(dom,atter){
        if(dom.currentStyle){       // IE8及其以下
            return dom.currentStyle[atter];
        }else{                      // IE8以上
            return window.getComputedStyle(dom,null)[atter];
        }
    }
    var startTime =  new Date;      // 获取最新的时间

    // 让元素运动
    var timer = setInterval(function(){
        var moveTime = new Date;    // 移动后的时间
        var _t = (moveTime - startTime)/1000;      // 时间差 单位为ms毫秒，换算为s秒

        for(var atter in target){
            if(atter === 'opacity'){
                dom.style[atter] = start[atter] +speed[atter]*_t;
            }else{
                dom.style[atter] = start[atter] + speed[atter]*_t + 'px';
            }
        }

        // 清除定时器
        if(_t >= time){           // 当元素显示大小大于或等于元素的终值，则清除定时器，并强制等于元素终值
            clearInterval(timer);                       // 清除定时器
            for(var atter in target){
                if(atter === 'opacity'){                    // 判断属性名是否为 opacity
                    dom.style[atter] = target[atter];
                }else{
                    dom.style[atter] = target[atter] + 'px';
                }
            }

            // 当元素运动到峰值时，执行callBack回调函数，恢复初始状态
            callBack && callBack.call(dom,start,time);   // &&找假值，如果没有callBack，则直接返回false，
        }
    },1)
}