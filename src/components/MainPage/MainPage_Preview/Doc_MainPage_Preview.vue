<template>
  <div style="height: 1080px">
    <div style="padding:0 100px">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="card-box">
            <div class="center-container">
              <div style="display: flex;flex-direction: row">
                <div class="paper-title">
                  {{ paperTitle }}
                </div>
                <div style="text-align: center; width: 54px; height: 20px; border: #2243BA 1px solid;
                 border-radius: 3px 3px 3px 3px;background: rgba(34,67,186,0.1);
                  margin-top: 10px;margin-left: 20px;color: #2243BA">
                  文献
                </div>
              </div>
              <div class="author">
                {{ author }}
              </div>
              <div class="location-info">
                {{ organization }} {{ address }}
              </div>
              <div class="abstract-box">
                <span class="abstract-title">摘要：</span>
                <span class="abstract-content">
                  {{ abstractContent }}
                </span>
              </div>
              <div class="key-word-box">
                <span class="key-word-title">关键词：</span>
                <span class="key-word-content"
                >{{ keyWords }}</span
                >
              </div>
              <div class="journal-box">
                <span class="journal-name">刊名：</span>
                <span class="journal-content">{{ journalTitle }}</span>
              </div>
              <div class="text-wrapper_4">
                <span class="text_11">出版时间：</span>
                <span class="text_12">{{ publicationTime }}</span>
              </div>
              <div class="button-box">
                <div style="margin-right: 10px">
                  <el-button type="primary" color="#2B56F9" @click="goToPreview()">预览</el-button>
                </div>
                <div>
                  <el-button>下载</el-button>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="card-box">
            <div class="vertical-center-box">
              <img class="image_3" src="../../../images/wenxian_logo.png">
              <span class="text_15">文献图谱</span>
            </div>
            <div class="flex-row">
              <hr class="hr-solid-blue" style="width: 170px; background-color: blue;">
              <hr class="hr-solid" style="background: #ccccd1;">
            </div>
            <div style="display: flex; justify-content: center">
              <div id="main" style="width: 1400px;height:503px;"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="card-box">
            <div class="vertical-center-box">
              <img class="image_3" src="../../../images/ref_logo.png">
              <span class="text_15">参考文献</span>
            </div>
            <div class="flex-row" style="margin-bottom: 20px">
              <hr class="hr-solid-blue" style="width: 170px; background-color: blue;">
              <hr class="hr-solid" style="background: #ccccd1;">
            </div>
            <div v-for="item in referenceList">
              <div class="section_8 flex-col">
              <span class="text_17" @click="goToSearch()">
                {{ item.paperTitle }}
              </span>
                <div class="text-wrapper_7 flex-row justify-between">
                  <span class="text_18">{{ item.author }}</span>
                  <span class="text_19">{{ item.publicationTime }}</span>
                </div>
                <span class="text_20">
                  {{ item.abstractContent }}
                </span>
                <span class="text_21">{{ item.beCited }} 被引用</span>
                <div v-if="item !== items.length">
                  <el-divider></el-divider>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts';
import graph from '../../../views/data.json'

