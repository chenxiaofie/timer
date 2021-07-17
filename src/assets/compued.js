/**
 * @author chenxiaofeng
 * @description 关于日期的综合计算方法
 */
const Calculation = {
    // 判断指定年份是否为闰年
    isleap(year) {
      const isleap =
        (year % 4 == 0 && year % 100 != 0) ||
        (year % 400 == 0 && year % 3200 != 0) ||
        year % 172800 == 0;
      return isleap;
    },
     //返回格式化后日期
  pushDate(array,date) {
      array[0]=date.getFullYear();array[1]=date.getMonth()+1;array[2]=date.getDate();
      array[1]=array[1]<10?"0"+array[1]:array[1]
      array[2]=array[2]<10?"0"+array[2]:array[2]
      return array
  },
    getWorkDay(num) {
   
      var t=[],w=[],n=new Date();
      t=Calculation.pushDate(t, n);
      var m= new Date(t[0],t[1],0).getDate();//获取当月天数
      for(var i=1;i<m;i++){
          var d= new Date(t[0],t[1]-1,i);
          var day=d.getDay();//判断星期天、星期六
          if(day===0){
            day=7
          }
        if(day<=num){
          console.log('工作日',day);
            // if(day!=6&&day!=0){
              Calculation.pushDate(t,d);
              w.push(t.join("-"))
          // }
        }
      }
      return w
    },
    getScoends(startTime,overTime){
      var d1 = new Date(startTime);
      var d2 = new Date(overTime);
      return  parseInt(d2 - d1) / 1000
    },
  //设置当前年月
      getNowdate(){
          var t=[],n=new Date();
        let time=  Calculation.pushDate(t,n)
        console.log(time);
      },
      format(fmt){
     const nowDate =new Date()
      var o = {
          "M+": nowDate.getMonth() + 1, // 月份
          "d+": nowDate.getDate(), // 日
          "h+": nowDate.getHours(), // 小时
          "m+": nowDate.getMinutes(), // 分
          "s+": nowDate.getSeconds(), // 秒
          "q+": Math.floor((nowDate.getMonth() + 3) / 3), // 季度
          "S": nowDate.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (nowDate.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
              return fmt;
      }
  };
  export default Calculation;
  
  