<template>
  <div style="width: 1920px;height: 1080px;display: flex;flex-direction: column">
    <div>
      <Header></Header>
    </div>
    <div class="center">
      <div style="margin-top: 79px;margin-left: 345px;display: flex;flex-direction: row">
        <div @click="switchToFileSearch()" class="file_search" :class="{ active: selectedContentType === 'file_search' }">
          <div style="margin: 6px;font-size: 16px;">
            文件检索
          </div>
        </div>
        <div @click="switchToAIQA()" class="AI_QA" :class="{ active: selectedContentType === 'AI_QA' }">
          <div style="margin: 6px;font-size: 16px">
            AI问答
          </div>
        </div>
      </div>
      <div style="display: flex;flex-direction: row;width: 1208px;height: 47px;margin-top: 11px">
        <div style="margin-left: 345px;">
          <el-input v-model="input" :placeholder="input_text" style="width: 1065px;height: 47px"></el-input>
        </div>
        <div style="margin-left: 24px;margin-top: 3px">
          <el-button type="primary" style="width: 138px;
            height: 41px;
            background: #2243BA;
            border-radius: 4px 4px 4px 4px;
            " @click="search()">搜索</el-button>
        </div>
      </div>
    </div>
    <div style="height: 674px;width: 1898px; margin-top: 9px;margin-left: 12px;display: flex;flex-direction: row;background: rgb(241,243,244)">
      <div class="left">
        <div style="width: 170px; height: 63px;display: flex;flex-direction: row;border-bottom: 2px solid #2243BA;">
          <div style="margin-top: 14px">
            <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGded0b04f7f78579d8b4606fc7e50d096.png" alt="">
          </div>
          <div class="command_font">
            <div style="margin-top: 20px">
              文献推荐
            </div>
          </div>
        </div>
        <div style="margin-top: -24px;">
          <div style="margin-left: 11px" v-for="item in literature_data">
            <el-divider border-style="double" />
            <div style="height: 200px; width: 1111px;">
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
      <div class="right">
        <div style="width: 190px; height: 63px;display: flex;flex-direction: row;border-bottom: 2px solid #2243BA;">
          <div style="margin-top: 14px;margin-left: 14px">
            <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGb425fd0d570f7fed2efaef4f29b42dbe.png" alt="">
          </div>
          <div class="command_font">
            <div style="margin-top: 20px">
              文献图谱
            </div>
          </div>
        </div>
        <!--  知识图谱   -->
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
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
      }],
      selectedContentType: "file_search",
      input_text: "搜索您想查阅的文章" //输入框里面的提示字
    }
  },
  components:{
    Header
  },
  methods:{
    switchToAIQA(){
      this.selectedContentType = "AI_QA";
      this.input_text = "输入问题";
    },
    switchToFileSearch(){
      this.selectedContentType = "file_search";
      this.input_text = "搜索您想查阅的文章";
    },
    search(){
      if (this.input_text === "file_search"){
        console.log("file_search");
      }else {
        console.log("AI_QA")
      }
    }
  }
}
</script>

<style scoped>
  .center {
    width: 1898px;
    height: 299px;
    margin-top: 16px;
    margin-left: 12px;
    background-image: url("https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG794ea4a9f8935539d04c150a56e543b8.png");
  }
  .left {
    width: 1143px;
    height: 674px;
    background: #FFFFFF;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .right {
    width: 745px;
    height: 674px;
    background: #FFFFFF;
    margin-left: 10px;
  }
  .command_font {
    width: 96px;
    height: 22px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(0,0,0,0.85);
    line-height: 22px;
    margin-left: 6px;
  }
  .AI_QA {
    width: 88px;
    height: 34px;
    text-align: center;
    cursor: pointer;
  }
  .AI_QA :hover{
    color: #0a84ff;
  }
  .file_search {
    width: 88px;
    height: 34px;
    text-align: center;
    cursor: pointer;
  }
  .file_search :hover{
    color: #0a84ff;
  }
  .active {
    border-bottom: 2px solid blue;
  }
</style>

<style>
input.el-input__inner {
  width: 1065px;
  height: 47px;
  font-size: 18px;
}
</style>