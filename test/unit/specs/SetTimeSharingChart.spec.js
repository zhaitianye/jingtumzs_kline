import TimeSharingChart from 'js/SetTimeSharingChart'
import { timeSharingOption } from 'js/TimeSharingOption'
import klineData from '../../testData/data.json'
import { handleDivisionData } from "js/processData";

describe('test setTimeSharingChart', () => {

  let divisionData = handleDivisionData(klineData.timeDivisionData)
  timeSharingOption.platform = 'pc'
  timeSharingOption.defaultSize = true

  it('test TimeSharingChart', () => {
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    expect(TimeSharing).toBeInstanceOf(TimeSharingChart)
  })

  it('test getTimeSharingXAxis', () => {
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    expect(TimeSharing.getTimeSharingXAxis()).not.toBeNull()
  })

  it('test getTimeSharingToolTip', () => {
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    expect(TimeSharing.getTimeSharingToolTip()).not.toBeNull()
  })

  it('test getTimeSharingSeries', () => {
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    expect(TimeSharing.getTimeSharingSeries()).not.toBeNull()
  })

  it('test getTimeSharingDataZoom', () => {
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    expect(TimeSharing.getTimeSharingDataZoom(divisionData)).not.toBeNull()
  })

  it('test initTimeSharingECharts', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.initTimeSharingECharts(element, true)
    expect(TimeSharing).not.toBeNull();
  })

  it('test showLoading', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.showLoading()
    expect(TimeSharing).not.toBeNull();
  })

  it('test setTimeSharingOption', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test changeDataZoom', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.changeDataZoom('leftShift')
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].start).toBe(58);
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].end).toBe(98);
    TimeSharing.changeDataZoom('rightShift')
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].start).toBe(60);
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].end).toBe(100);
    TimeSharing.changeDataZoom('enlarge')
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].start).toBe(65);
    TimeSharing.changeDataZoom('refresh')
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].start).toBe(60);
    TimeSharing.changeDataZoom('narrow')
    expect(TimeSharing.timeSharing.getOption().dataZoom[0].start).toBe(55);
  })

  it('test updateTimeSharingOption', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.updateTimeSharingOption(divisionData)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test getTimeSharingTipIndex', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.updateTimeSharingOption(divisionData)
    let tipIndex = TimeSharing.getTimeSharingTipIndex()
    expect(tipIndex).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen', () => {
    const element = document.createElement('div');
    timeSharingOption.platform = 'pc'
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.updateTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen but oldTimeSharingData is null', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not DOM', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(null, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth less than 1280', () => {
    window.innerWidth = 1260;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 1366', () => {
    window.innerWidth = 1366;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 1440', () => {
    window.innerWidth = 1440;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 1680', () => {
    window.innerWidth = 1680;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 1920', () => {
    window.innerWidth = 1920;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 2180', () => {
    window.innerWidth = 2180;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 2560', () => {
    window.innerWidth = 2560;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 3440', () => {
    window.innerWidth = 3440;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 3840', () => {
    window.innerWidth = 3840;
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test disposeTimeSharingEChart', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.disposeTimeSharingEChart()
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test disposeTimeSharingEChart if timeSharing is null', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.timeSharing = null;
    TimeSharing.disposeTimeSharingEChart()
    expect(TimeSharing.timeSharing).toBeNull();
  })

  it('test resizeECharts but platfotm is mobile', () => {
    const element = document.createElement('div');
    timeSharingOption.platform = 'mobile'
    timeSharingOption.size = {
      height: 500,
      weight: 780
    }
    let TimeSharing = new TimeSharingChart(timeSharingOption);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(divisionData)
    TimeSharing.updateTimeSharingOption(divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

})