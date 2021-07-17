<template>
    <div class="bg">
        <div class="aitjd"   :style="{width:state.now}"></div>
        <div v-if="state.showoverView==false"> 
            <p>加班辛苦！赚了{{state.feactureNum}}元</p>
            <code>{{state.msg}}</code>
            <el-button @click="todonow(true,state.feactureNum)">下班</el-button>
        </div>
        <div v-if="state.showoverView">
            <p>赚了{{state.overnum}}元</p>
            <code>{{state.msg}}</code>
        </div>
    </div>
    <el-dialog
    title="加班提示框"
    v-model="state.showView"
    :close-on-click-modal='showmoel'
    :show-close='showmoel'
    :close-on-press-escape='showmoel'
    width="30%"
    >
    <span> 目标达成了！要不要加班！</span>
    <template #footer>
        <span class="dialog-footer">
      <el-button @click="todonow(true)">下班</el-button>
      <el-button type="primary" @click="todonow(false)">加班</el-button>
    </span>
  </template>


</el-dialog>

  
</template>

<script setup>
import { ref, defineProps, reactive } from "vue";
import { useStore } from 'vuex';
import { watchEffect } from 'vue'
import { ElMessageBox } from 'element-plus';
let props = defineProps({
  max:String,
  now:String
});
const state=reactive({
    max:props.max,
    now:props.now,
    showView:false,
    feactureNum:'',
    overnum:0,
    showoverView:true,
    msg:'今天的还要继续加油噢！',
    type:true,
})
// let showView=ref(false)

const store = useStore();
let showmoel=false
function  todonow(type,num){
    state.showView=false
    if(!type){
            state.msg='今天的工作目标已经超预期了呀！'
            state.showoverView=false
    }else{
            // state.overnum=store.state.feactureNum
            // console.log(num,state.overnum);
            if(num>=props.max){
                if(num==props.max){
                 state.msg='今天的工作目标已经达成了噢！'
                }else{
                 state.msg='今天的工作目标已经超预期了呀！'
                }
                state.overnum=num
                localStorage.setItem('overnum',num)
            }else{
                state.msg='今天的工作目标已经达成了噢！'
                state.overnum=state.max
                localStorage.setItem('overnum',state.overnum)
            }
        localStorage.setItem('day',new Date().getDate())
         state.showoverView=true
        //    console.log(state.showoverView);
    }
}

watchEffect(() => {
    let day=localStorage.getItem('day')
    let num=localStorage.getItem('overnum')
    // 如果日期不是今天的说明还没下班确定下班了以后再更新
    if(num&&day==new Date().getDate()){
        state.now=Number((store.state.feactureNum/state.max)*100).toFixed(3)+'%'
        state.overnum=num
        state.showoverView=true
        todonow(true,num)
    }else{
    let val=Number((store.state.feactureNum/state.max)*100).toFixed(3)
    state.feactureNum=store.state.feactureNum
    state.now=Number((store.state.feactureNum/state.max)*100).toFixed(3)+'%'
    // 到达下班时间弹窗提示下班了
      state.overnum=state.feactureNum
    if(val>=100&&state.type){
            // setTimeout(() => {
                state.showView=true
                state.type=false
              
            // }, 200);
        }
    }

 
    })
</script>

<style scoped>
a {
  color: #42b983;
}
.aitjd{
    width: 10%;
    height: 100%;
    background-color: blue;
    background-image: url('');
    max-width: 100%;
    transition: .3s all;
}
.bg{
    width: 200px;
    height: 100px;
    background-color: red;
    background-image: url('');
    margin: 0 auto;
}
</style>
