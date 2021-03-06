var option = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: false, // 是否开启动画。
    tooltip: { // 提示框组件。
        trigger: 'axis', //触发类型。当前为坐标轴触发
        animation: false,
        axisPointer: { // 坐标轴指示器配置项。
            type: 'cross', // 指示器类型。当前为十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色。
        borderWidth: 1, // 提示框浮层的边框宽。
        borderColor: '#ccc', // 提示框浮层的边框颜色。
        padding: 10, // 提示框浮层内边距，单位px
        textStyle: { // 提示框浮层的文本样式。
            color: '#000' // 文字的颜色。
        },
        extraCssText: 'background:#252332;border:0;color:#ffffff;opacity: 0.7;font-size:12px;' // 额外附加到浮层的 css 样式,例如浮层阴影
    },
    grid: [ // 直角坐标系内绘图网格
        {
            top: 60, // grid 组件离容器上侧的距离。
            left: 5, // grid 组件离容器左侧的距离。
            bottom: 20, // grid 组件离容器下侧的距离。
            right: 65, // grid 组件离容器右侧的距离。
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category', // 坐标轴类型。当前为类目轴，适用于离散的类目数据
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid
            // scale: true, // 
            boundaryGap: true, // 坐标轴两边留白策略，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
            axisLine: {  // 坐标轴轴线相关设置
                onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                lineStyle: { // 坐标轴线线的样式
                    color: '#666'
                }
            },
            splitLine: {  // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                color: '#666', // 刻度标签文字的颜色
                showMinLabel: false // 是否显示最小 tick 的 label。可取值 true, false, null。默认自动判定（即如果标签重叠，不会显示最小 tick 的 label）。
            },
            axisTick: { // 坐标轴刻度相关设置
                alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            splitNumber: 2, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效
            min: 'dataMin', // 坐标轴刻度最小值，设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度
            max: 'dataMax', // 坐标轴刻度最大值，设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
            axisPointer: {  // 坐标轴指示器
                z: 100
            }
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            scale: true, // 只在数值轴中（type: 'value'）有效
        }
    ],
    dataZoom: [ // 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响
        {
            id: 'dataZoomX',
            throttle: 0,
            type: 'inside',
            filterMode: 'filter', // 当前数据窗口外的数据，被 过滤掉。即会影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉
            // xAxisIndex: [0, 1], // 表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
            start: 60,  // 数据窗口范围的起始百分比
            end: 100, // 数据窗口范围的结束百分比
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值）
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'candle',
            type: 'candlestick', // K线图
            itemStyle: { // K 线图的图形样式
                normal: { // 
                    color: '#ee4b4b', // 阳线图像颜色
                    color0: '#42B983', // 阴线图像颜色
                    borderColor: null, // 阳线 图形的描边颜色
                    borderColor0: null // 阴线 图形的描边颜色
                }
            }
        },
        {
            name: 'MA5', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线图
            symbol: 'none', // 
            smooth: true, //  是否平滑显示 
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            lineStyle: { // 线的样式
                normal: {
                    color: '#fd1d57',  // 颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                    width: 1 // 线宽
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            symbol: 'none',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#4df561',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            symbol: 'none',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#2bdaff',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA30',
            type: 'line',
            symbol: 'none',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#ffd801',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA60',
            type: 'line',
            symbol: 'none',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#f721ff',
                    opacity: 1,
                    width: 1
                }
            }
        }
    ]
};
  
export default option;
  