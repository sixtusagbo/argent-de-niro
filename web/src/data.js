import axios from 'axios';

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getMonthName() {
    return month[new Date().getMonth()];
}

export const user = async (route, data) => {
    let credentials = {};
    try{
        const userInfo = await axios.get(route, data);
        credentials.append('refresh_token', userInfo.data.refresh_token);
        credentials.append('access_token', userInfo.data.access_token);
        return credentials;
    } catch (error) {
        console.error(error);
    }
}