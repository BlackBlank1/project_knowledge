<template>
  <div class="File_MainPage_Search">
    <div class="main_header">
      <div class="header_frame" style="">
        <div @click="switchToFileSearch()" class="file_search" :class="{ active: selectedContentType === 'doc_search' }">
          <div class="title" style="">
            文件检索
          </div>
        </div>
        <div @click="switchToAIQA()" class="AI_QA" :class="{ active: selectedContentType === 'doc_Q&A' }">
          <div class="title">
            文件AI问答
          </div>
        </div>
      </div>
      <div class="center_input" style="">
        <div class="input_frame" style="">
          <el-input v-model="input" :placeholder="input_text" class="search_input" style=""></el-input>
        </div>
        <div class="button_frame" style="">
          <el-button type="primary" class="button_search" style="" @click="search()">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content_frame" style="">
        <div class="content_div" style="" v-for="item in literature_data">
          <el-divider border-style="double" class="content_hr" style=""></el-divider>
          <div class="frame" style="">
            <div style="display: flex;flex-direction: row">
              <div>
                <h3>{{item.title}}</h3>
              </div>
              <div class="frame_title" style="">
                文献
              </div>
            </div>
            <div class="content_author" style="">
              <div>
                {{item.author}}
              </div>
              <div class="content_date" style="">
                {{item.date}}
              </div>
            </div>
            <div class="content_content" style="">
              {{item.content}}
            </div>
            <div class="button_list" style="">
              <el-button type="primary" style="background: #5A22B5;" @click="preview()">预览</el-button>
              <el-button @click="download()">下载</el-button>
            </div>
            <div class="content_cite" style="">
              {{item.cite_count}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Main_Search",
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
      }],
      selectedContentType: "doc_search",
      input_text: "搜索您想查阅的文献" //输入框里面的提示字
    }
  },
  methods:{
    switchToAIQA(){
      this.selectedContentType = "doc_Q&A";
      this.input_text = "输入文献相关文件";
    },
    switchToFileSearch(){
      this.selectedContentType = "doc_search";
      this.input_text = "搜索您想查阅的文件";
    },
    search(){
      if (this.selectedContentType === "doc_search"){
        console.log("doc_search");
        this.$router.push({
          name:"File_MainPage_Search"
        })
      } else if (this.selectedContentType === "doc_Q&A"){
        this.$router.push({
          name:"FileQ&A"
        })
      }
    },
    download(){

    },
    preview(){
      this.$router.push({
        name:"File_MainPage_Preview"
      })
    }
  }
}
</script>

<style scoped>
.header_frame{
  margin-top: 8px;margin-left: 209px;display: flex;flex-direction: row
}
.title{
  margin: 6px;font-size: 16px;
}
.center_input{
  display: flex;flex-direction: row;width: 1208px;height: 47px;margin-top: 11px
}
.input_frame{
  margin-left: 209px;
}
.search_input{
  width: 1065px;height: 47px;border-radius: 4px 4px 4px 4px;
}
.button_frame{
  margin-left: 24px;margin-top: 3px
}
.button_search{
  width: 138px;
  height: 41px;
  background: #894AEE;
  border-radius: 4px 4px 4px 4px; margin-left: -20px;
}
.content_frame{
  margin-top: -15px;
}
.content_div{
  margin-left: 147px
}
.content_hr{
  width: 1625px
}
.frame{
  height: 190px; width: 1625px;
}
.frame_title{
  margin-left: 18px;width: 54px;
  height: 20px;
  background: rgba(90,34,181,0.1);
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #5A22B5;
  color: #5A22B5;text-align: center;
}
.content_author{
  margin-top: 12px; display: flex; flex-wrap: wrap; margin-left: 10px
}
.content_date{
  margin-left: 20px
}
.content_content{
  height: 104px; margin-top: 12px; margin-left: 10px
}
.button_list{
  float: left;margin-top: -12px
}
.content_cite{
  float: right;margin-top: 12px;color: #5B23B6;
}
</style>

<style scoped>
.File_MainPage_Search{
  width: 1920px;
  height: 994px;
}

.main_header{
  width: 1625px;
  height: 142px;
  background-image: url("https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG794ea4a9f8935539d04c150a56e543b8.png");
  margin-top: 10px;
  margin-left: 147px;
  margin-right: 148px;
}
.AI_QA {
  width: 110px;
  height: 34px;
  text-align: center;
  cursor: pointer;
}
.AI_QA :hover{
  color: #5A22B5;
}
.file_search {
  width: 88px;
  height: 34px;
  text-align: center;
  cursor: pointer;
}
.file_search :hover{
  color: #5A22B5;
}
.active {
  border-bottom: 2px solid #5A22B5;
  color: #5A22B5;
}
</style>