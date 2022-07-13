import axios from 'axios';
import AuthUser from './AuthUser';

export default function ApiService(){

    const {getToken} = AuthUser();


    const httprequest = axios.create({
        baseURL:"http://localhost:8000/api/",
        headers:{
            "Content-Type":"application/json"
        }
    });

    const httprequestwtoken = axios.create({
        baseURL:"http://localhost:8000/api/",
        headers:{
            "Content-Type":"application/json",
            authorization: "Bearer " + getToken(),
        }
    });


    return {
        httprequest,
        httprequestwtoken
    }
}