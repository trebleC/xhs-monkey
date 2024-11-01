
import { useState } from './useGlobalState'
import { useFetch, prefix } from "./useFetch";

const { _window, globalState, getActiveTab, getActiveTabStyle } = useState()

//返回在线note的id
export const getOnlineNoteIds = () => {
    let arr = []
    const sectionElements = document.querySelectorAll(`.feeds-tab-container .transform-container .tab-content-item:${getActiveTabStyle()} .note-item .footer .modify-button`);
    sectionElements && sectionElements.forEach(item => {
        let parentElement = item.parentNode.parentNode.parentNode
        if (!parentElement.childNodes[0].className.includes('check-tag')) {
            arr.push(item.id)
        }
    })
    return arr
}


//处理在线的note(添加存在按钮)
export const showNoteBranch = () => {
    const sectionElements = document.querySelectorAll(`.feeds-tab-container .transform-container .tab-content-item:${getActiveTabStyle()} .note-item .footer .modify-button`);
    const onlineNote = []
    sectionElements.forEach(item => onlineNote.push(item.id))
    // console.log('>>>>>>globalState.onlineNote', globalState.onlineNote);
    //这里处理是否已保存到服务器,然后在页面显示已处理

    useFetch({
        url: `${prefix}/note/checkIdsExist`,
        method: 'POST',
        data: { noteIds: onlineNote },
    }).then(res => {
        sectionElements.forEach(e => {
            if (res.data.includes(e.id)) {
                let parentElement = e.parentNode.parentNode.parentNode
                if (!parentElement.childNodes[0].className.includes('check-tag')) {
                    const checkTag = document.createElement('div');
                    checkTag.className = "check-tag is-setting"
                    checkTag.textContent = '👌'; // 设置按钮的文本内容
                    e.parentNode.parentNode.parentNode.prepend(checkTag);
                }

            }

        })
    }).catch(err=>{
        console.error('请开启服务my903-tool',);
    })

}