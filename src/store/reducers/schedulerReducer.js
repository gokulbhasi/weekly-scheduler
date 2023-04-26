import {
  SCHEDULER_LOADING_DATA,
  SCHEDULER_DATA_DID_LOAD,
  SCHEDULER_DATA_DID_CLEAR,
  SCHEDULER_DATA_DID_FAIL_TO_LOAD,
  SCHEDULER_UNDO,
  SCHEDULER_REDO
} from "../actions/types"

const INITIAL_STATE = {
  loading: false,
  schedule: [],
  pastSchedule:[],
  futureSchedule:[],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  shifts: ["Morning UpStairs","Morning Down Stairs", "Morning Parking Lot",
    "Lunch A", "Lunch B", "Lunch C", "Lunch D", "Afternoon Up Stairs",
    "Afternoon Down Stairs", "Afternoon Parking Lot"],
  staffs: ["X1", "X2", "X3", "X4", "X5", "X6", "X7"],
  disableStaffForSession: [],
  shiftsPerStaff: {}
}

const schedulerReducer= (state = INITIAL_STATE, action) => {
  const { pastSchedule, schedule, futureSchedule } = state

  switch (action.type) {
    case SCHEDULER_LOADING_DATA: {
      return { ...state, loading: true }
    }
    case SCHEDULER_DATA_DID_FAIL_TO_LOAD: {
      return { ...state, loading: false }
    }
    case SCHEDULER_DATA_DID_LOAD: {
      const newSchedule= action.payload.schedule

      // restricting selections: Employee cannot be at 2 places in a shift
      const disableStaffForSession = findDisableStaffForSession(state, newSchedule)

      // employee cannot have more than 2 shifts per day
      let shiftsPerStaff = findShiftsPerStaff(state, newSchedule)
      return {
        ...state,
        schedule: newSchedule, // current schedules
        disableStaffForSession, // to disable wrt Rules.
        shiftsPerStaff, // shifts per staff according to current schedule => to restrict shifts.
        loading: false,
        pastSchedule: [...pastSchedule, schedule],// older schedules + last schedule
        futureSchedule: [] // undo'd schedules => to store schedules for redo
      }
    }
    case SCHEDULER_DATA_DID_CLEAR: {
      // employee cannot have more than 2 shifts per day
      let shiftsPerStaffZero = {}
      state.staffs.forEach((staff) => {
        const perDay = {}
        state.days.forEach((day, dayNo) => {
          perDay[dayNo]= 0
        })
        shiftsPerStaffZero[staff]= perDay
      })
      return {
        ...INITIAL_STATE,
        shiftsPerStaff: shiftsPerStaffZero, 
        loading: false
      }
    }
    case SCHEDULER_UNDO: {
      // restricting selections: Employee cannot be at 2 places in a shift
      const disableStaffForSession = findDisableStaffForSession(state, schedule)

      // employee cannot have more than 2 shifts per day
      let shiftsPerStaff = findShiftsPerStaff(state, schedule)
      return {
        ...state,
        schedule: pastSchedule[pastSchedule.length - 1],
        pastSchedule: pastSchedule.slice(0, pastSchedule.length - 1),
        futureSchedule: [schedule, ...futureSchedule],
        disableStaffForSession, // to disable wrt Rules.
        shiftsPerStaff, // shifts per staff according to current schedule => to restrict shifts.
        loading: false
      }
    }
    case SCHEDULER_REDO: {
      // restricting selections: Employee cannot be at 2 places in a shift
      const disableStaffForSession = findDisableStaffForSession(state, schedule)

      // employee cannot have more than 2 shifts per day
      let shiftsPerStaff = findShiftsPerStaff(state, schedule)
      return {
        ...state,
        schedule: futureSchedule[0],
        pastSchedule: [...pastSchedule, schedule],
        futureSchedule: futureSchedule.slice(1),
        disableStaffForSession, // to disable wrt Rules.
        shiftsPerStaff, // shifts per staff according to current schedule => to restrict shifts.
        loading: false
      }
    }
    default: {
      // employee cannot have more than 2 shifts per day
      let shiftsPerStaffDef = {}
      state.staffs.forEach((staff) => {
        const perDay = {}
        state.days.forEach((day, dayNo) => {
          const count =INITIAL_STATE.schedule?.length ? schedule.filter((data) => data.staff === staff && data.day === dayNo).length : 0
          perDay[dayNo]= count
        })
        shiftsPerStaffDef[staff]= perDay
      })
      return {
        ...state,
        shiftsPerStaff: shiftsPerStaffDef, 
        loading: false
      }
    }
  }
}

const findDisableStaffForSession = (state, schedule) => {
  // restricting selections: Employee cannot be at 2 places in a shift
  const morningSessions = []
  const lunchSessions = []
  const afternoonSessions = []
  state.shifts.forEach(shift => {
    if (shift.startsWith('Morning')) morningSessions.push(shift)
    if (shift.startsWith('Lunch')) lunchSessions.push(shift)
    if (shift.startsWith('Afternoon')) afternoonSessions.push(shift)
  })
  const disableStaffForSession = []
  schedule.forEach(one => {
    const session = one.shift.split(' ', 2)
    const disabledSessions = []
    switch(session[0]?.toLowerCase()) {
      case 'morning' : morningSessions?.forEach((x) => { if(x !== one.shift) disabledSessions.push(x) })
      break
      case 'lunch' : lunchSessions?.forEach((x) => { if(x !== one.shift) disabledSessions.push(x) })
      break
      case 'afternoon' : afternoonSessions?.forEach((x) => { if(x !== one.shift) disabledSessions.push(x) })
      break
      default:
    }
    disabledSessions.length > 0 && disabledSessions?.map(ds => disableStaffForSession.push({
      session: ds,
      day: one.day,
      staff: one.staff
    }))
  })
  return disableStaffForSession
}

const findShiftsPerStaff = (state, schedule) => {
  
  let shiftsPerStaff = {}
  state.staffs.forEach((staff) => {
    const perDay = {}
    state.days.forEach((day, dayNo) => {
      const count =schedule?.length ? schedule.filter((data) => data.staff === staff && data.day === dayNo).length : 0
      perDay[dayNo]= count
    })
    shiftsPerStaff[staff]= perDay
  })
  return shiftsPerStaff
}

export default schedulerReducer