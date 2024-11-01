import { useState } from './useGlobalState'
const { _window, globalState, getActiveTab, getActiveTabStyle } = useState()
import { getOnlineNoteIds, showNoteBranch } from './utils'
import { UniqueStack } from './useStack'
import { debounce } from "../utils";
import { useNoteDetail } from './useNoteDetail'
const { getDetail } = useNoteDetail()

let autoSaveObserver
let uniqueStack = null
let processStart

//暂停自动保存
export const stopAutoSave = () => {
    if (autoSaveObserver) {
        uniqueStack.clear()
        autoSaveObserver.disconnect()
        // uniqueStack = []
        // autoSaveObserver = null
        _window.removeEventListener('scroll', initAutoObserver)
        processStart = false
    }
}

const getUniqueStack = () => {
    uniqueStack && getOnlineNoteIds().map(id => uniqueStack.push(id))
}
//定义监听器
const initAutoObserver = debounce(getUniqueStack, 500)





export const autoSaveNotes = () => {

    processStart = true

    //开启一个滚动监听,作用是监听在线noteId的变化
    getUniqueStack()
    _window.addEventListener('scroll', initAutoObserver)

    //获取在线的note,推入stack
    uniqueStack = new UniqueStack(getOnlineNoteIds());

    //首次执行循环方法
    processStack(uniqueStack)


}
function getRandomTimeInRange(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('等待', num, '秒');
    return num * 1000;
}

function scrollWin() {
    _window.scroll({
        top: (_window.scrollY || _window.pageYOffset) + 600,
        behavior: 'smooth'  // 可选参数，实现平滑滚动
    });
    setTimeout(() => {
        if (uniqueStack.isEmpty()) {
            scrollWin()
        } else {
            processStack(uniqueStack)
        }
    }, getRandomTimeInRange(2, 10))
}

// 循环取出 ID 并发起请求
async function processStack(stack) {

    if (!processStart) {
        stopAutoSave()
    } else if (!stack.isEmpty()) {
        //取出第一个noteId
        const noteId = stack.shift();
        //执行获取note的逻辑,该方法如果有详情则会自动保存到数据库
        console.log('剩余', stack.size(), noteId);
        let noteDetail = await getDetail(noteId)

        //stack不为空,开始标记是true
        setTimeout(() => {
            processStack(stack)
        }, getRandomTimeInRange(30, 60))
    }
    else {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // 到达页面底部
            stopAutoSave()
        } else {
            scrollWin()
        }
    }
}