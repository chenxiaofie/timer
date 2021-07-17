<template>
  <img alt="Vue logo" src="./assets/logo.png" />
    <div>数据全部本地缓存，不涉及服务传输，请放心使用～～</div>
  <Time ref='TiemrCompoent'  :propsVal='propsVal' />
  <div class="selectBox" v-show="state.showView">
        <el-time-picker
        v-model="propsVal.startTime"
        placeholder="工作开始时间">
      </el-time-picker>
      <el-time-picker
        v-model="propsVal.overTime"
        placeholder="工作结束时间">
      </el-time-picker>
    <el-select v-model="propsVal.workDays" placeholder="每周工作天数">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
    </el-select>
      <el-input v-model="propsVal.monthMoney" placeholder="月薪（元）"></el-input>
      <el-button type="primary" @click="generateReult" >生成查看</el-button>
  </div>

</template>

<script setup>
import Time from "./components/time.vue";
import{ref,reactive,onMounted}from'vue'
const propsVal=ref({
  startTime:'',
  overTime:'',
  workDays:'',
  monthMoney:''
})
const state = reactive({
      showView:true,
      gonext:true
    })

let options=[{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '0',
          label: '7'
        }
        ]
const TiemrCompoent = ref(null); 

const generateReult=()=>{
       for(let i in propsVal._value){
          if(propsVal._value[i]=='null'){
            alert('填完问题才可以生成噢')
            return false
          }
          localStorage.setItem(i,propsVal._value[i])
       }
        TiemrCompoent.value.change()
        state.showView=!state.showView
    }

const getLocal=()=>{
    for(let i in propsVal._value){
          if(localStorage.getItem(i)!=null){
             propsVal._value[i]=localStorage.getItem(i)
          }else{
            state.gonext=false
        }
    }
}

 onMounted(()=>{  
   getLocal()
   if(state.gonext){
      let date=new Date()
       let time={
            statTime:new Date(propsVal._value.startTime),
            oveTime:new Date(propsVal._value.overTime)
       }
      let year=date.getFullYear()
      let month=date.getMonth()
      let day=date.getDate()
      for(let i in time){
        time[i].setFullYear(year) 
        time[i].setMonth(month)
        time[i].setDate(day)
      }
    propsVal._value.startTime=time.statTime
    propsVal._value.overTime=time.oveTime
    // if()
    generateReult()
   }
      
 })
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-input {
  width: 220px !important; 
  margin:  20px;
}
.el-button {
  width: 220px;
  display: inline-block;
}
</style>
