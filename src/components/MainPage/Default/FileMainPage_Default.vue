<template>
  <div class="File_MainPage_Default">
    <div class="File_MainPage_Default_header">
      <div @click="switchToFileSearch()" class="file_search" :class="{ active: selectedContentType === 'file_search' }">
        <div class="header_div1">
          文件检索
        </div>
      </div>
      <div @click="switchToAIQA()" class="AI_QA" :class="{ active: selectedContentType === 'file_Q&A' }">
        <div class="header_div1">
          文件和AI问答
        </div>
      </div>
    </div>
    <div class="switch_button">
      <el-switch
          v-model="switch_value"
          inline-prompt
          active-text="文件"
          inactive-text="文献"
          width="112px"
          size="large"
          style="--el-switch-on-color: #5A22B5; --el-switch-off-color: #2344BB;" class="custom-switch"
          active-value="1"
          inactive-value="0" @change="switch_model()"/>
    </div>
    <div class="search_frame" style="">
      <div class="search_frame_input">
        <el-input v-model="input" :placeholder="input_text" class="search_input"></el-input>
      </div>
      <div class="search_frame_button">
        <el-button type="primary" class="search_button" @click="search()">搜索</el-button>
      </div>
    </div>
  </div>
  <div class="footer" style="">
    <div class="left">
      <div class="left_frame" style="">
        <div class="left_img" style="">
          <img src="../../../images/ref_wenjian.png" alt="">
        </div>
        <div class="command_font">
          <div class="command_font_title" style="">
            文献推荐
          </div>
        </div>
      </div>
      <div class="left_div2" style="">
        <div class="left_div2_content" style="" v-for="item in literature_data">
          <el-divider border-style="double" />
          <div class="content_frame" style="">
            <div style="display: flex;flex-direction: row">
              <div @click="goToSearch()" style="cursor: pointer;">
                <h3>{{item.title}}</h3>
              </div>
              <div class="content_frame_title" style="">
                <div class="f1">
                  文献
                </div>
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
            <div class="content_cite" style="">
              {{item.cite_count}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_frame" style="">
        <div class="right_frame_div1" style="">
          <img src="../../../images/wenjian.png" alt="">
        </div>
        <div class="command_font">
          <div class="command_font_div" style="">
            文献图谱
          </div>
        </div>
      </div>
      <!--  知识图谱   -->
      <div>
        <div id="main" class="knowledge_img" style=""></div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/Headers/Doc_Header.vue";
import * as echarts from 'echarts';
import graph from '../../../views/data.json';
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
        "title": "FSAC赛车横向控制系统设计与研究",
        "name":"b.pdf",
        "single_name":"FSAC赛车横向控制系统设计与研究_李金畅.pdf",
        "author": "陈卫/胡昆鹏",
        "date": "2023.01",
        "content": "针对 FSAC 大赛特殊的比赛环境及目前赛车路径跟踪误差较大等情况，本文对无\n" +
            "人车的横向运动控制系统进行研究。在满足安全性及操作稳定性的基础上，进行控制\n" +
            "策略的研究及横向运动控制器的设计，并以 Simulink 与 Carsim 联合仿真来验证控制器\n" +
            "的鲁棒性。本文对 FSAC 赛车横向运动控制系统的设计与研究工作",
        "cite_count": "210被引用"
      }],
      selectedContentType: "file_search",
      input_text: "搜索您想查阅的文章", //输入框里面的提示字
      switch_value:"1",
    }
  },
  components:{
    Header
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('main'));
    // console.log(graph)
    myChart.hideLoading();
    graph.nodes.forEach(function (node) {
      node.label = {
        show: node.symbolSize > 30
      };
    });
    let option = {
      title: {
        text: 'Les Miserables',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      layout: "none",

      color: ['rgba(63,111,111)', 'rgba(63,111,111,0.8)', 'rgba(63,111,111,0.6)', 'rgba(63,111,111,0.4)', 'rgba(63,111,111,0.2)'],
      tooltip: {},
      legend: [
        {
          // selectedMode: 'single',
          data: graph.categories.map(function (a) {
            return a.name;
          })
        }
      ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'none',
          draggable: true,
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },

          itemStyle: {},
          lineStyle: {
            color: 'source',
            // curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  },
  methods:{
    switchToAIQA(){
      this.selectedContentType = "file_Q&A";
      this.input_text = "输入文件相关提问";
    },
    switchToFileSearch(){
      this.selectedContentType = "file_search";
      this.input_text = "搜索您想查阅的文件";
    },
    search(){
      if (this.selectedContentType === "file_search"){
        this.$router.push({
          name:"File_MainPage_Search"
        })
      } else if (this.selectedContentType === "file_Q&A"){
        this.$router.push({
          name:"FileQ&A",
          query:{
            question:this.input
          }
        })
      }
    },
    switch_model(){
      this.$router.push({
        name:"Doc_MainPage"
      })
    },
    goToSearch(){
      this.$router.push({
        name:"File_MainPage_Search"
      })
    }
  }
}
</script>

<style scoped>
.File_MainPage_Default_header{
  margin-top: 79px;margin-left: 345px;display: flex;flex-direction: row
}
.header_div1{
  margin: 6px;font-size: 16px;
}
.switch_button{
  float: right;margin-top: -90px; margin-right: 50px; width: 112px;height: 32px
}
.search_frame{
  display: flex;flex-direction: row;width: 1208px;height: 47px;margin-top: 11px
}
.search_frame_input{
  margin-left: 345px;
}
.search_input{
  width: 1065px;height: 47px
}
.search_frame_button{
  margin-left: 24px;margin-top: 3px
}
.search_button{
  width: 138px;
  height: 41px;
  background: #894AEE;
  border-radius: 4px 4px 4px 4px;
}
.footer{
  height: 674px;width: 1898px; margin-top: 9px;margin-left: 12px;display: flex;flex-direction: row;background: rgb(241,243,244)
}
.left_frame{
  width: 170px; height: 63px;display: flex;flex-direction: row;border-bottom: 2px solid #894AEE;
}
.left_img{
  margin-top: 14px;scale: 0.3;margin-left: -20px;width: 80px;margin-top: -20px
}
.command_font_title{
  margin-top: 20px
}
.left_div2{
  margin-top: -24px;
}
.left_div2_content{
  margin-left: 11px
}
.content_frame{
  height: 200px; width: 1111px;
  font-size: 18px;

}
.content_frame_title{
  margin-left: 18px;width: 54px;
  height: 20px;
  background: rgba(34,67,186,0.1);
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #5A22B5;
  color: #5A22B5;text-align: center;margin-top: 5px
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
.f1{
  margin-top: -3px;
}
.content_cite{
  float: right;margin-top: 12px;color: #5A22B5;
}
.right_frame{
  width: 190px; height: 63px;display: flex;flex-direction: row;border-bottom: 2px solid #5A22B5;
}
.right_frame_div1{
  margin-left: -20px;scale: 0.3;width: 100px;margin-bottom: 30px
}
.command_font_div{
  margin-top: 20px;
}
.knowledge_img{
  width: 745px;height:610px;
}
</style>

<style>
/* 通过类选择器来定位Switch组件 */
.File_MainPage_Default .custom-switch .el-switch__core {
  width: 112px;
  height: 32px;
  border-radius: 4px 4px 4px 4px;
}

.File_MainPage_Default .custom-switch .el-switch__core .el-switch__action {
  width: 20px;
  height: 28px;
  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
}
</style>

<style scoped>
.File_MainPage_Default {
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
  border: #F2F3F5 2px solid;

}
.right {
  width: 745px;
  height: 674px;
  background: #FFFFFF;
  margin-left: 10px;
  border: #F2F3F5 2px solid;
}
.command_font {
  width: 96px;
  height: 22px;
  font-size: 24px;
  font-weight: bold;
  color: rgba(0,0,0,0.85);
  line-height: 22px;
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

<style>
input.el-input__inner {
  width: 1065px;
  height: 47px;
  font-size: 18px;
}
</style>
