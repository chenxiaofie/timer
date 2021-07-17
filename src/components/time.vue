<template>
  <div v-if="state.showView">
   加油今天的目标是{{state.ondDayMoney}}元！
   <!-- 现在赚了{{state.futureMoney}} -->
   <Jdt :max='state.ondDayMoney'/>
  </div>
</template>

<script setup>
import { ref, defineProps, reactive,useContext } from "vue";
 import { ElMessageBox } from 'element-plus';
  import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import Calculation from '../assets/compued.js'
import Jdt from "./jdt.vue";
let props = defineProps({
  propsVal:Object
});
const state = reactive({
      showView: false,
      ondDayMoney:'',
      pastSecondsMoney:'',
      futureMoney:'',
    })
const store = useStore();
const change=()=>{
        // Calculation.getNowdate()
        // 获取当前日期
      let propsVal=props.propsVal
        let workDays=Calculation.getWorkDay(propsVal.workDays)
        state.ondDayMoney=(propsVal.monthMoney/workDays.length).toFixed(0)
        const workDaysSeconds=Calculation.getScoends(propsVal.startTime,propsVal.overTime)
        const secondsMoney=(state.ondDayMoney/workDaysSeconds).toFixed(4)
        state.showView=true
        //进行计算
         let nowday=new Date(localStorage.getItem('startTime'))
        if(nowday.getDate()==new Date().getDate()&&Date.parse(new Date())<Date.parse(nowday)){
            ElMessageBox.alert('今天的上班时间还没到噢！', '小提示', {
                confirmButtonText: '确定',
              });
              return false
        }
        setInterval(()=>{
            const nowSeconds=Calculation.format("yyyy/MM/dd hh:mm:ss");
            const pastSeconds=Calculation.getScoends(propsVal.startTime,nowSeconds)
            state.pastSecondsMoney=(pastSeconds*secondsMoney).toFixed(3)
            state.futureMoney=(Number(state.pastSecondsMoney)+Number(secondsMoney)).toFixed(3)
   	        store.dispatch('increment', state.futureMoney)
   },1040)
}

const ctx=useContext()
ctx.expose({
  change // 明确的暴露接口
});

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
