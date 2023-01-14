import axios from 'axios'

// const ax = axios.create({
//     baseURL: 'http://localhost/api/'
// });

const devUrl = "http://localhost/api/";
const liveUrl = "https://brandonsplawski.com/api/"; // Leave off the wwww!

var url;
if(location.hostname == "localhost"){
    url = devUrl;
}else{
    url = liveUrl;
    // we want to make sure we are using https on the live server
    // I got this code from here: https://stackoverflow.com/questions/4723213/detect-http-or-https-then-force-https-in-javascript
    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
}

const ax = axios.create({
    baseURL: url
});

let sessionId = null;
const userDataStr = sessionStorage.getItem("currentUser");
if (userDataStr){
    const userData = JSON.parse(userDataStr);
    sessionId = userData.sessionId;
}

// You can 'intercept' all requests made by ax, and add your own headers to the request
// Here we're adding the x-id header so that the server can keep the session going
ax.interceptors.request.use(request => {
    if(sessionId){
    request.headers['x-id'] = sessionId;
    }
    return request;
});

// here we extract the x-id header from the response 
// and use it to set our sessionId variable
ax.interceptors.response.use(response => {
    if(response.headers['x-id']){
    sessionId = response.headers['x-id'];
    }
    return response;
});

const UserDataAccess = {
    getAllUsers() {
        return ax.get("users/").catch((error) => errorHandler("Error Getting All Users:" + error));
    },
    getUserById(id) {
        return ax.get("users/" + id).catch((error) => errorHandler("Error Getting User By Id:" + error));
    },
    deleteUser(id){
        return ax.delete("users/" + id).catch((error) => errorHandler("Error Deleting User:" + error));
    },
    updateUser(user) {
        return ax.put("users/" + user.id, user);
    },
    insertUser(user) {
        return ax.post("users/", user);
    },
    login(email, password){
        return ax.post("login/", {email,password});
    },
    logout(){
        return ax.get("logout/");
    }
}

const RoleDataAccess = {
    getAllRoles() {
        return ax.get("roles/").catch((error) => errorHandler("Error Getting All Roles:" + error));
    }
}

const DividendDataAccess = {
    getAllDividends() {
        return ax.get("dividends/").catch((error) => errorHandler("Error Getting All Dividends:" + error));
    },
    getDividendById(id){
        return ax.get("dividends/" + id).catch((error) => errorHandler("Error Getting Dividend By Id:" + error));
    },
    updateDividend(dividend) {
        return ax.put("dividends/" + dividend.dividendId, dividend).catch((error) => errorHandler("Error Updating Dividend:" + error));
    },
    insertDividend(dividend) {
        return ax.post("dividends/", dividend).catch((error) => errorHandler("Error Inserting Dividend:" + error));
    },
    deleteDividend(id){
        return ax.delete("dividends/" + id).catch((error) => errorHandler("Error Inserting Dividend:" + error));
    }

}

const PlatformDataAccess = {
    getAllPlatforms() {
        return ax.get("platforms/").catch((error) => errorHandler("Error Getting All Platforms:" + error));
    },
    getPlatformById(id){
        return ax.get("platforms/" + id).catch((error) => errorHandler("Error Getting Platform By Id:" + error));
    },
    updatePlatform(platform) {
        return ax.put("platforms/" + platform.platformId, platform).catch((error) => errorHandler("Error Updating Platform:" + error));
    },
    insertPlatform(platform) {
        return ax.post("platforms/", platform).catch((error) => errorHandler("Error Inserting Platform:" + error));
    },
    deletePlatform(id){
        return ax.delete("platforms/" + id).catch((error) => errorHandler("Error Deleting Platform:" + error));
    }
}
function errorHandler(msg) {
    console.log("API ERROR", msg);
}




export { UserDataAccess, RoleDataAccess, DividendDataAccess, PlatformDataAccess}