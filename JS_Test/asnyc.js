//随手测试
let a = '1';
console.log(a);

let b = '2';
console.log(b);

//异步原理
setTimeout(function(){
    console.log('开始')
});

new Promise(function(resolve){
    console.log('执行for任务');

    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数')
});

console.log('结束');

// 预计流程为：
// 1.读取到settimeout，将settimeout加入异步队列
// 2.读取到promise，执行实际函数，输出“执行for循环”，等待，将then函数加入队列
// 3.读取到结束，输出“结束”
// 4.开始执行异步队列，依次输出“开始”和“执行then函数”
// 即 执行for循环 结束 开始 执行then函数

// 执行结果为：
// 执行for循环
// 结束
// 执行then函数
// 开始

// 开始和执行then函数的顺序颠倒了
// 查找资料发现，settimeout会将内容作为一个大任务（等同于全局）推入异步队列，
// 而每当一个大任务被完成时，会优先检测异步队列中的小任务（promise等提供的），小任务全部执行完毕后，再按顺序读取异步队列中的大任务（成为新的全局），形成循环
// 可以理解为存在两个异步队列，按照 大1 全部小 大2 全部小 大3 全部小....的顺序执行
// 或者理解为 每一个大任务自带一个存储小任务的异步队列，大任务在执行完自身异步队列后才算结束，之后顺序执行其他的大任务；而settimeout提供大任务，promise提供小任务


//验证部分
console.log('开始大任务')
setTimeout(function(){
    console.log('开始SetTimeOut1任务')
    new Promise(function(resolve){
        console.log('小任务1');
    
        for(var i = 0; i < 10000; i++){
           if(i==20)
           {
               console.log('小任务1计时');
               resolve();
           }
        }
    }).then(function(){
        console.log('执行小任务1then函数')
    });
    setTimeout(function(){
        console.log('SetTimeOut1中的settimeout')
    })
    new Promise(function(resolve){
        console.log('小任务2');
    
        for(var i = 0; i < 10000; i++){
           if(i==20)
           {
               console.log('小任务2计时');
               resolve();
           }
        }
    }).then(function(){
        console.log('执行小任务2then函数')
    });
});

new Promise(function(resolve){
    console.log('执行大任务中promise');

    for(var i = 0; i < 10000; i++){
       if(i==10)
       {
           console.log('大任务计时');
           resolve();
       }
    }
}).then(function(){
    console.log('执行then函数')
});

console.log('大任务结束');

setTimeout(function(){
    console.log('开始SetTimeOut2任务')
    new Promise(function(resolve){
        console.log('小任务3');
    
        for(var i = 0; i < 10000; i++){
           if(i==20)
           {
               console.log('小任务3计时');
               resolve();
           }
        }
    }).then(function(){
        console.log('执行小任务3then函数')
    });
    new Promise(function(resolve){
        console.log('小任务4');
    
        for(var i = 0; i < 10000; i++){
           if(i==20)
           {
               console.log('小任务4计时');
               resolve();
           }
        }
    }).then(function(){
        console.log('执行小任务4then函数')
    });
});

// 执行结果:
// 开始（全局）大任务
// （此时插入了settimeout1）
// 执行（全局）大任务中promise
// （全局）大任务计时
// （全局）大任务结束
// （此时插入了settimeout2）
// 执行then函数(大任务中的小任务)
// 开始SetTimeOut1任务（大任务）
// 小任务1
// 小任务1计时
// （此时插入了settimeout3）
// 小任务2
// 小任务2计时
// 执行小任务1then函数（大任务中的两个小任务）
// 执行小任务2then函数
// 开始SetTimeOut2任务（大任务）
// 小任务3
// 小任务3计时
// 小任务4
// 小任务4计时
// 执行小任务3then函数（大任务中的两个小任务）
// 执行小任务4then函数
// SetTimeOut1中的settimeout（settimeout1中的settimeout作为大任务排到了settimeout2之后）


//练习
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 预计结果
// 1 7 6 8 2 4 3 5 9 11 10 12
// 实际输出
// 1
// 7
// 6
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 12
// 一致
