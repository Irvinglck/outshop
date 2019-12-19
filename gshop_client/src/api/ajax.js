/**
 * 封装ajax请求
 * 返回值： promise对象（异步返回数据：response.data）
 */
import axios from 'axios'

export default function ajax(url='',data={},type='GET') {

 return new Promise((resolve,reject)=>{
     let promise;
     //GET请求方式
     if(type==='GET'){
       //请求参数数据拼接成字符串
       let dataStr='';
       Object.keys(data).forEach(key=>{
         dataStr+=key+'='+data[key]+'&';
       })
       if(dataStr!==''){
         dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'));
         url=url+'?'+dataStr
       }
       promise=axios.get(url)
     }else{
       //发送post请求
       promise=axios.post(url,data);
     }
     //请求之后的回调
     promise.then(response=>{
       resolve(response.data)
     }).catch(error=>{
       reject(error)
     })
  })
}
