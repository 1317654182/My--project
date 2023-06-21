// utils.js
// 默认域名请求函数
export function getUrl(url) {
    const baseUrl = process.env.VUE_APP_URL + url;
    return baseUrl
}
//详情信息拼接链接
export function getUrls(docid,flowTable) {
    const baseUrl = process.env.VUE_APP_URL+"/appForm/OpenForm?fromid="+flowTable+"&docid="+docid;
    return baseUrl
}

//路由跳转封装
export function goToPage(item, router) {
    let routeData = router.resolve({
        name: "ViewApplication",
        query: {
            title: item.title,
            viewName: item.viewName,
            flowTable: item.flowTable,
            xinjian: item.xinjian
        }
    })
    //必要操作，否则不会打开新页面
    window.open(routeData.href, '_blank');
}