import { useFetch, prefix } from "./useFetch";
import { useNoteDetail } from './useNoteDetail'
import { debounce } from "../utils";
import { useState } from './useGlobalState'
import { useInit } from './useInit'
import {getOnlineNoteIds,showNoteBranch} from './utils'
import { autoSaveNotes,stopAutoSave } from "./autoSave";

export const useNote = () => {
  const { initStyle, initButton } = useInit()
  const { _window, globalState, getActiveTab, getActiveTabStyle } = useState()
  const { getDetail, saveNote } = useNoteDetail()

  let observer = null




  const create = () => {
    initButton(getDetail)
    //查看在线的note
    showNoteBranch()
  }
  initStyle()
  const initObserver = debounce(create,300)
  create()
  _window.addEventListener('scroll', initObserver)

  return {
    autoSaveNotes,
    stopAutoSave,
  }
}
