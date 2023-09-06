<template>
  <div style="display: flex; flex-wrap: wrap;height: 1080px">
    <div style="width: 1920px;height: 86px">
      <Header></Header>
    </div>
    <div style="background: rgb(240,242,245);">
      <div class="main">
        <div class="left_frame">
          <div style="margin-left: 9px; margin-top: 15px; margin-right: 9px">
            <el-input v-model="input" placeholder="请搜索历史问答" :prefix-icon="Search"></el-input>
          </div>
          <div v-for="item in groupedMessageData" class="list">
            <div style="margin-top: 15px; margin-left: 9px; font-size: 16px;color: rgba(0,0,0,0.45);">
              {{ item.date }}
            </div>
            <div class="history">
              <div class="chat_list" :class="{ selected: selectedItem === i }"  v-for="i in item.items">
                <div style="padding-top: 3px; margin-left: 14px;margin-top: 4px">
                  <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG05d892378be0c06eebefa60e4e401b25.png" alt="">
                </div>
                <div style="margin-left: 11px;padding-top: 3px" @click="selectList(i, i.text)">
                  {{filter_string(i.text)}}
                </div>
                <div style="margin-right: 5px;padding-top: 3px;display: flex; justify-content: flex-end;margin-top: 4px">
                  <el-icon @click="remove(i)"><Delete /></el-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center_frame" ref="centerFrame">
          <!-- 显示聊天消息的容器 -->
          <div class="message-container">
            <div v-for="message in messages" :key="message.date" style="margin-top: 20px; display: flex;flex-direction: column">
              <div class="mine-text">
                <div class="message-box">{{ message.text }}</div>
              </div>
              <div class="message-text">
                <div class="answer-box">
                  <vuetyped :strings="[message.answer]" :showCursor="false">
                    <div class="typing"></div>
                  </vuetyped>
                </div>
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
import {ChatLineRound, Delete, Promotion, Search, VideoPause} from "@element-plus/icons-vue";
import Header from "@/components/Q&A/Header.vue";

export default {
    computed: {
      Promotion() {
        return Promotion
      },
      Search() {
        return Search
      },
      groupedMessageData() {
        // 将messageData按照日期进行分组
        const groupedData = {};

        this.messageData.forEach(item => {
          const date = item.date;
          if (!groupedData[date]) {
            groupedData[date] = [];
          }
          groupedData[date].push(item);
        });
        // 将分组后的数据按照日期排序
        const sortedKeys = Object.keys(groupedData).sort().reverse();

        // 构建最终的分组数据
        const groupedMessageData = [];
        sortedKeys.forEach(key => {
          const group = {
            date: key,
            items: groupedData[key].reverse()
          };
          groupedMessageData.push(group);
        });
        console.log(groupedMessageData)
        return groupedMessageData;
      }
    },
    components: {Header, VideoPause, Delete, ChatLineRound, Search},
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
        current_date:"",
        selectedItem: null,
      }
    },

    mounted() {
      if (window.performance.navigation.type === 1) {
        this.isRefresh = true
        console.log("页面被刷新")
      }else{
        console.log("首次被加载")
      }
      this.scrollToBottom();
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
            "answer": "针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点......",
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
      filter_string(text){
        if (text){
          if (text.length > 9){
            return text.substring(0, 9) + "...";
          }
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
      },
      selectList(item, text) {
        this.selectedItem = item;
        this.messages.push({
          "date": this.getDate(),
          "text": text,
          "answer": "aaa",
        });
      },
      scrollToBottom() {
        if (this.$refs.centerFrame) {
          this.$refs.centerFrame.scrollTop = this.$refs.centerFrame.scrollHeight;
        }
      },
    },
    watch: {
      messageData() {
        this.$nextTick(() => {
          this.scrollToBottom();
          console.log(111)
        });
      }
    },
  }
</script>



<style>
.center_frame {
  max-width: 1085px; /* 设置聊天框的最大宽度 */
  width: 1085px;
  height: 976px;
  background: #FFFFFF;
  opacity: 1;
  margin-left: 10px;
  overflow: auto;
}

.message-container {
  display: flex;
  flex-direction: column;
}

.mine-text {
  text-align: right; /* 右对齐发送的消息 */
  margin-bottom: 10px;
}

.message-text {
  text-align: left; /* 左对齐回答的消息 */
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}

.message-box {
  -webkit-background-clip: text; /* 设置背景色仅显示到文本内容的长度 */
  border-radius: 4px;
  padding: 5px;
  background: rgba(29,37,226,0.2);
  max-width: 40%; /* 设置消息框的最大宽度 */
  word-wrap: break-word; /* 如果字数过长，自动换行 */
  display: inline-block; /* 只显示到字数的长度 */
  margin-right: 20px;
}

.answer-box {
  -webkit-background-clip: text; /* 设置背景色仅显示到文本内容的长度 */
  border-radius: 4px;
  padding: 5px;
  max-width: 40%;
  background: #E5EAFF;
  word-wrap: break-word;
  display: inline-block; /* 只显示到字数的长度 */
  margin-left: 20px;
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

  .history :hover{
    cursor: pointer;
    background: #CBD5FF;
  }
  .chat_list.selected {
    background: #CBD5FF;
  }
</style>