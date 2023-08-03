import axios from "axios";
import { message } from "antd";
// const { REACT_APP_API_URL } = process.env;
export default class Service {
    //   static Server_Base_URL = REACT_APP_API_URL;
    //   static API_URL =
    //     process.env.NODE_ENV === "production"
    //       ? process.env.REACT_APP_API_URL + "/api"
    //       : `${this.Server_Base_URL}/api`;
    static API_URL = 'http://localhost:3008/api'
    static API_Call_Counter = 0;
    static incre_API_Call_Counter = () => this.API_Call_Counter++;
    static decre_API_Call_Counter = () =>
    (this.API_Call_Counter =
        this.API_Call_Counter > 0 ? this.API_Call_Counter - 1 : 0);

    static error_message = "Something went wrong!";
    static error_message_key = "error_message_key";

    static message_containner = [];
    static add_message = (text) => {
        var index = this.message_containner.findIndex((x) => x === text);
        // here you can check specific property for an object whether it exist in your array or not
        if (index === -1) {
            this.message_containner.push(text);
        }
        return index;
    };
    static remove_message = (message) =>
    (this.message_containner = this.message_containner.filter(
        (m) => m !== message
    ));
    static messageError = (msg) => {
        const index = this.add_message(msg);
        if (index === -1) {
            message.error(msg).then(() => {
                this.remove_message(msg);
            });
        }
    };

    static messageInfo = (msg) => {
        const index = this.add_message(msg);
        if (index === -1) {
            message.info(msg).then(() => {
                this.remove_message(msg);
            });
        }
    };

    static postMethod = "POST";
    static getMethod = "GET";
    static putMethod = "PUT";
    static deleteMethod = "DELETE";
    static headers = {
        accept: "application/json",
        "content-type": "application/json",
    };




    static getcourse = "/course/getcourse";
    static getcoursebyid = "/course/getcoursebyid";


    static getbranch = "/branch/getbranch";

    static getStudent = "/student/getStudent";
    static updatestatus = "/student/update-status";
    static deletestudent = "/student/delete-student";
    static getstudentbyid = "/student/getstudentbyid";
    static editstudent = "/student/editstudent";
    static addstudent = "/student/addstudent";
    static genrateReport = "/student/genrate-report";

    static addfees = "/fees/addfees";
    static getfeesbystudent = "/fees/getfeesbystudent";
    static updatefees = "/fees/update-fees";


    static async makeAPICall({
        props,
        methodName,
        api_url,
        body,
        params,
        options,
    }) {
        api_url = this.API_URL + api_url;

        //request interceptor to add the auth token header to requests
        axios.interceptors.request.use(
            (config) => {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    config.headers = {
                        accept: "application/json",
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        authorization: "Bearer " + accessToken,
                        platform: "web-admin",
                        ...options,
                    };
                } else {
                    config.headers = {
                        accept: "application/json",
                        "content-type": "application/json",
                        platform: "web-admin",
                        ...options,
                    };
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        if (methodName === this.getMethod) {
            if (params) {
                api_url = api_url + "?" + params;
            }
            try {
                const response = await axios.get(api_url);
                return response;
            } catch (error) {
                if (props && error.response && error.response.status === 401) {
                    this.logOut(props);
                }
                return error.response;
            }
        }
        if (methodName === this.postMethod) {
            if (params) {
                api_url = api_url + "/" + params;
            }
            try {
                const response = await axios.post(api_url, body, options);
                return response;
            } catch (error) {
                if (props && error.response && error.response.status === 401) {
                    this.logOut(props);
                }
                return error.response;
            }
        }
        if (methodName === this.putMethod) {
            if (params) {
                api_url = api_url + "/" + params;
            }
            try {
                const response = await axios.put(api_url, body, options);
                return response;
            } catch (error) {
                if (props && error.response && error.response.status === 401) {
                    this.logOut(props);
                }
                return error.response;
            }
        }
        if (methodName === this.deleteMethod) {
            if (params) {
                api_url = api_url + "/" + params;
            }
            try {
                const response = await axios.delete(api_url, { data: body });
                return response;
            } catch (error) {
                if (props && error.response && error.response.status === 401) {
                    this.logOut(props);
                }
                return error.response;
            }
        }
    }

    static logOut(props) {
        props.logOutHandler();
        props.history.push("/login");
    }

    static uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }
}