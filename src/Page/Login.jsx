import './Login.css'

function Login(){

    async function getToken(){
        let token = await login_loop(username, password);
        if (token === undefined) {
            alert("Wrong Username or Password");
        } else {
            console.log("Token is " + token);
            window.location.href += "App";
        }
    }

    function enter_button_callback(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        
        // console.log(username)
        // console.log(password)
        // window.location.href += "App";

        // getToken(username, password);
    }

    return (
        <div className='Login'>
            <input id="username" placeholder='Username'></input>
            <input id="password" type="password" placeholder='Password'></input>
            <button id="enter" onClick={enter_button_callback}> Login </button>
            <div id='login_modal'>
                
            </div>
        </div>
    );
}

export default Login;