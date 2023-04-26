import {
  SCHEDULER_LOADING_DATA,
  SCHEDULER_DATA_DID_LOAD,
  SCHEDULER_DATA_DID_CLEAR,
  SCHEDULER_DATA_DID_FAIL_TO_LOAD,
  SCHEDULER_UNDO,
  SCHEDULER_REDO
} from "./types"

import saveScheduleApi from "../../networking/apis/saveScheduleApi"
import getScheduleApi from "../../networking/apis/getScheduleApi"

export const loadData = (id, addedSchedule, removeSchedule, schedules) => {
  return async (dispatch, getState) => {
    const state = getState()
    if (state.weeklyScheduler.loading) return

    dispatch(loadingDidStart())
    // api call
      //removing overwritten values
    const updatedSchedule = schedules.filter(schedule => !(removeSchedule?.staff === schedule.staff && removeSchedule?.shift === schedule.shift && removeSchedule?.day === schedule.day))
    const schedule= [...updatedSchedule,...addedSchedule] // removed old selection, added new selection
    const save = await saveScheduleApi(id, schedule) // save to db
    
    if (save.status) {
      const response = {
        schedule: save?.data?.schedule // updated schedule
      }
      return dispatch(dataDidLoad(response))
    } else return dispatch(dataDidFailToLoad())
  }
}

export const clearSchedule = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    if (state.weeklyScheduler.loading) return

    dispatch(loadingDidStart())
    // api call
    if (id) {
      const save = await saveScheduleApi(id, [])
      if (save.status) return dispatch(dataDidClear())
      else return dispatch(dataDidFailToLoad())
    } else return dispatch(dataDidClear())
  }
}

export const undoSchedule = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    if (state.weeklyScheduler.loading) return

    dispatch(loadingDidStart())
    return dispatch(undoData())
  }
}

export const redoSchedule = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    if (state.weeklyScheduler.loading) return

    dispatch(loadingDidStart())
    return dispatch(redoData())
  }
}


export const getSchedule = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    if (state.weeklyScheduler.loading) return

    dispatch(loadingDidStart())
    // api call
    const get = await getScheduleApi(id)
    
    if (get.status) {
      const response = {
        schedule: get?.data?.schedule,
        removeSchedule: {}
      }
      return dispatch(dataDidLoad(response))
    } else return dispatch(dataDidFailToLoad())
  }
}

const dataDidFailToLoad = () => ({
  type: SCHEDULER_DATA_DID_FAIL_TO_LOAD
})
const dataDidLoad = data => ({
  type: SCHEDULER_DATA_DID_LOAD,
  payload: data
})
const dataDidClear = () => ({
  type: SCHEDULER_DATA_DID_CLEAR
})
const undoData = () => ({
  type: SCHEDULER_UNDO
})
const redoData = () => ({
  type: SCHEDULER_REDO
})
const loadingDidStart = () => ({ type: SCHEDULER_LOADING_DATA })
