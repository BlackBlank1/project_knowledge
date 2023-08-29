<template>
  <div class="main" style="display: flex;flex-direction: column; box-shadow: 2px 5px 11px -2px rgba(34,67,186,0.2);border: #F2F3F5 2px solid; margin-left: -8px">
    <div style="display: flex; flex-direction: row;">
      <div @click="showFullText" class="text_search" :class="{ active: selectedContentType === 'fullText' }">
        <div style="margin-top: 6px">
          全文查找
        </div>
      </div>
      <div @click="showDirectory" class="directory" :class="{ active: selectedContentType === 'directory' }">
        <div style="margin-top: 6px">
          目录
        </div>
      </div>
      <div class="close_icon">
        <el-icon @click="close_all()"><Close /></el-icon>
      </div>
    </div>
    <div style="margin-top: 27px">
      <div v-if="showFullTextContent" style="display: flex; flex-direction: column">
        <div>
          <el-input v-model="input" style="width: 225px;
            height: 34px;
            background: #F2F3F5;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            border: 1px solid #DDDFE5;margin-right: 10px; margin-left: 10px"></el-input>
        </div>
        <div :data="searchData" style="display: flex;flex-direction: column">
          <div style="margin-left: 17px;margin-top: 20px">
            {{searchData.appear_count}}
          </div>
          <div v-for="i in searchData.data" style="display: flex;flex-direction: column">
            <div style="margin-top: 20px;margin-left: 18px">
              {{i.appear_page}}
            </div>
            <div style="margin-right: 6px;margin-left: 6px; margin-top: 10px;border-radius: 4px 4px 4px 4px;background: #CBD5FF;">
              <div style="padding: 12px">
                {{i.content}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDirectoryContent" >
        <el-aside width="260px">
          <el-scrollbar>
            <el-menu v-for="(item, index) in data.items" :key="index">
              <el-sub-menu :index="index" class="directory_list">
                <template #title>
                  <div class="directory_title">{{item.title}}</div>
                </template>
                <el-menu-item-group v-if="item.items.length > 0" v-for="(i, subIndex) in item.items">
                  <el-menu-item :index="subIndex" style="overflow: auto">{{ i.title }}</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
      </div>
    </div>
  </div>
</template>

<script>
import {Close, Message, Setting} from "@element-plus/icons-vue";
import {inject} from "vue";
import mitt from "@/utils/mitt.js"

export default {
  components: {Close, Setting, Message},
  data() {
    return {
      data:"",
      showFullTextContent: true,
      showDirectoryContent: false,
      input:"",
      selectedContentType: 'fullText',
      searchData:{
        "appear_count":"共出现2处大规模",
        "data":[{
          "appear_page":"第1页",
          "content":"针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂群更好地发挥其作用,进而制约了“ 蜂甲一体” 作战体系释放效能的问题,提出“ 蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点、组织特点和作战特点,对方案制定各要素进行分析,可为地面突击作战中无人机装备保障方案的制定提供借鉴。"
        }, {
          "appear_page":"第5页",
          "content":"基于规范化制度化程序化的维修保障,能够充分释放大规模、成体系无人机作战效能。"
        }]
      }
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
    }
  },
  mounted() {
    mitt.on("data", (val) => {
      this.data = val;
    })
  }
}
</script>

<style>
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

.directory_list div.el-sub-menu__title {
  height: 44px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0,0,0,0.8);
  line-height: 22px;
}
.directory_list div.el-sub-menu__title i{
  margin-right: 210px;
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