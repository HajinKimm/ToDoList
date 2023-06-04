const form = document.querySelector('.toDo form');
const txt = document.querySelector('.toDo form .userText');
const out = document.querySelector('.toDo .output');
//obj추가
const add = () => {
    let num = 0;
    num = localStorage.getItem("num",JSON.stringify(num));
    num++;
    localStorage.setItem("num",JSON.stringify(num));
    let obj = JSON.parse(localStorage.getItem("obj")) || [];
    obj = [
        ...obj, 
        {id:num, text: txt.value, change:false ,ischeck:false},
    ]
    localStorage.setItem("obj",JSON.stringify(obj));
}

//삭제 버튼
const delShow = (delBtn, id) =>{
    delBtn.addEventListener('click',e=>{
        let obj = JSON.parse(localStorage.getItem("obj"))
        obj = obj.filter(item => item.id !== id);
        localStorage.setItem("obj", JSON.stringify(obj));
        show();
    })
}
let changeId = 0;

//수정버튼
const changetxt = (changeBtn, id, userTxt)=>{
    changeBtn.addEventListener('click',e=>{
        let obj = JSON.parse(localStorage.getItem("obj"))
        const checkItem = obj.filter(item => item.id === id)
        changeId = id;
        checkItem[0].change = !checkItem[0].change;
        localStorage.setItem("obj", JSON.stringify(obj));
        show();
    })
}

//완료버튼
const completeBtn = (complBtn,id,userTxt) =>{
    complBtn.addEventListener('click',e=>{
        let obj = JSON.parse(localStorage.getItem("obj"));
        const checkItem = obj.filter(item => item.id === id)
        console.log(checkItem[0].text)
        checkItem[0].text = userTxt.value
        checkItem[0].change = !checkItem[0].change;
        localStorage.setItem("obj", JSON.stringify(obj));
        show();
    })
}

const changeColor = (li, change,changeBtn,userTxt,delBtn,complBtn) =>{
    let obj = JSON.parse(localStorage.getItem("obj"))
    if(change){
        complBtn.style.backgroundColor='#999'
        changeBtn.style.backgroundColor='#999'
        userTxt.style.color='#999'
        changeBtn.textContent = '취소'
        userTxt.disabled = false;
        userTxt.style.border='1px solid #999'
        userTxt.style.borderRadius='5px'
        li.append(complBtn,changeBtn);
    }else{
        li.append(delBtn);
        
    }
    localStorage.setItem("obj", JSON.stringify(obj));
}
//체크박스
const checkBox = (check, id) => {
    check.addEventListener('click',e=>{
        let obj = JSON.parse(localStorage.getItem("obj"))
        const checkItem = obj.filter(item => item.id === id)
        checkItem[0].ischeck = !checkItem[0].ischeck;
        checkItem[0].change = false;
        localStorage.setItem("obj", JSON.stringify(obj));
        show();
    })
}

// obj 생성
const show = () => {
    let obj = JSON.parse(localStorage.getItem("obj")) || [];
    out.innerHTML = '';
    obj.forEach(ele=>{
        const {id, text,change, ischeck} = ele;
        let li = document.createElement('li');
        let check = document.createElement('i');
        let userTxt = document.createElement('input');
        let changeBtn = document.createElement('button');
        let delBtn = document.createElement('button');
        let complBtn = document.createElement('button');
        userTxt.value = text
        userTxt.disabled = true;
        changeBtn.textContent = '수정'
        delBtn.textContent = '삭제'
        complBtn.textContent = '완료'
        if(ischeck){
            check.setAttribute('class','xi-check-circle-o');
            li.classList.add('on');
            changeBtn.remove()
            userTxt.style.width = '408px'
            li.append(check, userTxt, delBtn);
        }else if(!ischeck){
            check.setAttribute('class','xi-radiobox-blank');
            li.append(check, userTxt, changeBtn);
            changeColor(li, change,changeBtn,userTxt,delBtn,complBtn)
        }                
        out.append(li);

        changetxt(changeBtn, id,userTxt);
        delShow(delBtn, id);
        checkBox(check, id);
        completeBtn(complBtn, id,userTxt)
        if(id === changeId){
            userTxt.focus();
            changeId =0;

        }
        userTxt.addEventListener('keyup',e=>{
            if(e.keyCode===13){
                let obj = JSON.parse(localStorage.getItem("obj"));
                const checkItem = obj.filter(item => item.id === id)
                console.log(checkItem[0].text)
                checkItem[0].text = userTxt.value
                checkItem[0].change = !checkItem[0].change;
                localStorage.setItem("obj", JSON.stringify(obj));
                show();
            }
        })
    })
}


form.addEventListener('submit',e=>{
    e.preventDefault();                
    add();
    show();
    txt.value='';
    txt.focus()

}) 

show();