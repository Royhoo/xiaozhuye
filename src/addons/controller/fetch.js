'use strict';

import Base from './base.js';
import request from "request";
import axios from 'axios';
import _ from 'lodash';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    //pm2.5
    async pm25Action() {
        let res = await axios.get('https://waqi.info/api/feed/@3303/now.json');
        if (res.data.rxs && res.data.rxs.status == 'ok') {
            return this.success(res.data.rxs.obs[0]);
        }
        return this.fail({
            status: 'fail'
        });
    }

    //天气
    async weatherAction() {
        let ip = this.ip();
        let res = await axios.get('https://route.showapi.com/9-4?ip=' + ip + '&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617');
        let data = res.data;
        if (data.showapi_res_body.ret_code != '-1') {
            data = {
                pos: data.showapi_res_body.cityInfo.c5,
                now: {
                    temperature: data.showapi_res_body.now.temperature,
                    weather: data.showapi_res_body.now.weather,
                    wind_power: data.showapi_res_body.now.wind_power
                },
                f1: {
                    day_weather: data.showapi_res_body.f1.day_weather,
                    night_weather: data.showapi_res_body.f1.night_weather,
                    day_air_temperature: data.showapi_res_body.f1.day_air_temperature,
                    night_air_temperature: data.showapi_res_body.f1.night_air_temperature
                }
            };
            return this.success(data);
        }
        return this.fail({
            status: 'fail'
        });
    }

    //新闻头条
    async toutiaoAction() {
        let getApiData = () => {
            let fn = think.promisify(request.get);
            return fn({
                url: "http://v.juhe.cn/toutiao/index?type=top&key=1cbcc9bbbced658f6c56e7fa695e4fa3"
            });
        };

        let msg = getApiData();

        let result = await Promise.all([msg]);
        let resArr = JSON.parse(result[0].body).result.data;
        this.end(_.dropRight(resArr, 21));
    }

    //国内焦点
    async gnfocusAction() {
        let getApiData = () => {
            let fn = think.promisify(request.get);
            return fn({
                url: "https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001cd&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617"
            });
        };

        let msg = getApiData();

        let result = await Promise.all([msg]);
        let resArr = JSON.parse(result[0].body).showapi_res_body.pagebean.contentlist;
        this.end(resArr);
    }

    //国外焦点
    async gwfocusAction() {

        let getApiData = () => {
            let fn = think.promisify(request.get);
            return fn({
                url: "https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001ce&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617"
            });
        };

        let msg = getApiData();

        let result = await Promise.all([msg]);
        let resArr = JSON.parse(result[0].body).showapi_res_body.pagebean.contentlist;
        this.end(resArr);
    }

    //娱乐焦点
    async yuleAction() {

        let getApiData = () => {
            let fn = think.promisify(request.get);
            return fn({
                url: "https://route.showapi.com/109-35?channelId=5572a108b3cdc86cf39001d5&maxResult=10&needAllList=0&needContent=0&needHtml=0&page=1&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617"
            });
        };

        let msg = getApiData();

        let result = await Promise.all([msg]);
        let resArr = JSON.parse(result[0].body).showapi_res_body.pagebean.contentlist;
        this.end(resArr);
    }

    async duanziAction() {

        let getApiData = () => {
            let fn = think.promisify(request.get);
            return fn({
                url: "https://route.showapi.com/255-1?page=&showapi_appid=25653&showapi_sign=fde151b148b6494aa99d07426967b617"
            });
        };

        let msg = getApiData();

        let result = await Promise.all([msg]);
        let resArr = JSON.parse(result[0].body).showapi_res_body.pagebean.contentlist;
        return this.end(_.dropRight(resArr, 10));
    }
}