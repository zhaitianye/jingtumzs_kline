<template>
  <div>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen" @change="fullscreenChange">
      <div v-show="showExitFullScreen" class="exit-full-screen">
        <div class="exit-full-screen-btn" @click="fullScreenToggle">Exit Full Screen(Esc)</div>
      </div>
      <!-- Cycle按钮 -->
      <div class="kline-cycle" v-show="showChart !== 'depth'">
        <div class="kline-cycle-div">
          <div @click="clickMinCycle()">
            <div
              :class="!this.showMinCycle ? 'kline-cycle-drop-down' : 'kline-cycle-drop-down kline-select-color'"
            >
              <font
                :class="selectMin !== '分'  ? selectMin !== 'm' ? 'kline-select-color' : 'kline-uncheck-color' : 'kline-uncheck-color'"
              >{{selectMin}}</font>
              <i :class="!this.showMinCycle ? 'drop-down-icon' : 'drop-down-select'"></i>
            </div>
            <div v-show="showMinCycle" class="kline-cycle-float">
              <div
                @click="chooseCycle('minute')"
                :class="this.cycle === 'minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
              >{{message.oneMin}}</div>
              <div
                @click="chooseCycle('5minute')"
                :class="this.cycle === '5minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
              >{{message.fiveMin}}</div>
              <div
                @click="chooseCycle('15minute')"
                :class="this.cycle === '15minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
              >{{message.fifteenMin}}</div>
              <div
                @click="chooseCycle('30minute')"
                :class="this.cycle === '30minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
              >{{message.thirtyMin}}</div>
            </div>
          </div>
          <div @click="clickHourCycle()">
            <div
              :class="!this.showHourCycle ? 'kline-cycle-drop-down kline-margin-left10' : 'kline-cycle-drop-down kline-margin-left10 kline-select-color'"
            >
              <font
                :class="selectHour !== '时'  ? selectHour !== 'H' ? 'kline-select-color' : 'kline-uncheck-color' : 'kline-uncheck-color'"
              >{{selectHour}}</font>
              <i :class="!this.showHourCycle ? 'drop-down-icon' : 'drop-down-select'"></i>
            </div>
            <div v-show="showHourCycle" class="kline-cycle-float kline-hour-cycle">
              <div
                @click="chooseCycle('hour')"
                :class="this.cycle === 'hour' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
              >{{message.oneHour}}</div>
              <div
                @click="chooseCycle('4hour')"
                :class="this.cycle === '4hour' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
              >{{message.fourHour}}</div>
            </div>
          </div>
        </div>
        <div
          @click="chooseCycle('day')"
          :class="this.cycle === 'day' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
        >{{message.dayPC}}</div>
        <div
          @click="chooseCycle('week')"
          :class="this.cycle === 'week' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
        >{{message.weekPC}}</div>
        <div
          @click="chooseCycle('month')"
          :class="this.cycle === 'month' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
        >{{message.monthPC}}</div>
        <!-- <div
          @click="chooseCycle('everyhour')"
          :class="this.cycle === 'everyhour' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
        >{{message.timeSharing}}</div> -->
      </div>
      <!-- tooltip数据显示 -->
      <div
        :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'"
        v-if="showChart === 'candle' && toolTipData && this.cycle !== 'everyhour'"
      >
        <div style="margin-right: 180px;">
          <i
            :class="outspreadMA ? 'icon iconfont icon-kline-hide' : 'icon iconfont icon-kline-show'"
            @click="showMAData"
          ></i>
          <font class="tooltip-data-name">{{message.opening}}{{this.toolTipData.opening}}</font>
          <font class="tooltip-data-name">{{message.closing}}{{this.toolTipData.closing}}</font>
          <font class="tooltip-data-name">{{message.max}}{{this.toolTipData.max}}</font>
          <font class="tooltip-data-name">{{message.min}}{{this.toolTipData.min}}</font>
          <font class="tooltip-data-name">{{message.volume}}{{this.toolTipData.volume}}</font>
          <br />
        </div>
        <div v-if="outspreadMA && this.outspreadMA">
          <font
            v-for="MAitem in this.klineConfig.MA"
            :key="MAitem.id"
            :style="{ color: MAitem.color, marginRight: '12px'}"
          >
            {{MAitem.name}}
            <font>:&nbsp;{{ getMAData(MAitem.name) }}</font>
          </font>
        </div>
      </div>
      <!-- 分时线tips数据显示 -->
      <div
        :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'"
        v-if="cycle==='everyhour' && toolTipData && showChart !== 'depth'"
      >
        <font class="tooltip-data-name">{{message.volume}}{{this.toolTipData.volume}}</font>
        <font class="tooltip-data-name">{{message.price}}{{this.toolTipData.price}}</font>
        <font class="tooltip-data-name">{{message.averagePrice}}{{this.toolTipData.averagePrice}}</font>
      </div>
      <!-- 技术指标 -->
      <div style="position: absolute;right:50px;top:20px;z-index:5;font-size: 13px;">
        <div
          v-show="showChart==='candle' && cycle !== 'everyhour'"
          style="position: absolute;right:154px;top:3px;z-index:5;"
          class="icon-indicator-div"
        >
          <i
            v-show="true"
            @click="showIndicatorOptions"
            :class="this.showIndicatorOpt ? 'icon iconfont icon-indicator-ed' : 'icon iconfont icon-indicator'"
          >
            <span
              v-show="true"
              :class=" message.language === 'zh' ? 'icon-indicator-ch' : 'icon-indicator-en'"
            >
              <font style="font-size:14px;line-height:22px;">{{message.indicator}}</font>
            </span>
          </i>
        </div>
        <div
          @click="changeChart('candle')"
          :class="this.showChart === 'candle' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'"
        >{{message.candle}}</div>
        <div
          @click="changeChart('depth')"
          :class="this.showChart === 'depth' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'"
          style="margin-left: 10px;margin-right: 20px;"
        >{{message.depth}}</div>

        <div
          v-show="showIndicatorOpt && cycle !== 'everyhour'"
          style="background-color: #1e262c; margin-top: 30px; right: 660px; height: 100px; width: 212px;"
        >
          <div class="indicatorOpt">
            <div style="margin-left:10px; padding-top:1px;">
              <font>{{message.indicator}}</font>
            </div>
            <div
              @click="showIndicatorOptions"
              style="margin-right: 10px; float:right; margin-top: -14px;"
              class="close-background-icon"
            ></div>
            <div style="height: 0.05rem; background-color:#2b3944; margin-top:3px"></div>
            <div
              @click="showMA()"
              :class="showIndicatorMA ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.MA}}</div>
            </div>
            <div
              @click="showIndicatorChart('MACD')"
              :class="this.showIndicator ==='MACD' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.MACD}}</div>
            </div>
            <div
              @click="showIndicatorChart('KDJ')"
              :class="this.showIndicator ==='KDJ' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.KDJ}}</div>
            </div>
            <div
              @click="showIndicatorChart('RSI')"
              :class="this.showIndicator ==='RSI' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.RSI}}</div>
            </div>
            <div
              @click="showIndicatorChart('MTM')"
              :class="this.showIndicator ==='MTM' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.MTM}}</div>
            </div>
            <div
              @click="showIndicatorChart('WR')"
              :class="this.showIndicator ==='WR' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.WR}}</div>
            </div>
            <div
              @click="showIndicatorChart('VR')"
              :class="this.showIndicator ==='VR' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.VR}}</div>
            </div>
            <div
              @click="showIndicatorChart('OBV')"
              :class="this.showIndicator ==='OBV' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.OBV}}</div>
            </div>
            <div
              @click="showIndicatorChart('TRIX')"
              :class="this.showIndicator ==='TRIX' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.TRIX}}</div>
            </div>
            <div
              @click="showIndicatorChart('DMI')"
              :class="this.showIndicator ==='DMI' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.DMI}}</div>
            </div>
            <div
              @click="showIndicatorChart('PSY')"
              :class="this.showIndicator ==='PSY' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.PSY}}</div>
            </div>
            <div
              @click="showIndicatorChart('ROC')"
              :class="this.showIndicator ==='ROC' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.ROC}}</div>
            </div>
            <div
              @click="showIndicatorChart('BRAR')"
              :class="this.showIndicator ==='BRAR' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.BRAR}}</div>
            </div>
            <div
              @click="showIndicatorChart('DMA')"
              :class="this.showIndicator ==='DMA' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.DMA}}</div>
            </div>
            <div
              @click="showIndicatorChart('Boll')"
              :class="this.showIndicator ==='Boll' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.Boll}}</div>
            </div>
            <div
              @click="showIndicatorChart('SAR')"
              :class="this.showIndicator ==='SAR' ? 'chart-indicator-div-active' : 'chart-indicator-div'"
            >
              <div class="indicator-line">{{message.SAR}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 全屏按钮 -->
      <div style="position: absolute;right:30px;top:23px;z-index:5;" class="full-screen-div">
        <i v-show="!fullscreen" class="icon iconfont icon-full-screen" @click="fullScreenToggle">
          <span
            v-show="!fullscreen"
            :class=" message.language === 'zh' ? 'icon-fullscreen-tooltip' : 'icon-fullscreen-entip'"
          >
            <font style="font-size:14px;line-height:22px;">{{message.fullScreen}}</font>
          </span>
        </i>
        <i
          v-show="fullscreen"
          class="icon iconfont icon-exit-full-screen"
          @click="fullScreenToggle"
        >
          <span
            v-show="fullscreen"
            :class=" message.language === 'zh' ? 'exit-fullscreen-tooltip' : 'exit-fullscreen-entip'"
          >
            <font style="font-size:14px;line-height:22px;">{{message.exitFullScreen}}</font>
          </span>
        </i>
      </div>
      <!-- 平移、刷新、缩放按钮 -->
      <div
        class="kline-levitation-div"
        v-show="showChart === 'candle'"
        @mouseenter="enter()"
        @mouseleave="leave()"
      >
        <div class="kline-levitation-icon">
          <div
            class="kline-levitation-btn"
            @mousedown="changeDataZoomByMouseDown('leftShift')"
            @mouseup="removeChangeDataZoom()"
          >
            <div class="left-shift-icon"></div>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('narrow')">
            <i class="narrow-icon"></i>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('refresh')">
            <i class="refresh-icon"></i>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('enlarge')">
            <i class="enlarge-icon"></i>
          </div>
          <div
            class="kline-levitation-btn"
            @mousedown="changeDataZoomByMouseDown('rightShift')"
            @mouseup="removeChangeDataZoom()"
          >
            <i class="right-shift-icon"></i>
          </div>
        </div>
      </div>
      <!-- 图表 -->
      <div @click="hiddenPopover">
        <KLine
          ref="candle"
          v-show="showChart === 'candle' && cycle !== 'everyhour'"
          v-on:listenToTipIndex="getTipDataIndex"
          :kline-config="klineConfig"
          :chart-data-obj="chartDataObj"
          :resize-size="resizeSize"
          :cycle="cycle"
        ></KLine>
        <TimeSharing
          ref="timeSharing"
          v-show="cycle === 'everyhour' && showChart !== 'depth'"
          v-on:listenToTipIndex="getTipDataIndex"
          :chart-data-obj="chartDataObj"
          :kline-config="klineConfig"
          :resize-size="resizeSize"
          :cycle="cycle"
        ></TimeSharing>
        <Depth
          ref="depth"
          v-show="showChart === 'depth'"
          :chart-data-obj="chartDataObj"
          :kline-config="klineConfig"
          :resize-size="resizeSize"
        ></Depth>
        <Volume
          ref="volume"
          v-show="showChart !== 'depth'"
          v-on:listenToTipIndex="getTipDataIndex"
          :kline-config="klineConfig"
          :chart-data-obj="chartDataObj"
          :resize-size="resizeSize"
          :cycle="cycle"
        ></Volume>
        <Indicator
          ref="indicator"
          v-show="showIndicator != '' &&cycle !== 'everyhour' &&showChart !== 'depth'"
          :toolTipIndex="toolTipIndex"
          @listenToTipIndex="getTipDataIndex"
          @listenIndicatorChartClose="closeIndicatorChart"
          :kline-config="klineConfig"
          :chart-data-obj="chartDataObj"
          :resize-size="resizeSize"
          :cycle="cycle"
          :indicatorType="showIndicator"
        ></Indicator>
      </div>
    </fullscreen>
  </div>
</template>
<script>
import "../icon/iconfont.css";
import "../css/common.css";
import Fullscreen from "vue-fullscreen/src/component.vue";
import KLine from "./kline.vue";
import Depth from "./marketDepth.vue";
import Volume from "./volumeChart.vue";
import Indicator from "./IndicatorChart.vue";
import TimeSharing from "./timeSharing.vue";
import { getLanguage, getDefaultChartSize, formatDecimal } from "../js/utils";
import {
  supplementKlineData,
  splitData,
  getDepthData,
  handleDivisionData,
  calculateMA
} from "../js/processData";
export default {
  name: "klineChart",
  components: {
    KLine,
    Depth,
    Volume,
    Fullscreen,
    Indicator,
    TimeSharing
  },
  data() {
    return {
      showChart: "candle",
      cycle: "",
      fullscreen: false,
      isShow: false,
      showExitFullScreen: false,
      candle: null,
      volume: null,
      timeSharing: null,
      stochastic: null,
      macd: null,
      indicator: null,
      chartDataObj: {},
      toolTipIndex: null,
      toolTipData: null,
      outspreadMA: true,
      resizeSize: {},
      isFullScreen: false,
      relevanceIndicator: "MA",
      isClose: true,
      showIndicatorOpt: false,
      showIndicator: "",
      isClose: true,
      interval: null,
      changeDataZoomType: "",
      showMinCycle: false,
      showHourCycle: false,
      selectMin: "",
      selectHour: "",
      showIndicatorMA: true
    };
  },
  props: {
    klineDataObj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    klineConfig: {
      type: Object,
      default: () => {
        return {
          platform: "pc",
          defaultSize: true
        };
      }
    }
  },
  created() {
    this.klineConfig.platform = "pc";
    if (this.klineConfig.defaultMA !== false) {
      this.klineConfig.defaultMA = true;
      this.klineConfig.MA = [
        {
          name: "MA5",
          color: "#fd1d57"
        },
        {
          name: "MA10",
          color: "#4df561"
        },
        {
          name: "MA20",
          color: "#2bdaff"
        },
        {
          name: "MA30",
          color: "#ffd801"
        },
        {
          name: "MA60",
          color: "#f721ff"
        }
      ];
    }
    if (this.klineConfig.defaultSize !== false) {
      this.klineConfig.size = getDefaultChartSize();
    }
    this.cycle = this.klineConfig.cycle;
    this.message = getLanguage();
    this.selectMin = this.message.minute;
    this.selectHour = this.message.hourPC;
  },
  mounted() {
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resize);
    }
  },
  watch: {
    klineConfig() {
      this.klineConfig.platform = "pc";
      if (this.klineConfig.defaultSize !== false) {
        this.klineConfig.size = getDefaultChartSize();
      }
    },
    klineDataObj() {
      let suppKlineData = [];
      if (this.klineDataObj.klineData) {
        suppKlineData = JSON.parse(JSON.stringify(this.klineDataObj.klineData));
      }
      this.cycle = this.klineDataObj.cycle;
      this.klineDataObj.klineData = supplementKlineData(
        suppKlineData,
        this.cycle,
        this.klineDataObj.pricePrecision
      );
      if (
        JSON.stringify(this.coinType) !==
        JSON.stringify(this.klineDataObj.coinType)
      ) {
        this.showMinCycle = false;
        this.showHourCycle = false;
        this.showIndicatorOpt = false;
        this.coinType = this.klineDataObj.coinType;
      }
      this.changeCycleLanguage(this.cycle);
      this.changeChartDataObj(this.klineDataObj, this.showIndicatorMA);
    },
    fullscreen() {
      if (this.fullscreen && getLanguage().language === "en") {
        this.showExitFullScreen = true;
      } else {
        this.showExitFullScreen = false;
      }
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resize);
    }
  },
  methods: {
    showMA() {
      this.showIndicatorMA = !this.showIndicatorMA;
      this.changeChartDataObj(this.klineDataObj, this.showIndicatorMA);
      this.showIndicatorOpt = false;
    },
    clickMinCycle() {
      this.showMinCycle = !this.showMinCycle;
      if (this.showMinCycle) {
        this.showHourCycle = false;
        this.showIndicatorOpt = false;
      }
    },
    clickHourCycle() {
      this.showHourCycle = !this.showHourCycle;
      if (this.showHourCycle) {
        this.showMinCycle = false;
        this.showIndicatorOpt = false;
      }
    },
    chooseCycle(cycle) {
      this.showIndicatorOpt = false;
      if (cycle === this.cycle) {
        return;
      }
      if (cycle === "day" || cycle === "week" || cycle === "month") {
        this.showMinCycle = false;
        this.showHourCycle = false;
      }
      if (cycle === "everyhour") {
        this.showMinCycle = false;
        this.showHourCycle = false;
        this.showIndicatorOpt = false;
      }
      this.toolTipData = null;
      this.cycle = cycle;
      this.toolTipIndex = null;
      this.$emit("listenToChildEvent", cycle);
      this.changeCycleLanguage(cycle);
    },
    changeCycleLanguage(selectCycle) {
      this.message = getLanguage();
      if (selectCycle === "minute") {
        this.selectMin = this.message.oneMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "5minute") {
        this.selectMin = this.message.fiveMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "15minute") {
        this.selectMin = this.message.fifteenMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "30minute") {
        this.selectMin = this.message.thirtyMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "hour") {
        this.selectHour = this.message.oneHour;
        this.selectMin = this.message.minute;
        this.selectMin = this.message.minute;
      } else if (selectCycle === "4hour") {
        this.selectHour = this.message.fourHour;
        this.selectMin = this.message.minute;
      } else {
        this.selectMin = this.message.minute;
        this.selectHour = this.message.hourPC;
      }
    },
    getMAData(name) {
      if (this.toolTipData) {
        for (let tipData of this.toolTipData.MAData) {
          if (tipData.name === name) {
            return tipData.data;
          }
        }
      }
    },
    changeChartDataObj(data, MA) {
      let candleData;
      let depthData;
      let timeDivisionData;
      let divisionData;
      let MAData = [];
      this.message = getLanguage();
      let precision = {
        price: data.pricePrecision,
        amount: data.amountPrecision
      };
      let cycle = data.cycle;
      if (data.klineData) {
        candleData = splitData(data.klineData);
        for (var i = 0; i < this.klineConfig.MA.length; i++) {
          MAData[i] = {};
          MAData[i].name = this.klineConfig.MA[i].name;
          MAData[i].data = calculateMA(
            this.klineConfig.MA[i].name.substring(2) * 1,
            candleData
          );
        }
        candleData.showIndicatorMA = this.showIndicatorMA;
        candleData.MAData = MAData;
        candleData.precision = precision;
      }
      if (data.depthData) {
        depthData = getDepthData(data.depthData, precision);
      }
      if (data.timeDivisionData) {
        timeDivisionData = data.timeDivisionData;
        divisionData = handleDivisionData(timeDivisionData);
        this.divisionTime = divisionData.divisionTime;
      }
      this.chartDataObj = {
        platform: "pc",
        precision: precision,
        cycle: cycle,
        index: this.toolTipIndex,
        klineData: this.klineDataObj.klineData,
        indicators: this.showIndicator,
        coinType: data.coinType,
        candleData: candleData,
        depthData: depthData,
        divisionData: divisionData,
        timeDivisionData: timeDivisionData
      };
    },
    showMAData() {
      this.outspreadMA = !this.outspreadMA;
    },
    showIndicatorChart(indicator) {
      if (indicator === this.showIndicator) {
        this.showIndicator = "";
        this.isClose = true;
      } else {
        this.showIndicator = indicator;
        this.isClose = false;
      }
      this.showIndicatorOpt = false;
      this.resize();
      this.changeChartDataObj(this.klineDataObj, this.showIndicatorMA);
    },

    getTipDataIndex(index) {
      if (!isNaN(index) && index >= 0) {
        if (this.chartDataObj.precision) {
          let pricePrecision = !isNaN(this.chartDataObj.precision.price)
            ? this.chartDataObj.precision.price
            : 6;
          let amountsPrecision = !isNaN(this.chartDataObj.precision.amount)
            ? this.chartDataObj.precision.amount
            : 2;
          if (this.chartDataObj.candleData && this.cycle !== "everyhour") {
            this.toolTipIndex = index;
            if (
              this.chartDataObj.candleData.values[index] &&
              this.chartDataObj.candleData.categoryData[index]
            ) {
              this.toolTipData = {
                time: this.chartDataObj.candleData.categoryData[index],
                volume: formatDecimal(
                  this.chartDataObj.candleData.values[index][5],
                  amountsPrecision,
                  true
                ),
                opening: formatDecimal(
                  this.chartDataObj.candleData.values[index][0],
                  pricePrecision,
                  true
                ),
                closing: formatDecimal(
                  this.chartDataObj.candleData.values[index][1],
                  pricePrecision,
                  true
                ),
                max: formatDecimal(
                  this.chartDataObj.candleData.values[index][3],
                  pricePrecision,
                  true
                ),
                min: formatDecimal(
                  this.chartDataObj.candleData.values[index][2],
                  pricePrecision,
                  true
                ),
                MAData: [],
                color: this.chartDataObj.candleData.volumes[index][2]
              };
              if (this.chartDataObj.candleData.MAData) {
                for (
                  var i = 0;
                  i < this.chartDataObj.candleData.MAData.length;
                  i++
                ) {
                  this.toolTipData.MAData[i] = {
                    name: this.chartDataObj.candleData.MAData[i].name,
                    data: formatDecimal(
                      this.chartDataObj.candleData.MAData[i].data[index],
                      pricePrecision,
                      true
                    )
                  };
                }
              }
            }
          }
          if (this.cycle === "everyhour") {
            if (this.chartDataObj.divisionData) {
              let tipsData = this.chartDataObj.divisionData;
              this.toolTipData = {
                volume: formatDecimal(
                  tipsData.volumes[index][1],
                  amountsPrecision,
                  true
                ),
                price: formatDecimal(
                  tipsData.prices[index],
                  pricePrecision,
                  true
                ),
                averagePrice: formatDecimal(
                  tipsData.averages[index],
                  pricePrecision,
                  true
                )
              };
            }
          }
        }
      }
    },
    fullscreenChange(fullscreen) {
      this.showMinCycle = false;
      this.showHourCycle = false;
      this.showIndicatorOpt = false;
      this.isFullScreen = fullscreen;
      this.resize();
    },
    resize() {
      this.resizeSize = {
        isFullScreen: this.isFullScreen,
        isCloseIndicator: this.isClose
      };
    },
    changeChart(type) {
      if (type === "depth") {
        this.showIndicatorOpt = false;
      }
      if (this.showChart === type) {
        return;
      }
      this.showChart = type;
    },
    changeDataZoomByMouseDown(type) {
      this.changeDataZoomType = type;
      this.changeDataZoom(type);
      this.interval = setInterval(this.changeDataZoom, 600);
    },
    removeChangeDataZoom() {
      clearInterval(this.interval);
    },
    changeDataZoom(type) {
      if (type) {
        this.changeDataZoomType = type;
      }
      if (this.showChart !== "depth" && this.cycle !== "everyhour") {
        this.$refs.candle.changeDataZoom(this.changeDataZoomType);
        this.$refs.volume.changeDataZoom(this.changeDataZoomType);
        this.$refs.indicator.changeDataZoom(this.changeDataZoomType);
      }
      if (this.cycle === "everyhour") {
        this.$refs.timeSharing.changeDataZoom(this.changeDataZoomType);
        this.$refs.volume.changeDataZoom(this.changeDataZoomType);
      }
    },
    fullScreenToggle() {
      this.$refs["fullscreen"].toggle();
    },
    enter() {
      this.isShow = true;
    },
    leave() {
      this.isShow = false;
    },
    closeIndicatorChart(isClose) {
      this.showIndicator = "";
      this.isClose = isClose;
      this.resize();
    },
    showIndicatorOptions() {
      this.showIndicatorOpt = !this.showIndicatorOpt;
      if (this.showIndicatorOpt) {
        this.showMinCycle = false;
        this.showHourCycle = false;
      }
    },
    hiddenPopover() {
      this.showMinCycle = false;
      this.showHourCycle = false;
      this.showIndicatorOpt = false;
    }
  }
};
</script>