//获取全局数据的方法 //0-笔记 1-收藏 2-点赞
export const useState = ()=> {
    let tab = '点赞' ////0-笔记 1-收藏 2-点赞
    const getActiveTab = () => {
        return {
            '笔记': 0,
            '收藏': 1,
            '点赞': 2
        }[tab]
    }
    // 获取transform-container元素下的最后一个tab-content-item元素
    const getActiveTabStyle = () => {
        return {
            '笔记': 'first-child',
            '收藏': 'nth-child(2)',
            '点赞': 'last-child'
        }[tab]
    }
    return {
        _window:window,
        globalState:window.__INITIAL_STATE__,
        getActiveTab,
        getActiveTabStyle
    }
}