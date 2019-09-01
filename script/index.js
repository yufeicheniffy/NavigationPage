{
    const View = document.querySelector('#keyboardSection');
    const Model = {
        init: function () {
            this.update_hash();
        },
        keyboardList: {
            0: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            3: ["Z", "X", "C", "V", "B", "N", "M"],
            "length": 4
        },
        hash: {
            Q: "www.qq.com",
            W: "www.weibo.com",
            B: "www.bilibili.com",
            H: "wallhaven.cc",
            F: "www.facebook.com",
            T: "www.taobao.com"
        },
        update_hash: function () {
            let hashOnLocalStorage = JSON.parse(localStorage.getItem("hashlink") || "null")
            if (hashOnLocalStorage) { //replace hash
                this.hash = hashOnLocalStorage
            }
        }
    };
    const Controller = {
        init: function () {
            this.renderKeyboard();
            this.bindEvents();
        },
        bindEvents: function () {
            this.openWhenPressKey();
            this.editButton();

        },
        openWhenPressKey: function () {
            document.onkeypress = (event) => {
                window.open(url = "http://" + Model.hash[event.key.toUpperCase()], target = "_self")
            };
        },
        editButton: function () {
            let editButtons = Array.from(View.querySelectorAll(".editButton"))
            editButtons.forEach(editButton => {
                editButton.onclick = function (information) {
                    let input = prompt("请输入你导航的网址")
                    let keyID = information.target["id"]
                    let key = document.getElementById("keyID")
                    Model.hash[keyID] = input
                    let hyperlink = document.getElementById(key + "link")
                    hyperlink.href = "http://" + input
                    hyperlink.title = input
                    appendIcon(url = input, key)
                    localStorage.setItem("hashlink", JSON.stringify(Model.hash))
                }
            })
        }
        ,
        renderKeyboard: function () {
            let keyboardList = Model.keyboardList;
            let hash = Model.hash;
            for (let index1 = 0; index1 < keyboardList.length; index1++) {
                let row = document.createElement("div")
                let keyWrapper = document.createElement("div")
                row.className = "row";
                row.id = "row" + index1;
                keyWrapper.className = "keyWrapper"
                document.getElementById("keyboard").appendChild(row)
                row.appendChild(keyWrapper)
                for (let index2 = 0; index2 < keyboardList[index1].length; index2++) {
                    let key = document.createElement("kbd")
                    let hyperlink = document.createElement("a")
                    let editButton = document.createElement("button")
                    editButton.classList.add("editButton")
                    editButton.textContent = "Edit"
                    editButton.id = keyboardList[index1][index2]
                    hyperlink.textContent = keyboardList[index1][index2]
                    hyperlink.href = "http://" + hash[keyboardList[index1][index2]]
                    hyperlink.title = hash[keyboardList[index1][index2]]
                    if (hash[keyboardList[index1][index2]]) {
                        this.appendIcon(hash[keyboardList[index1][index2]], key);
                    }
                    key.title = hyperlink.title
                    hyperlink.id = editButton.id + "link"
                    keyWrapper.appendChild(key)
                    key.appendChild(hyperlink)
                    key.appendChild(editButton)
                }
            }
        },
        requestIcon: function (url) {
            return new Promise(function (resolve, reject) {
                let iconurl = url
                let iconImage = document.createElement("img");
                iconImage.className = "iconImage";
                iconImage.src = iconurl;
                iconImage.onload = function () {
                    resolve(iconImage);
                };
                iconImage.onerror = function () {
                    reject("request fails");
                }
            })
        },
        appendIcon: function (url, key) {
            let iconurl = "http://" + url + "/favicon.ico"
            this.requestIcon(iconurl).then((iconImage) => {key.append(iconImage);}, (error) => {
                this.requestIcon(`https://media.` + url.replace("www.", "") + `/dist/min/img/favicon.ico`, key).then(
                    (iconImage) => {key.append(iconImage);});
            })
        },
    };
    Model.init();
    Controller.init();
}