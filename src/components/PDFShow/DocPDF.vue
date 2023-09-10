<template>
  <div class="pdf-preview">
    <div class="page-tool">
      <div class="minus">
        <el-icon @click="pageZoomIn()"><Minus /></el-icon>
      </div>
      <div class="page-tool-div1" style="">
        <el-select v-model="state.scale" class="m-2" placeholder="Select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="plus">
        <el-icon @click="pageZoomOut()"><Plus /></el-icon>
      </div>
      <div class="page-tool-item" @click="lastPage"><el-icon><ArrowLeft /></el-icon></div>
      <div style="display: flex; flex-direction: row;">
        <div class="go_page">
          <el-input v-model.number="state.pageNum" @input="handleInput" class="go_page_input" style=""></el-input>
        </div>
        <div class="g" style="">
          /
        </div>
        <div class="numPage" style="">
          {{state.numPages}}
        </div>
      </div>
      <div class="page-tool-item" @click="nextPage"><el-icon><ArrowRight /></el-icon></div>
    </div>
    <div class="pdf-wrap">
      <vue-pdf-embed :drag="true" class="pdf_embed" style=" " :source="state.source" :style="scaleFun" :page="state.pageNum" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import {reactive, onMounted, computed, provide} from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs"; // 获得总页数
import pdfurl from '../../pdf/FSAC赛车横向控制系统设计与研究_李金畅.pdf';
import {ArrowLeft, ArrowRight, Minus, Plus} from "@element-plus/icons-vue";
import * as pdfjsLib from "pdfjs-dist";
import mitt from "@/utils/mitt";

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  }
})

const state = reactive({
  source: props.pdfUrl, //预览pdf文件地址
  pageNum: 1, //当前页面
  scale: '100%', // 缩放比例
  numPages: 0, // 总页数
  outlineItems: []
});

const options = [
  {
    value: '75%',
    label: '75%',
  },
  {
    value: '100%',
    label: '100%',
  },
  {
    value: '125%',
    label: '125%',
  },
]

const scaleFun = computed(() => `transform: scale(${state.scale});`)
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1;
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1;
  }
}
function pageZoomOut() {
  if (parseFloat(state.scale) / 100 < 1.25) {
    const currentPercentage = parseFloat(state.scale) / 100; // 将百分比缩放比例转换为小数形式
    const newPercentage = currentPercentage + 0.1;
    state.scale = (newPercentage * 100).toFixed(0) + '%';
  }
}
function pageZoomIn() {
  if (parseFloat(state.scale) / 100 > 0.5) {
    const currentPercentage = parseFloat(state.scale) / 100; // 将百分比缩放比例转换为小数形式
    const newPercentage = currentPercentage - 0.1;
    state.scale = (newPercentage * 100).toFixed(0) + '%';
  }
}

function handleInput(){
  if (state.pageNum > state.numPages){
    state.pageNum = state.numPages;
  }
  else if (state.pageNum < 0){
    state.pageNum = 1;
  }
}

onMounted(() => {
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then(async () => {
    const pdf = await loadingTask.promise;
    state.numPages = pdf.numPages;

    // const pdfDocument = await pdfjsLib.getDocument(state.source).promise;
    // const outline = await pdfDocument.getOutline();
    // state.outlineItems = outline || [];
    // mitt.emit("data", state.outlineItems[0]);
    // console.log(state.outlineItems[0])
    // console.log(state.outlineItems[0].items[0].dest[0].num) // 目录的页码
  });
  mitt.on("go_pageNum", (val) => {
    if (typeof val === "number") {
      state.pageNum = val;
    }
  })
});
</script>

<style scoped>
.page-tool-div1{
  width: 100px;margin-left: 16px
}
.go_page_input{
  width: 60px;text-align: center
}
.g{
  margin-left: 10px; margin-top: 5px
}
.numPage{
  margin-left: 10px;margin-top: 5px
}
.pdf_embed{
  box-shadow: 2px 2px 10px 7px rgba(34,67,186,0.2);
}
</style>

<style>
.pdf-preview .go_page .el-input__wrapper .el-input__inner {
  text-align: center;
}
</style>

<style lang="css" scoped>
.page-tool {
  width: 1200px;
  height: 34px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  color: black;
  z-index: 100;
  margin-left: 100%;
  transform: translateX(-50%);
  box-shadow: 2px 5px 11px -2px rgba(34,67,186,0.2);
}
.page-tool-item {
  padding: 8px 15px;
  padding-left: 10px;
  cursor: pointer;
}

.pdf-preview {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  height: 974px;
  overflow-y: auto;
  overflow-x: hidden;
}

.pdf-wrap {
  width: 860px;
  padding-top: 20px;
}


.minus {
  margin-left: 13px
}
.minus :hover {
  cursor: pointer;
}

.plus {
  margin-left: 22px;
  margin-right: 39px;
}
.plus :hover {
  cursor: pointer;
}
</style>
