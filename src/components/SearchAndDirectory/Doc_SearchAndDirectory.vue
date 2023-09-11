<template>
  <div class="Doc_SearchAndDirectory" style="">
    <div style="display: flex; flex-direction: row;" v-if="showDirectoryAndSearch">
      <div @click="showFullText" class="text_search" :class="{ active: selectedContentType === 'fullText' }">
        <div class="title" style="">
          全文查找
        </div>
      </div>
      <div @click="showDirectory" class="directory" :class="{ active: selectedContentType === 'directory' }">
        <div class="title" style="">
          目录
        </div>
      </div>
      <div class="close_icon">
        <el-icon @click="close_all()"><Close /></el-icon>
      </div>
    </div>
    <div class="main_frame" style="">
      <div v-if="showFullTextContent" style="display: flex; flex-direction: column">
        <div>
          <el-input @keyup.enter.native="search" class="main_input" v-model="input" style=""
           placeholder="请输入要查找的内容"></el-input>
        </div>
        <div :data="searchData" style="display: flex;flex-direction: column">
          <div class="appear_count" style="">
            {{searchData.appear_count}}
          </div>
          <div v-for="i in searchData.data" style="display: flex;flex-direction: column">
            <div class="appear_page" style="">
              {{i.appear_page}}
            </div>
            <div class="content_frame" style="">
              <div class="content_content" style="">
                {{i.content}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDirectoryContent" >
        <el-row class="tac">
          <el-col :span="14">
            <el-menu class="el-menu-vertical-demo">
              <el-menu-item index="1">
                <template #title>
                  <span @click="go_to_page(1)">0 摘要</span>
                </template>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <span style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1 “ 蜂甲一体” 作战中无人机装备维修保障方案制定依据" @click="go_to_page(2)">1 “ 蜂甲一体” 作战中无人机装备维修保障方案制定依据"</span>
                </template>
                <el-menu-item-group>
                  <el-sub-menu index="2-1">
                    <template #title @click="go_to_page(2)">1. 1 装备特点</template>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 1. 1 系统涉及面广,维修需全面综合统筹" @click="go_to_page(2)" index="2-1-1">1. 1. 1 系统涉及面广,维修需全面综合统筹</el-menu-item>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 1. 2 零件替换性强,维修需搜寻恢复并存" @click="go_to_page(2)" index="2-1-2">1. 1. 2 零件替换性强,维修需搜寻恢复并存</el-menu-item>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 1. 3 数据复杂度高,维修需软件硬件兼顾" @click="go_to_page(2)" index="2-1-3">1. 1. 3 数据复杂度高,维修需软件硬件兼顾</el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="2-2">
                    <template #title @click="go_to_page(2)">1. 2 组织特点</template>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 2. 1 厘清各力量编组的职能分工" @click="go_to_page(2)" index="2-2-1">1. 2. 1 厘清各力量编组的职能分工</el-menu-item>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 2. 2 厘清装备维修保障指挥关系" @click="go_to_page(2)" index="2-2-2">1. 2. 2 厘清装备维修保障指挥关系</el-menu-item>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 2. 3 厘清各级力量协同配合" @click="go_to_page(2)" index="2-2-3">1. 2. 3 厘清各级力量协同配合</el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="2-3">
                    <template #title @click="go_to_page(3)">1. 3 作战特点</template>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 1. 1 系统涉及面广,维修需全面综合统筹" @click="go_to_page(3)" index="2-3-1">1. 1. 1 系统涉及面广,维修需全面综合统筹</el-menu-item>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 1. 2 零件替换性强,维修需搜寻恢复并存" @click="go_to_page(3)" index="2-3-2">1. 1. 2 零件替换性强,维修需搜寻恢复并存</el-menu-item>
                    <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="1. 1. 3 数据复杂度高,维修需软件硬件兼顾" @click="go_to_page(3)" index="2-3-3">1. 1. 3 数据复杂度高,维修需软件硬件兼顾</el-menu-item>
                  </el-sub-menu>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <span style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="2 “ 蜂甲一体” 作战中无人机装备维修保障方案制定要素" @click="go_to_page(4)">2 “ 蜂甲一体” 作战中无人机装备维修保障方案制定要素"</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="2. 1 装备维修保障原则" @click="go_to_page(4)" index="3-1-1">2. 1 装备维修保障原则</el-menu-item>
                  <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="2. 2 装备维修保障力量编组配置与器材供应" @click="go_to_page(4)" index="3-1-2">2. 2 装备维修保障力量编组配置与器材供应</el-menu-item>
                  <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="2. 3 装备抢修措施" @click="go_to_page(4)" index="3-1-3">2. 3 装备抢修措施</el-menu-item>
                  <el-menu-item style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap" title="2. 4 各战斗阶段维修保障重点" @click="go_to_page(4)" index="3-1-4">2. 4 各战斗阶段维修保障重点</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="4">
                <template #title>
                  <span @click="go_to_page(4)">3 结束语</span>
                </template>
              </el-menu-item>
              <el-menu-item index="5">
                <template #title>
                  <span @click="go_to_page(4)">4 参考文献</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import {Close, Message, Setting} from "@element-plus/icons-vue";
import {inject} from "vue";
import mitt from "@/utils/mitt.js"
import {reqCatalogue, reqPage} from "@/api";

export default {
  components: {Close, Setting, Message},
  data() {
    return {
      data:"",
      showFullTextContent: false,
      showDirectoryContent: true,
      input:"",
      selectedContentType: 'directory',
      searchData:{
        "appear_count":"共出现2处大规模",
        "data":[{
          "appear_page":"第1页",
          "content":"针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点、组织特点和作战特点,对方案制定各要素进行分析,可为地面突击作战中无人机装备保障方案的制定提供借鉴。"
        }, {
          "appear_page":"第5页",
          "content":"基于规范化制度化程序化的维修保障,能够充分释放大规模、成体系无人机作战效能。"
        }]
      },
      showDirectoryAndSearch: true
    }
  },
  methods: {
    showFullText() {
      this.selectedContentType = 'fullText';
      this.showFullTextContent = true;
      this.showDirectoryContent = false;
    },
    showDirectory(){
      this.selectedContentType = 'directory';
      this.showFullTextContent = false;
      this.showDirectoryContent = true;
    },
    close_all(){
      this.showFullTextContent = false;
      this.showDirectoryContent = false;
      // this.showDirectoryAndSearch = false;
    },
    go_to_page(pageNum){
      mitt.emit("go_pageNum", pageNum)
    },
    search(){
      reqPage("Frenet坐标系及凸近似...障原理的无人车局部路径规划_袁春.pdf",this.input).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    reqCatalogue(localStorage.getItem("single_name")).then((res) => {
      this.data = res.directory
      console.log(this.data)
    })
  }
}
</script>

<style scoped>
.title{
  margin-top: 6px
}
.main_frame{
  margin-top: 27px
}
.main_input{
  width: 225px;
  height: 34px;
  background: #F2F3F5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DDDFE5;margin-right: 10px; margin-left: 10px
}
.appear_count{
  margin-left: 17px;margin-top: 20px
}
.appear_page{
  margin-top: 20px;margin-left: 18px
}
.content_frame{
  margin-right: 6px;margin-left: 6px; margin-top: 10px;border-radius: 4px 4px 4px 4px;background: #CBD5FF;
}
.content_content{
  padding: 12px
}
</style>

<style scoped>
.Doc_SearchAndDirectory{
  display: flex;flex-direction: column; box-shadow: 2px 5px 11px -2px rgba(34,67,186,0.2);border: #F2F3F5 2px solid; margin-left: -8px;
  font-size: 16px;
}
.text_search {
  width: 80px;
  height: 34px;
  opacity: 1;
  cursor: pointer;
  text-align: center;
  margin-left: 8px;
}
.text_search :hover{
  color: #0a84ff;
}

.directory {
  width: 52px;
  height: 34px;
  opacity: 1;
  cursor: pointer;
  text-align: center;
  margin-left: 8px;
}
.directory :hover {
  color: #0a84ff;
  border-bottom-color: #2243BA;
}

.active {
  border-bottom: 2px solid blue;
}

.close_icon {
  margin-right: 11px;
  margin-left: 81px;
  color: #D1D3DA;
  font-size: 20px;
  cursor: pointer;
  margin-top: 6px;
}
.directory_title {
  white-space: normal;
  margin-left: 20px;
}
.directory_title :active {
  --text-color: #2B56F9;
}
</style>

<style>
.Doc_SearchAndDirectory .directory_list div.el-sub-menu__title {
  height: 44px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0,0,0,0.8);
  line-height: 22px;
}
.Doc_SearchAndDirectory .directory_list div.el-sub-menu__title i{
  margin-right: 210px;
}
</style>