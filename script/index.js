keyboardList={
    0:["1","2","3","4","5","6","7","8","9","0"],
    1:["Q","W","E","R","T","Y","U","I","O","P"],
    2:["A","S","D","F","G","H","J","K","L"],
    3:["Z","X","C","V","B","N","M"],
    "length":4
}

hash={Q:"www.qq.com",W:"www.weibo.com",B:"www.bilibili.com",H:"wallhaven.cc",F:"www.facebook.com"}

hashOnLocalStorage=JSON.parse(localStorage.getItem("hashlink")||"null")
if(hashOnLocalStorage){ //replace hash
    hash=hashOnLocalStorage
}

for(let index1=0;index1<keyboardList.length;index1++){
    let row=document.createElement("div")
    let keyWrapper=document.createElement("div")
    row.className="row";
    row.id="row"+index1;
    keyWrapper.className="keyWrapper"
    document.getElementById("keyboard").appendChild(row)
    row.appendChild(keyWrapper)
    for(let index2=0;index2<keyboardList[index1].length;index2++){
        let key=document.createElement("kbd")
        let hyperlink=document.createElement("a")
        let editButton=document.createElement("button")
        editButton.textContent="Edit"
        editButton.id=keyboardList[index1][index2]
        hyperlink.textContent=keyboardList[index1][index2]
        hyperlink.href="http://"+hash[keyboardList[index1][index2]]
        hyperlink.title=hash[keyboardList[index1][index2]]
        iconImage=document.createElement("img")
        iconImage.className="iconImage"
        if(hash[keyboardList[index1][index2]]){
            iconImage.src="http://"+hash[keyboardList[index1][index2]]+"/favicon.ico";
            key.append(iconImage);
        }
        key.title=hyperlink.title
        hyperlink.id=editButton.id+"link"
        keyWrapper.appendChild(key)
        key.appendChild(hyperlink)
        key.appendChild(editButton)
        editButton.onclick=function (information) {
            input=prompt("请输入你导航的网址")
            key=information.target["id"]
            hash[key]=input
            hyperlink=document.getElementById(key+"link")
            hyperlink.href="http://"+input
            hyperlink.title=input
            localStorage.setItem("hashlink",JSON.stringify(hash))
        }
    }
}
document.onkeypress=function (information) {
    window.open(url="http://"+hash[information.key.toUpperCase()],target="_self")
}