//处理点击笔记,并且返回detail
import { useState } from './useGlobalState'
import { useFetch, prefix } from "./useFetch";
export const useNoteDetail = () => {
    const { globalState, getActiveTab } = useState()
    const getDetail = (id) => {
        return new Promise(async (resolve, reject) => {
            //找出tabs(我的\收藏\点赞)中具体的笔记列表
            let noteItem = globalState.user.notes.value[getActiveTab()]
            //在store中找出笔记的详情
            const note = noteItem.find(item => item.id === id)
            if(!note){
                return reject('笔记不存在')
                
            }
            note.detail = globalState.note.noteDetailMap[id] || null
            if (note.detail) {
                // 添加封面
                note.detail.cover = note.noteCard.cover
                try {
                    let data = await saveNote(note.detail)
                    resolve(note.detail)
                } catch (error) {
                    throw new Error('Network response was not ok');
                    reject(error)
                }
            } else {
                let aElement = document.querySelector('#a_' + id)
                aElement.click()
                setTimeout(() => {
                    let closeBtn = document.querySelector('.note-detail-mask .close-circle')
                    closeBtn && closeBtn.click()
                }, 2000)
                setTimeout(async () => {
                    resolve(await getDetail(id))
                }, 3000)
            }
        })
    }

    const saveNote = (data) => {
        // console.log('>>>>>>',data);
        // console.log('>>>>>>',JSON.stringify(data));
        useFetch({
            url: `${prefix}/note/new`,
            method: 'POST',
            data,
        })
    }
    return {
        getDetail,
        saveNote
    }
}