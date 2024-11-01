import { useState } from './useGlobalState'
export const useInit = () => {
    const { getActiveTabStyle } = useState()
    const initStyle = () => {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .note-detail-mask { transition: none !important; } .note-detail-mask .note-container{transition: none !important; }
            .check-tag{position: absolute;top:0;left:0;width:30px;height:30px;z-index:2;}
            .floating-button {
                position: fixed;
                bottom: 100px;
                left: 20px;
                background-color: #161616;
                color: #fff;
                padding: 10px 10px;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
    
            .floating-button:hover {
                background-color: #ff213a;
            }
            .is-setting{
                display: flex;
            }
      `
        document.head.appendChild(style);


        var floatingButton = document.createElement('div');
        floatingButton.className = 'floating-button';
        floatingButton.innerHTML = '隐藏配置';
        floatingButton.onclick = function (e) {
            let isShow = e.target.innerHTML == '隐藏配置'
            e.target.innerHTML = isShow ? '显示配置' : '隐藏配置'

            document.querySelectorAll(".is-setting").forEach(e => {
                e.style.display = !isShow ? 'flex' : 'none'
            })

        };
        // document.body.appendChild(floatingButton);
    }


    //插入修改按钮
    const initButton = (callback) => {

        const sectionElements = document.querySelectorAll(`.feeds-tab-container .transform-container .tab-content-item:${getActiveTabStyle()} .feeds-container section div.footer`);
        // 遍历所有的section元素
        sectionElements.forEach((sectionElement) => {
            if (!sectionElement.parentElement.querySelector('div.modify-button')) {
                const modifyButton = document.createElement('div');
                let aEl = sectionElement.parentElement.querySelector('a')
                if (aEl && aEl.href) {
                    modifyButton.id = /explore\/(.+)/.exec(aEl.href)[1]
                    //设置点击的a标签的id
                    aEl.nextElementSibling.id = 'a_' + modifyButton.id
                }

                modifyButton.setAttribute('data-id', modifyButton.id)
                modifyButton.className = "modify-button is-setting"
                modifyButton.style.width = "30px";
                modifyButton.style.height = "30px";
                modifyButton.style.display = "flex";
                modifyButton.style.justifyContent = "center";
                modifyButton.style.alignItems = "center";
                modifyButton.style.transition = "background .3s";
                modifyButton.textContent = '@'; // 设置按钮的文本内容
                modifyButton.style.backgroundColor = "#f07775";
                modifyButton.style.color = "#ffffff";
                modifyButton.style.fontSize = "14px";
                modifyButton.style.borderRadius = "50%";
                modifyButton.style.cursor = "pointer";
                modifyButton.style.position = "absolute";
                modifyButton.style.top = "-50px";
                sectionElement.style.position = "relative";

                modifyButton.addEventListener("click", (e) => {
                    console.log('>>>>>>', e.target.id);
                    // console.log('>>>>>>',e.target.getAttribute('data-id'));
                    callback(e.target.id)
                    //关闭按钮
                });

                sectionElement.prepend(modifyButton);
            }

        });


    }
    return {
        initStyle,
        initButton
    }
}