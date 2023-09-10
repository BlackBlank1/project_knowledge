<template>
  <div class="FilePreview" style="">
    <div class="FilePreview_header" style="">
      <File_Header></File_Header>
    </div>
    <div class="main">
      <div class="left_frame">
        <File_SearchAndDirectory></File_SearchAndDirectory>
      </div>
      <div class="center_frame">
        <FilePDF :pdf-url="pdf_url"></FilePDF>
      </div>
      <div class="right_frame">
        <div class="right_frame_title" style="" :class="{ active: 'directory' === 'directory' }">
          <div>AI辅读</div>
        </div>
        <div class="chat_frame" ref="centerFrame">
          <!-- 显示聊天消息的容器 -->
          <div class="message-container">
            <div v-for="message in messages" :key="message.date" class="message1" style="">
              <div class="mine-text">
                <div class="message-box">{{ message.text }}</div>
              </div>
              <div class="message-text">
                <div class="answer-box">
                  <vuetyped :type-speed="2" :strings="[message.answer]" :showCursor="false" :key="message.answer">
                    <div class="typing" />
                  </vuetyped>
                </div>
              </div>
            </div>
          </div>
          <!-- 输入消息的表单 -->
          <form @submit.prevent="sendMessage" class="input_frame" style="">
            <el-input v-model="inputText" placeholder="输入问题" :suffix-icon="Promotion" class="right_frame_input" style=""></el-input>
          </form>
        </div>
        <div class="footer_title" style="">
          <h3>问题推荐</h3>
        </div>
        <div class="right_footer" v-for="item in text">
          <div @click="open_history(item)" class="footer_content" style="">
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
import {reqSinglePaper} from "@/api";

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
      pdf_url:"",
      pdf_title:""
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
      const date = Date.now();
      let data = {
        "question": this.inputText,
        "pdf_name": this.pdf_title
      }
      if (this.inputText.trim()) {
        const message = {
          "date": this.getDate(),
          "text": this.inputText,
          "answer": "正在获取回答...",
          "id": date,
        };
        this.messages.push(message);
        this.inputText = '';

        reqSinglePaper(data).then((res) => {
          // 获取到回答后，更新 message 对象的回答
          this.messages.forEach((item) => {
            if (item.id === date){
              item.answer = res.answer;
              console.log(item)
            }
          })
          console.log(res);
        });
      }
    },
    open_history(text){
      const date = Date.now();
      let data = {
        "question": text,
        "pdf_name": this.pdf_title
      }
      const message = {
        "date": this.getDate(),
        "text": text,
        "answer": "正在获取回答...",
        "id": date,
      };
      this.messages.push(message);
      reqSinglePaper(data).then((res) => {
        // 获取到回答后，更新 message 对象的回答
        this.messages.forEach((item) => {
          if (item.id === date){
            item.answer = res.answer;
            console.log(item)
          }
        })
        console.log(res);
      });
    },
    scrollToBottom() {
      if (this.$refs.centerFrame) {
        this.$refs.centerFrame.scrollTop = this.$refs.centerFrame.scrollHeight;
      }
    }
  },
  mounted() {
    this.scrollToBottom();
    this.pdf_title = localStorage.getItem("title");
    console.log(localStorage.getItem("title"));
    this.pdf_url = localStorage.getItem("pdf_url")
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

<style scoped>
.DocPreview_header{
  width: 1920px;height: 86px
}
.right_frame_title{
  color: #5A22B5;text-align: center; width: 65px;height: 34px; margin-left: 20px
}
.message1{
  margin-top: 20px; display: flex;flex-direction: column
}
.input_frame{
  width: 386px;height: 34px; display: flex; margin-left: 12px;margin-right: 11px;bottom: 0; position: fixed; margin-bottom: 17px
}
.right_frame_input{
  width: 806px;
  height: 47px;
  background: #F2F3F5;
  box-shadow: 1px 1px 9px 2px rgba(34,67,186,0.2);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid rgba(0,0,0,0.05);margin-left: 10px
}
.footer_title{
  margin-left: 12px;color: #5A22B5;margin-top: 10px;margin-bottom: -10px
}
.right_footer{
  width: 386px;
  height: 32px;
  background: #F2F3F5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DDDFE5;
  margin-top: 25px;
  margin-left: 10px;
}

.footer_content{
  cursor: pointer;
  margin-top: 10px;
  margin-left: 5px;
}
</style>

<style>
.FilePreview i.el-icon.el-input__icon {
  color: #5A22B5;
  font-size: 18px;
}
</style>

<style scoped>
.FilePreview{
  display: flex; flex-wrap: wrap
}
.FilePreview_header{
  width: 1920px;height: 86px
}
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
  max-width: 50%; /* 设置消息框的最大宽度 */
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