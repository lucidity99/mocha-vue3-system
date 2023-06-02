import { reactive, onMounted } from 'vue'
import system from '~/api/system'
import systemApi from '~/api/system'

export function useDict(dictType: Array<string>) {
  let dicts = reactive<any>({})

  onMounted(() => {
    let ps: Promise<any>[] = []

    dictType.forEach((dt, index) => {
      ps[index] = systemApi.getDicts(dt).then((res) => {
        return { type: dt, values: res }
      })
    })

    Promise.all(ps).then((res) => {
      res.forEach((val) => {
        dicts[val.type] = val.values
      })
    })
  })

  return { dicts }
}
