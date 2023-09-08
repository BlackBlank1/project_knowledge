<template>
  <div style="display: flex; flex-wrap: wrap">
    <div style="width: 1920px;height: 86px">
      <File_Header></File_Header>
    </div>
    <div class="main">
      <div class="left_frame">
        <File_SearchAndDirectory></File_SearchAndDirectory>
      </div>
      <div class="center_frame">
        <FilePDF pdf-url="../pdf/Nginx.pdf"></FilePDF>
      </div>
      <div class="right_frame">
        <div style="color: #5A22B5;text-align: center; width: 65px;height: 34px; margin-left: 20px" :class="{ active: 'directory' === 'directory' }">
          <div>AI辅读</div>
        </div>
        <div class="chat_frame" ref="centerFrame">
          <!-- 显示聊天消息的容器 -->
          <div class="message-container">
            <div v-for="message in messages" :key="message.date" style="margin-top: 20px; display: flex;flex-direction: column">
              <div class="mine-text">
                <div class="message-box">{{ message.text }}</div>
              </div>
              <div class="message-text">
                <div class="answer-box">
                  <vuetyped :strings="[message.answer]" :showCursor="false">
                    <div class="typing" />
                  </vuetyped>
                </div>
              </div>
            </div>
          </div>
          <!-- 输入消息的表单 -->
          <form @submit.prevent="sendMessage" style="width: 386px;height: 34px; display: flex; margin-left: 12px;margin-right: 11px;bottom: 0; position: fixed; margin-bottom: 17px">
            <el-input v-model="inputText" placeholder="输入问题" :suffix-icon="Promotion" style="width: 806px;
                height: 47px;
                background: #F2F3F5;
                box-shadow: 1px 1px 9px 2px rgba(34,67,186,0.2);
                border-radius: 4px 4px 4px 4px;
                opacity: 1;
                border: 1px solid rgba(0,0,0,0.05);margin-left: 10px"></el-input>
          </form>
        </div>
        <div style="margin-left: 12px;color: #5A22B5;margin-top: 10px;margin-bottom: -10px">
          <h3>问题推荐</h3>
        </div>
        <div class="right_footer" v-for="item in text">
          <div @click="open_history(item)" style="margin-top: 15px;border-radius: 4px 4px 4px 4px;margin-left: 12px;background: #F2F3F5;border: 1px solid #DDDFE5;cursor: pointer">
            {{item}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Promotion} from "@element-plus/icons-vue";
import {defineComponent} from "vue";
// import pdf from "@/views/pdf.vue";
import FilePDF from "@/components/PDFShow/FilePDF.vue";
import File_SearchAndDirectory from "@/components/SearchAndDirectory/File_SearchAndDirectory.vue";
import File_Header from "@/components/Headers/File_Header.vue"

export default defineComponent({
  computed: {
    Promotion() {
      return Promotion
    }
  },
  components:{
    FilePDF, File_SearchAndDirectory, File_Header
  },
  data(){
    return {
      inputText:"",
      messages: [],
      text: ['提出的方案旨在如何提高“蜂甲一体”作战系统的释放效率？',
        '在制定拟议方案时，无人机系统设备、组织和操作的特点是什么？',
        '“蜂甲一体”作战无人机装备维修保障方案提出的概念是什么？'],
      messageData: JSON.parse(localStorage.getItem('messageData')),
    }
  },
  methods:{
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
    open_history(text){
      this.messages.push({
        "date": this.getDate(),
        "text": text,
        "answer": "aaa",
      });
      // this.messages = []
    },
    scrollToBottom() {
      if (this.$refs.centerFrame) {
        this.$refs.centerFrame.scrollTop = this.$refs.centerFrame.scrollHeight;
      }
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    messageData() {
      this.$nextTick(() => {
        this.scrollToBottom();
        console.log(111)
      });
    }
  },
})

</script>

<style>
i.el-icon.el-input__icon {
  color: #5A22B5;
  font-size: 18px;
}
</style>

<style scoped>
.active {
  border-bottom: 2px solid #5A22B5;
}

.main {
  margin-top: 3px;
  width: 1898px;
  height: 1000px;
  margin-left: 12px;
  margin-right: 10px;
  display: flex;
}

.left_frame {
  width: 245px;
  height: 974px;
  background: #FFFFFF;
  border-radius: 0 0 0 0;
  opacity: 1;
  display: flex;
  flex-direction: row;
}

.center_frame {
  width: 1226px;
  height: 974px;
  background: #FFFFFF;
  border-radius: 0 0 0 0;
  opacity: 1;
  margin-left: 10px;
}

.right_frame {
  margin-left: 10px;
  width: 407px;
  height: 974px;
  background: #FFFFFF;
  border-radius: 0 0 0 0;
  opacity: 1;
  display: flex;
  flex-direction: column;
}

.chat_frame {
  max-width: 407px; /* 设置聊天框的最大宽度 */
  width: 407px;
  height: 700px;
  background: #FFFFFF;
  box-shadow: 2px 5px 11px -2px #E6DEF4;
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
}

.message-box {
  -webkit-background-clip: text; /* 设置背景色仅显示到文本内容的长度 */
  border-radius: 4px;
  padding: 5px;
  background: rgba(29,37,226,0.2);
  max-width: 60%; /* 设置消息框的最大宽度 */
  word-wrap: break-word; /* 如果字数过长，自动换行 */
  display: inline-block; /* 只显示到字数的长度 */
  margin-right: 20px;
}

.answer-box {
  -webkit-background-clip: text; /* 设置背景色仅显示到文本内容的长度 */
  border-radius: 4px;
  padding: 5px;
  max-width: 60%;
  background: #E6DEF4;
  word-wrap: break-word;
  display: inline-block; /* 只显示到字数的长度 */
  margin-left: 20px;
}
</style>