export default {
  data() {
    return {
      items: [1, 2, 3],
      paperTitle: '“蜂甲一体”作战中无人机装备维修保障方案构想',
      author: '陈卫/胡昆鹏',
      organization: '陆军炮兵防空兵学院',
      address: '安徽 合肥',
      abstractContent: '针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂更好地发挥其作用,进而制约了“&nbsp;蜂甲一体”&nbsp;作战体系释放效能的问题,提出“&nbsp;蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点、组织特点和作战特点,对方案制定各要素进行分析,可为地面突击作战中无人机装备保障方案的制定提供借鉴。',
      keyWords: '无人机蜂群;装甲部队;维修保障;地面突击作战',
      journalTitle: '军事装备',
      publicationTime: '2023.01.16',
      referenceList: [
        {
          paperTitle: '“蜂甲一体”作战中无人机装备维修保障方案构想',
          author: '陈卫/胡昆鹏',
          publicationTime: '2023.01.16',
          abstractContent: '针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂更好地发挥其作用,进而制约了“&nbsp;蜂甲一体”&nbsp;作战体系释放效能的问题,提出“&nbsp;蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点、组织特点和作战特点,对方案制定各要素进行分析,可为地面突击作战中无人机装备保障方案的制定提供借鉴。',
          beCited: 30,
        },
        {
          paperTitle: '“蜂甲一体”作战中无人机装备维修保障方案构想',
          author: '陈卫/胡昆鹏',
          publicationTime: '2023.01.16',
          abstractContent: '针对当前装甲部队装备维修保障方案中对大规模、成体系无人机保障的针对性措施不够明确,不利于地面突击作战中无人机蜂更好地发挥其作用,进而制约了“&nbsp;蜂甲一体”&nbsp;作战体系释放效能的问题,提出“&nbsp;蜂甲一体”作战无人机装备维修保障方案构想,依据无人机系统装备特点、组织特点和作战特点,对方案制定各要素进行分析,可为地面突击作战中无人机装备保障方案的制定提供借鉴。',
          beCited: 30,
        }
      ]
    }
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('main'));
    console.log(graph)
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
    goToPreview(){
      this.$router.push({
        name:"DocPreview"
      })
    },
    goToSearch(){
      this.$router.push({
        name:"Main_Search"
      })
    }
  }
}
</script>
<style scoped>
body * {
  box-sizing: border-box;
  flex-shrink: 0;
}

.hr-solid-blue {
  height: 2px;
  border: 0;
  border-top: 1px solid #2242b9;
}

.hr-solid {
  width: calc(100% - 170px);
  height: 2px;
  border: 0;
  border-top: 1px solid #ceced3;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 100px;
}

.paper-title {
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(34, 67, 186, 1);
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  margin: 10px 0;
}

.author {
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 22px;
  margin: 10px 0;
}

.location-info {
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 22px;
  margin: 10px 0;
}

.abstract-box {
  width: 100%;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: 700;
  text-align: left;
  align-self: center;
  line-height: 22px;
  margin: 10px 0;
}

.abstract-title {
  width: 100%;
  height: 66px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  line-height: 22px;
}

.abstract-content {
  width: 100%;
  height: 66px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  line-height: 22px;
}

.key-word-box {
  width: 100%;
  height: 22px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
  margin: 10px 0;
}

.key-word-title {
  width: 100%;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.key-word-content {
  width: 100%;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.journal-box {
  width: 100%;
  height: 22px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
  margin: 10px 0;
}

.journal-name {
  width: 112px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.journal-content {
  width: 112px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.text-wrapper_4 {
  width: 100%;
  height: 22px;
  overflow-wrap: break-word;
  font-size: 0;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 12px;
  margin: 10px 0;
}

.text_11 {
  width: 186px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-family: PingFang SC-Bold;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.text_12 {
  width: 186px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.button-box {
  display: flex;
  width: 100%;
  height: 34px;
  margin: 20px 0;
}

.top-nav {
  display: flex;
  background-color: rgba(34, 67, 186, 1);
  width: 100%;
  height: 80px;
  justify-content: space-between;
}

.logo-box {
  padding: 10px;
  margin-left: 10px;
}

.card-box {
  margin: 10px 0;

}

.label_1 {
  width: 60px;
  height: 60px;
}

.top-title {
  width: 288px;
  height: 50px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 36px;
  font-family: PingFang SC-Heavy;
  font-weight: 900;
  text-align: left;
  white-space: nowrap;
  line-height: 36px;
  margin-left: 30px;
  margin-top: 18px;
}

.text_15 {
  width: 96px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
  margin-left: 10px;
}

.image_1 {
  width: 51px;
  height: 51px;
}

.image_2 {
  width: 51px;
  height: 51px;
  margin: 22px 0;
}

.image_3 {
  width: 40px;
  height: 40px;
}

.flex-row {
  display: flex;
}

.vertical-center-box {
  display: flex;
  align-items: center;
}

.section_8 {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  justify-content: center;
}

.text_17 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  cursor: pointer;
}

.text-wrapper_7 {
  width: 100%;
  margin: 12px 0;
}

.text_18 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.text_19 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}

.text_20 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: left;
  line-height: 26px;
  margin: 12px 0;
}

.text_21 {
  overflow-wrap: break-word;
  color: #2243BA;
  font-size: 16px;
  font-family: PingFang SC-Medium;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  line-height: 22px;
}
</style>
