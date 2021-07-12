// 按钮权限筛选
let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export function filterPermissionFn(route, permission) {
    let flag = false;
    userInfo.menuPermissionList.filter((item) => {
        if (item.name == route && item.operateList.length > 0) {
            item.operateList.filter(value => {
                if (value.permission == permission) {
                    flag = true
                }
            })
        }
    })
    return flag
}

// 递归遍历
export function setHandleListb(list) {
    const arr = [];
    list.forEach(item => {
        const tmp = {...item };
        if (tmp.checked) {
            arr.push(tmp.id);
            if (tmp.children) {
                const chirlList = setHandleListb(tmp.children);
                arr.push(tmp.id);
                arr.push(...chirlList);
            } else {
                arr.push(tmp.id);
            }
        }
    })
    return arr;
}