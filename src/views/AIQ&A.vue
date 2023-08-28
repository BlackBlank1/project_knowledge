<template>
  <div style="display: flex; flex-wrap: wrap">
    <div class="header">
      <div style="width: 100%; display: flex">
        <div>
          <img src="../images/logo.png" alt="">
        </div>
        <div>
          <h1>本地文献检索</h1>
        </div>
        <div style="display: flex;margin-left: 1380px">
          <div class="img1">
            <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG53f1be56e3d17850952ac8c7abc9a70b.png" alt="">
          </div>
          <div class="img2">
            <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGd856cfe424fa8f47bf7b1c0b388ba05f.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div style="background: rgb(240,242,245);">
      <div class="main">
        <div class="left_frame">
          <div style="margin-left: 9px; margin-top: 15px; margin-right: 9px">
            <el-input v-model="input" placeholder="请搜索历史问答" :prefix-icon="Search"></el-input>
          </div>
          <div v-for="item in messageData">
            <div style="margin-top: 15px; margin-left: 9px; font-size: 16px;color: rgba(0,0,0,0.45);">
              {{ item.date }}
            </div>
            <div class="chat_list" >
              <div style="padding-top: 3px">
                <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG05d892378be0c06eebefa60e4e401b25.png" alt="">
              </div>
              <div style="margin-left: 11px;padding-top: 3px" @click="open_history(item.text)">
                {{filter_string(item.text)}}
              </div>
              <div style="margin-right: 5px;padding-top: 3px;display: flex; justify-content: flex-end">
                <el-icon @click="remove(item)"><Delete /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="center_frame">
          <!-- 显示聊天消息的容器 -->
          <div class="message-container">
            <div v-for="message in messages" :key="message.id" style="margin-top: 20px; display: flex;flex-direction: column">
              <div class="mine-text">
                <div style="background: rgba(29,37,226,0.2);
                  border-radius: 4px 4px 4px 4px;padding: 5px">{{ message.text }}</div>
              </div>
              <div class="message-text">
                <div style="background: #E5EAFF; border-radius: 4px 4px 4px 4px;padding: 5px">怎么了 {{message.answer}}</div>
              </div>
            </div>
          </div>
          <!-- 输入消息的表单 -->
          <form @submit.prevent="sendMessage" style="margin-left: 140px; width: 806px; height: 47px;position: fixed;bottom: 0; margin-bottom: 30px">
            <el-input v-model="inputText" placeholder="输入问题" :suffix-icon="Promotion" style="width: 806px;
                height: 47px;
                background: #F2F3F5;
                box-shadow: 1px 1px 9px 2px rgba(34,67,186,0.2);
                border-radius: 4px 4px 4px 4px;
                opacity: 1;
                border: 1px solid rgba(0,0,0,0.05);"></el-input>
          </form>
        </div>
        <div class="right_frame">
          <div style="margin-left: 11px; height: 62px; display: flex">
            <div style="margin-left: 17px;margin-top: 17px">
              <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGcb2e3298ca6e258ff415a18c8aa003a8.png" alt="">
            </div>
            <div style="margin-left: 16px;margin-top: 15px">
              <h2>参考文献</h2>
            </div>
          </div>
          <div style="margin-left: 11px" v-for="item in literature_data">
            <el-divider border-style="double" />
            <div style="height: 213px; width: 491px;">
              <div>
                <h3>{{item.title}}</h3>
              </div>
              <div style="margin-top: 12px; display: flex; flex-wrap: wrap; margin-left: 10px">
                <div>
                  {{item.author}}
                </div>
                <div style="margin-left: 20px">
                  {{item.date}}
                </div>
              </div>
              <div style="height: 104px; margin-top: 12px; margin-left: 10px">
                {{item.content}}
              </div>
              <div style="float: right;margin-top: 12px">
                {{item.cite_count}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {ChatLineRound, Delete, Promotion, Search} from "@element-plus/icons-vue";

export default {
    computed: {
      Promotion() {
        return Promotion
      },
      Search() {
        return Search
      }
    },
    components: {Delete, ChatLineRound, Search},
    data(){
      return {
        input:"",
        literature_data: [{
          "title": "“蜂甲一体”作战中无人机装备维修保障方案构想",
          "author": "陈卫/胡昆鹏",
          "date": "2023.01",
          "content": "针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点......",
          "cite_count": "210被引用"
        }, {
          "title": "“蜂甲一体”作战中无人机装备维修保障方案构想",
          "author": "陈卫/胡昆鹏",
          "date": "2023.01",
          "content": "针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点......",
          "cite_count": "210被引用"
        }, {
          "title": "“蜂甲一体”作战中无人机装备维修保障方案构想",
          "author": "陈卫/胡昆鹏",
          "date": "2023.01",
          "content": "针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点......",
          "cite_count": "210被引用"
        }, {
          "title": "“蜂甲一体”作战中无人机装备维修保障方案构想",
          "author": "陈卫/胡昆鹏",
          "date": "2023.01",
          "content": "针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点......",
          "cite_count": "210被引用"
        }],
        inputText: '',
        messages: [],
        messageData: JSON.parse(localStorage.getItem('messageData')),
        isRefresh: false,
        current_date:""
      }
    },

    mounted() {
      if (window.performance.navigation.type === 1) {
        this.isRefresh = true
        console.log("页面被刷新")
      }else{
        console.log("首次被加载")
      }
    },

  methods: {
      getDate () {
        var date = new Date();   //创建日期对象
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var dates = date.getDate();
        return `${year}/${month}/${dates}`;
      },
      sendMessage() {
        if (this.inputText.trim()) {
          this.messages.push({
            "date": this.getDate(),
            "text": this.inputText,
            "answer": "aaaa",
          })
          // 从LocalStorage中获取已有数据
          let existingData = localStorage.getItem('messageData');
          let myData = existingData ? JSON.parse(existingData) : []; // 如果存在数据，则解析为数组；否则，初始化为空数组
          // 追加新的json数据
          let newData =
            {
            "date": this.getDate(),
            "text": this.inputText,
              "answer": "aaaa"
          };
          myData.push(newData);

          // 将更新后的数据存回LocalStorage
          localStorage.setItem('messageData', JSON.stringify(myData));
          this.messageData = JSON.parse(localStorage.getItem('messageData'));
          // this.messages = []
          this.inputText = '';
        }
      },
      open_history(text){
        this.messages.push({
          "date": this.getDate(),
          "text": text,
          "answer": "aaa",
        });
        // this.messages = []
      },
      filter_string(text){
        if (text.length > 12){
          return text.substring(0, 12) + "...";
        }
        return text;
      },
      remove(item){
        let data = JSON.parse(localStorage.getItem('messageData'));
        let index = 0;
        for(var i in data){
          if (data[i].date === item.date){
            console.log(1)
            if (data[i].text === item.text){
              console.log(2)
              if (data[i].answer === item.answer){
                console.log(3)
                data.splice(index, 1);
              }
            }
          }
          index ++;
        }
        localStorage.setItem('messageData', JSON.stringify(data));
        this.messageData = JSON.parse(localStorage.getItem('messageData'));
      }
    }
  }
</script>



<style>
.message-container {
  margin-bottom: 20px;
}

.message-text {
  opacity: 1;
  font-size: 16px;
  justify-content: left;
  padding-left: 20px;
  display: flex;
}

.mine-text {
  opacity: 1;
  font-size: 16px;
  display: flex;
  justify-content: right;
  margin-bottom: 20px;
  padding-right: 20px;
}

  .header{
    width: 100%;
    height: 86px;
    background: #2243BA;
    display: flex;
  }
  .header h1{
    width: 230px;
    height: 50px;
    font-size: 36px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 42px;
    margin-left: 39px;
    padding-top: 18px;
  }

  .main {
    margin-top: 10px;
    width: 1898px;
    height: 1000px;
    margin-left: 12px;
    margin-right: 10px;
    display: flex;
  }

  .left_frame {
    width: 278px;
    height: 976px;
    background: #FFFFFF;
    border-radius: 0 0 0 0;
    opacity: 1;
  }

  .center_frame {
    width: 1085px;
    height: 976px;
    background: #FFFFFF;
    border-radius: 0 0 0 0;
    opacity: 1;
    margin-left: 10px;
    overflow: auto;
  }

  .right_frame {
    margin-left: 10px;
    width: 515px;
    height: 976px;
    background: #FFFFFF;
    border-radius: 0 0 0 0;
    opacity: 1;
  }

  .el-divider.el-divider--horizontal {
    margin-bottom: 12px;
    margin-top: 0;
  }

  .img1 {
    margin-top: 20px;
  }
  .img1 :hover{
    cursor: pointer;
  }
  .img2 {
    margin-top: 20px;
    margin-left: 30px;
  }
  .img2 :hover{
    cursor: pointer;
  }

  .center_frame i.el-icon.el-input__icon {
    color: #2243BA;
    font-size: 24px;
  }

  .chat_list {
    width: 260px;
    height: 31px;
    margin-left: 9px;
    margin-right: 9px;
    display: flex;
    margin-top: 12px;
    flex-direction: row;
    justify-content: space-between;
  }

  .chat_list :hover{
    cursor: pointer;
    background: #CBD5FF;
  }
</style>