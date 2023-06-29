export async function firebaseCreateUser(userObj){
    const url = 'https://ourlivinguppgift-default-rtdb.europe-west1.firebasedatabase.app/allUsers.json'
    const init = {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers:{
            'Content-type': 'application/json: charset=UTF-8'
        }
    }
    const response = await fetch(url, init);
    const data = await response.json();
    return  data
}
export async function firebaseGetUsers(){
    const url = 'https://ourlivinguppgift-default-rtdb.europe-west1.firebasedatabase.app/allUsers.json'
    const response = await fetch(url);
    const data = await response.json();
    const users = Object.values(data);
    return users;
}