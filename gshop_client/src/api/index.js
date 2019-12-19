
/**
 *  n个接口
 */

import ajax from './ajax';

// const BASE_PATH='http://localhost:4000'
const BASE_PATH='/api'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress=(geohash)=>ajax(`${BASE_PATH}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodTypes=()=>ajax(BASE_PATH+'/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops=(a,b)=>ajax('/shops',{longitude:a,latitude:b})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqShopsByKey=(geohash,keyword)=>ajax(`/search_shops/${geohash}`,{keyword})
// [5、获取一次性验证码](#5获取一次性验证码)<br/>
export const reqVerfiCode=()=>ajax('/captcha')
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const login=(name,pwd,captcha)=>ajax('/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const sendCode=(phone)=>ajax('/sendcode',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const loginSms=(phone,code)=>ajax('/sendcode',{phone:phone,code:code},'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const userInfo=()=>ajax('/userinfo')
// [10、用户登出](#10用户登出)<br/>
export const logOut=()=>ajax('/logout')

