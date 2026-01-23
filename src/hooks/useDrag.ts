import cloneDeep from 'lodash/cloneDeep'
export function useDrag(current: Ref<number>,
    rightList: Ref<any>) {
    const dragHook = reactive({
        tempItem: {
            right: '',
            flag: 0
        },
        cloneComponent(val: any) {
            let orignal = cloneDeep(val)
            let flag = new Date().getTime()
            dragHook.tempItem = {
                right: orignal.right,
                flag
            }
            return {
                name: orignal.name, data: orignal.data, flag
            }
        },
        onEnd(e:any){
            // console.log(e,'=======左侧拖拽到右侧后的e');
            
            if (e.from !== e.to && dragHook.tempItem !== null) {
                rightList.value.splice(e.newIndex + 1, 0, dragHook.tempItem)
                current.value = e.newIndex + 1
                // console.log('拖拽成功', current, rightList);
                
            }
        }
    })
    return {
        dragHook,
    }
}
