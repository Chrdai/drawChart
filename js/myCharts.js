/*
 * @purpose 	: 基于jquery 的图表数据对象
 * @time		: 2018-01-22
 * @author		: daicr
 * @reference	: myCharts.js
 * @params		: chart_data 图表数据
 *				  chart_num  图表数据的个数
*/
var myCharts = function(chart_data,chart_num){
	this.init(chart_data,chart_num);
}

myCharts.prototype = {
	//数组颜色（默认为5个）
	colorArr:['#2B78E4','#66CC00','#F7BA8B','#CA4236','#FAF06C'],
	
	// 初始化
	init:function(data,num){
		var _this = this;
		if(data && num>0){
			this.layout(data,num);
			// 配置数据条颜色
			$('#colorTips').find('div').each(function(i){
				$(this).height('20px').width('20px').css('background',_this.colorArr[i]);
			})
		}else if(!num || num <=0 || num == ''){
			alert('队列中没有数据');
			return false;
		}else{
			alert('图表数据初始化不正确');
			return false;
		}
		
	},
	
	// 根据显示表格数量进行页面布局
	layout:function(data,num){
		var cWidth = 0;				// 整个图表所占的宽度
		var cHeight = 0;			// 整个图表所占的高度
		var len = data.length;		// 画几个柱状图
		var html = '';				// 组装的 html 代码
		
		// 自动宽/高度自适应
		if(num < 2){
			cWidth = cHeight = '99%';
		}else{
			cWidth = '48.6%';
			cHeight = 100/Math.round(num/2) - 1.2*Math.round(num/2) + '%';
		}
		$('.myCharts').css({'width':cWidth,'height':cHeight});
		var tabH = $('.myCharts').height();
		$('.chart_body').height(tabH-50);
		html = '<table><tr>';
		for(var i=0;i<len;i++){
			html += '<td><div><span></span></div></td>';
		}
		html += "</td></table>";
		$('.chart_body').append(html);
	},
	
	// 开始画图表
	drawLine:function(arrData){
		var _this = this;
		var maxH = $('.chart_body').height() - 25;
		var X = 0;					// 百分比默认值
		var max_params_value = Math.max.apply(Math,arrData);
		if(max_params_value == 0){
			max_params_value = 1;	// 给传入参数的最大值一个默认值
		}
		X = maxH/max_params_value;	// 每个值所占高度的比例
		
		// 遍历 chart_body 中的 div 设置背景设并插入数据
		$('.chart_body').find('div').each(function(i){
			// 数据转换成百分比处理,设置背景色，显示相应数据
			$(this).height(arrData[i]*X).css('background',_this.colorArr[i]).find('span').html(arrData[i]);
		})
	}
	
}
	
