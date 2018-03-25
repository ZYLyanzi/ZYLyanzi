export default {
  //单个属性进行校验
  byOneValid(param, rule) {
    // console.log("校验的name",  param);
    // console.log("校验的name",  rule);

    //校验状态，校验通过为false，不通过为true
    var reqStatus = false;
    var lenStatus = false;
    var typeStatus = false;
    var suitableStatus = false;
    //特殊字符校验
    if (typeof (param) == 'string'){
      let state = 0;
      suitableStatus += param.indexOf('<') + 1;
      suitableStatus += param.indexOf('>') + 1;
      suitableStatus += param.indexOf('|') + 1;
      suitableStatus += param.indexOf(';') + 1;
      suitableStatus += param.indexOf("'") + 1;
      if (state > 0){
        suitableStatus = true;
      }
    }

    // console.log("必填校验", (param + ''));
    if (rule.itRequried.reg && !(param)) {// 如果是必填
      reqStatus = true;
      rule.itMsg = rule.itRequried.msg;
    } else {
      reqStatus = false;
    }
    // console.log("长度校验", (param + '').length);
    if (rule.itLen.reg && (param+'').length > rule.itLen.reg) {// 如果长度有限制
      lenStatus = true;
      rule.itMsg = rule.itLen.msg;
    } else {
      lenStatus = false;
    }
    if (rule.itType.reg) {//如果字符类型有限制
      var re = rule.itType.reg;
      var result = true;
      // 如果是身份证
      if (re == 'idcard'){
        console.log("如果身份证校验结果", re);
        result = this.checkIDCard(param);
        // console.log("身份证校验结果", result)
      }else {
        result = re.test((param+''));
        // console.log("其他正则校验结果", result)
      }
      //var result=re.test(params.value+'');
      if(param == ''){
        typeStatus=false;
      }else{
        // 校验不通过为flase
        if (!result) {
          rule.itMsg = rule.itType.msg;
          typeStatus = true;
        } else {
          typeStatus = false;
        }
      }
    }

    if (param == 'email'){
      console.log("reqStatus", reqStatus);
      console.log("lenStatus", lenStatus);
      console.log("typeStatus", typeStatus);
    }

    if (reqStatus || lenStatus || typeStatus || suitableStatus) {//如果任何一项不满足要求
      rule.itState = 'error';
      return 1;
    } else {
      rule.itState = 'success';
      return 0;
    }
    // return rule;
  },

  // 身份证校验方法
  /*
    函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，
    十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
    详情查看javascript的数值范围
  * */
  checkIDCard(idcode){
    // 加权因子
    if (!idcode || idcode.length < 17) {
      return false;
    }

    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    // 校验码
    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];

    var code = idcode + "";
    var last = idcode[17];//最后一个

    var seventeen = code.substring(0,17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for(var i = 0; i < len; i++){
      num = num + arr[i] * weight_factor[i];
    }

    // 获取余数
    var resisue = num%11;
    var last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    var format = idcard_patter.test(idcode);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format ? true : false;
  },

  //微信浏览器判断
  itUserAgent () {
    var ua = window.navigator.userAgent.toLowerCase();
    // console.log("浏览器判断", ua);

    let index = ua.lastIndexOf("\/");
    let latUa = ua.substring(index + 1, ua.length);
    // console.log("浏览器判断", latUa);

    let arr = latUa.split('.');

    if (ua.match(/android\//i) == 'android/') {
      if (parseFloat(latUa) < 1.1){
        return 'noSignAndroid'
      }else if(parseFloat(latUa) == 1.1){
        if (arr[2] <= 10){
          return 'noSignAndroid'
        }else {
          return 'hasSignAndroid'
        }
      }else {
        return 'hasSignAndroid'
      }
    }else if(ua.match(/native_ios/i) == 'native_ios') {
      return 'hasSignIos';
    } else if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return 'isWeixin';
    }else{
      return 'isMobile';
    }
  },
  //获取url参数
  getQueryString(url, name) {
    console.log("获取url参数1", name);

    // if (url.indexOf("?") != -1) {
    //   let str = url.substr(1);
    //   let strs = str.split("&");
    //   for(var i = 0; i < strs.length; i ++) {
    //     theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    //   }
    // }



    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    console.log("获取url参数2", r);
    if (r != null) {
      return (r[2]);
    }
    return null;


  },
  //请求
  syncRequest: function(url, type='get', async=true){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(xmlobj){
    };
    xmlhttp.open(type,url,async);
    xmlhttp.send(null);
    // console.log(xmlhttp.responseText );
    // return JSON.parse(xmlhttp.responseText);
  },

  // 获取url参数
  getUrlParams: function(){
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split("&");//在逗号处断开
    for(var   i=0;i<pairs.length;i++)
    {
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1)   continue;//如果没有找到就跳过
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=unescape(value);//存为属性
    }
    return args;
  },
  urlStrReplace(u) {
    if(!u){
      return '';
    }

    var regs = [
      /\:/g,
      /\//g,
      /\#/g,
      /\?/g
    ];

    var replacement = [
      '%3A',
      '%2F',
      '%23',
      '%3f'
    ];


    for(var i = 0;i < regs.length ;i++){
      if(regs[i].test(u)){
        u = u.replace(regs[i],replacement[i]);
      }
    }

    return u;
  },

  getDateDiff(time) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    return time.replace(/\-/g, "/");
  }
}
