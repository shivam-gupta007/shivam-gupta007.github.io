const link_arr = [];

function add_msg() {
    var user_msg = document.getElementById('input-msg').value;
    if (user_msg == "") {
        alert("Please enter some message");
    }
    else {
        make_msg_container(user_msg, 'user-msg-box', false);
        call_api(user_msg);
    }
}

function make_msg_container(msg_txt, class_name, isLink) {
    var div_tag = document.createElement("div");
    div_tag.classList.add(class_name);

    if (isLink) {
        var a_tag = document.createElement('a'); //creatign a tag
        var a_text = document.createTextNode(link_arr[0]); //creating text node
        a_tag.appendChild(a_text); //adding text in the a tag
        a_tag.href = link_arr[1];
        div_tag.appendChild(a_tag); //adding a tag in the div tag
    }
    else {
        var p_tag = document.createElement("p");
        var p_text = document.createTextNode(msg_txt);
        p_tag.appendChild(p_text);
        div_tag.appendChild(p_tag);
    }

    var msg_box = document.getElementById('msg_box');
    msg_box.classList.add('msg-box-class');
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

            if (ai_msg.substr(0, 2) == "<a") {
                var link;
                var link_text;
                let idx1 = ai_msg.search("http");
                let idx2 = ai_msg.search(">");
                let idx3 = ai_msg.search("</a>");

                link = ai_msg.substring(idx1, (idx2 - 1));
                link_text = ai_msg.substring((idx2 + 1), idx3);
                
                link_arr[0] = link_text;
                link_arr[1] = link;
                make_msg_container(ai_msg, 'ai-msg-box', true);
            }
            else {
                make_msg_container(ai_msg, 'ai-msg-box', false);
            }

            console.log(data['cnt']);
            console.log(link_arr);
        })
        .catch(err => {
            console.error(err);
        });
}