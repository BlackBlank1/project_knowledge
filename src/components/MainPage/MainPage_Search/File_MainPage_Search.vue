<template>
  <div class="main">
    <div class="main_header">
      <div style="margin-top: 8px;margin-left: 209px;display: flex;flex-direction: row">
        <div @click="switchToFileSearch()" class="file_search" :class="{ active: selectedContentType === 'doc_search' }">
          <div style="margin: 6px;font-size: 16px;">
            文件检索
          </div>
        </div>
        <div @click="switchToAIQA()" class="AI_QA" :class="{ active: selectedContentType === 'doc_Q&A' }">
          <div style="margin: 6px;font-size: 16px;">
            文件AI问答
          </div>
        </div>
      </div>
      <div style="display: flex;flex-direction: row;width: 1208px;height: 47px;margin-top: 11px">
        <div style="margin-left: 209px;">
          <el-input v-model="input" :placeholder="input_text" style="width: 1065px;height: 47px;border-radius: 4px 4px 4px 4px;"></el-input>
        </div>
        <div style="margin-left: 24px;margin-top: 3px">
          <el-button type="primary" style="width: 138px;
            height: 41px;
            background: #894AEE;
            border-radius: 4px 4px 4px 4px; margin-left: -20px;
            " @click="search()">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div style="margin-top: -15px;">
        <div style="margin-left: 147px" v-for="item in literature_data">
          <el-divider border-style="double" style="width: 1625px"></el-divider>
          <div style="height: 190px; width: 1625px;">
            <div style="display: flex;flex-direction: row">
              <div>
                <h3>{{item.title}}</h3>
              </div>
              <div style="margin-left: 18px;width: 54px;
                  height: 20px;
                  background: rgba(90,34,181,0.1);
                  border-radius: 3px 3px 3px 3px;
                  border: 1px solid #5A22B5;
                  color: #5A22B5;text-align: center;margin-top: 5px">
                文件
              </div>
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
            <div style="float: left;margin-top: -12px">
              <el-button type="primary" style="background: #894AEE;" @click="preview()">预览</el-button>
              <el-button @click="download()">下载</el-button>
            </div>
            <div style="float: right;margin-top: 12px;color: #5B23B6;">
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
.main{
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