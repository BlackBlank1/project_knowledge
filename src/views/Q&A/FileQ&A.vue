<template>
  <div class="FileQA">
    <div class="FileQA_header">
      <File_Header></File_Header>
    </div>
    <div style="background: rgb(240,242,245);">
      <div class="main">
        <div class="left_frame">
          <div class="left_frame_input">
            <el-input v-model="input" placeholder="请搜索历史问答" :prefix-icon="Search"></el-input>
          </div>
          <div v-for="item in groupedMessageData" class="list">
            <div class="left_frame_date">
              {{ item.date }}
            </div>
            <div class="history">
              <div class="chat_list" :class="{ selected: selectedItem === i }"  v-for="i in item.items">
                <div class="history_img">
                  <img src="../../images/talk.png" alt="">
                </div>
                <div class="history_text" @click="selectList(i, i.text)">
                  {{filter_string(i.text)}}
                </div>
                <div class="history_delete">
                  <el-icon @click="remove(i)"><Delete /></el-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center_frame" ref="centerFrame">
          <!-- 显示聊天消息的容器 -->
          <div class="message-container">
            <div v-for="message in messages" :key="message.date" class="message">
              <div class="mine-text">
                <div class="message-box">{{ message.text }}</div>
              </div>
              <div class="message-text">
                <div class="answer-box">
                  <vuetyped :type-speed="2" :strings="[message.answer]" :showCursor="false" :key="message.answer">
                    <div class="typing"></div>
                  </vuetyped>
                </div>
              </div>
            </div>
          </div>
          <!-- 输入消息的表单 -->
          <form @submit.prevent="sendMessage" class="sendMessage_input">
            <el-input v-model="inputText" placeholder="输入问题" :suffix-icon="Promotion" class="send_input"></el-input>
          </form>
        </div>
        <div class="right_frame">
          <div class="right_frame_div">
            <div class="right_frame_img">
              <img src="../../images/file_ref.png" alt="">
            </div>
            <div class="right_frame_h">
              <h2>参考文献</h2>
            </div>
          </div>
          <div class="right_frame_div2" v-for="item in literature_data" v-if="show">
            <el-divider border-style="double" />
            <div class="right_frame_content">
              <div style="cursor: pointer" @click="goToSearch()">
                <h3>{{item.name}}</h3>
              </div>
              <div class="content_author">
                <div>
                  {{item.author}}
                </div>
                <div class="content_date">
                  {{item.date}}
                </div>
              </div>
              <div class="content_content">
                {{item.bstract}}
              </div>
              <div class="content_cite_count">
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
import File_Header from "@/components/Headers/File_Header.vue";
import {reqAllQA} from "@/api";

export default {
  computed: {
    Promotion() {
      return Promotion
    },
    Search() {
      return Search
    },
    // groupedMessageData() {
    //   // 将messageData按照日期进行分组
    //   const groupedData = {};
    //
    //   this.messageData.forEach(item => {
    //     const date = item.date;
    //     if (!groupedData[date]) {
    //       groupedData[date] = [];
    //     }
    //     groupedData[date].push(item);
    //   });
    //   // 将分组后的数据按照日期排序
    //   const sortedKeys = Object.keys(groupedData).sort().reverse();
    //
    //   // 构建最终的分组数据
    //   const groupedMessageData = [];
    //   sortedKeys.forEach(key => {
    //     const group = {
    //       date: key,
    //       items: groupedData[key].reverse()
    //     };
    //     groupedMessageData.push(group);
    //   });
    //   console.log(groupedMessageData)
    //   return groupedMessageData;
    // }
  },
  components: {File_Header, VideoPause, Delete, ChatLineRound, Search},
  data(){
    return {
      show:false,
      input:"",
      literature_data: [],
      inputText: '',
      messages: [],
      // messageData: JSON.parse(localStorage.getItem('messageData')),
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
    this.inputText = this.$route.query.question;
    if (this.inputText !== ""){
      this.sendMessage(true)
    }else {
      this.sendMessage(false)
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
    sendMessage(isShow) {
      this.show = isShow;
      const date = Date.now();
      let data = {
        "question": this.inputText,
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

        reqAllQA(data).then((res) => {
          // 获取到回答后，更新 message 对象的回答
          this.messages.forEach((item) => {
            if (item.id === date){
              item.answer = res.answer;
              this.literature_data = res.docs;
              console.log(item)
            }
          })
          console.log(res);
        });
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
    goToSearch(){
      this.$router.push({
        name:"File_MainPage_Search"
      })
    }
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

<style scoped>
.left_frame_input{
  margin-left: 9px; margin-top: 15px; margin-right: 9px
}
.left_frame_date{
  margin-top: 15px; margin-left: 9px; font-size: 16px;color: rgba(0,0,0,0.45);
}
.history_img{
  scale: 0.3;margin-bottom: 30px;padding-top: 3px; margin-top: 4px
}
.history_text{
  margin-left: 11px;padding-top: 3px
}
.history_delete{
  margin-right: 5px;padding-top: 3px;display: flex; justify-content: flex-end;margin-top: 4px
}
.message{
  margin-top: 20px; display: flex;flex-direction: column
}
.sendMessage_input{
  margin-left: 140px; width: 806px; height: 47px;position: fixed;bottom: 0; margin-bottom: 30px
}
.send_input{
  width: 806px;
  height: 47px;
  background: #F2F3F5;
  box-shadow: 1px 1px 9px 2px rgba(34,67,186,0.2);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid rgba(0,0,0,0.05);
}
.right_frame_div{
  margin-left: 11px; height: 62px; display: flex
}
.right_frame_img{
  scale: 0.3;margin-bottom: 20px;margin-left: -30px
}
.right_frame_h{
  margin-left: -30px;margin-top: 15px
}
.right_frame_div2{
  margin-left: 11px;
}
.right_frame_content{
  height: 213px; width: 491px;
  font-size: 16px;
}
.right_frame_content h3{
  margin-top: -10px;
}
.content_author{
  margin-top: 12px; display: flex; flex-wrap: wrap; margin-left: 10px;
  font-size: 14px;
}
.content_date{
  margin-left: 20px
}
.content_content{
  height: 104px; margin-top: 12px; margin-left: 10px
}
.content_cite_count{
  float: right;margin-top: 12px;color: #5A22B5;
  margin-right: 10px;
}
</style>


<style scoped>
.FileQA {
  display: flex; flex-wrap: wrap;height: 1080px
}
.FileQA_header{
  width: 1920px;height: 86px
}

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
  background: #D2D3F9;
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
  background: #E6DEF4;
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
  overflow-x: hidden;
  overflow-y: scroll;
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
  background: rgba(206,189,233,0.85);
}
.chat_list.selected {
  background: rgba(206,189,233,0.85);
}
</style>

<style>
.FileQA .el-divider.el-divider--horizontal {
  margin-bottom: 12px;
  margin-top: 0;
}
.FileQA .center_frame i.el-icon.el-input__icon {
  color: #5A22B5;
  font-size: 24px;
}
</style>