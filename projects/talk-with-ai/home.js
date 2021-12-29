function add_msg() {
    var user_msg = document.getElementById('input-msg').value;
    if (user_msg == "") {
        alert("Please enter some message");
    }
    else {
        make_msg_container(user_msg, 'user-msg-box');
        call_api(user_msg);
    }
}

function make_msg_container(msg_txt, class_name) {
    var div_tag = document.createElement("div");
    div_tag.classList.add(class_name);
    var p_tag = document.createElement("p");
    var p_text = document.createTextNode(msg_txt);
    p_tag.appendChild(p_text);
    div_tag.appendChild(p_tag);
    var msg_box = document.getElementById('msg_box');
    msg_box.appendChild(div_tag);
}

function call_api(msg) {
    fetch("https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=178&key=sX5A2PcYZbsN5EY6&uid=mashape&msg=" + msg, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
            "x-rapidapi-key": "e3e9f63991msh54b341b6a7a366bp1ff4d8jsn77a23b78f2d1"
        }
    })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            var ai_msg = data['cnt'];
            make_msg_container(ai_msg, 'ai-msg-box');
            console.log(data['cnt']);
        })
        .catch(err => {
            console.error(err);
        });
}