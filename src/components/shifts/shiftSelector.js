import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadData } from "../../store/actions/schedulerActions"
  
class ShiftSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      staff: ''
    }
    this.staffsDisabled = []
  }

  handleChange = (event) => {
    if(this.props.id === '') alert('Please add a unique username.')
    else if(this.props.isSubmitted === false) alert('Please click submit button')
    else {
      // handle input selection
      var val = event.target.value
      const selectedShiftData = {
        staff: val,
        shift: this.props.shift,
        day: this.props.dayNo
      }
      // calling api to save to schedule
      this.props.loadData(this.props.id, [{...selectedShiftData}], this.state.staff ? {staff: this.state.staff, shift:this.props.shift, day: this.props.dayNo} : {}, this.props.schedule ) // (userId, selectedData, Previous data to be removed from schedule, current schedule bfore selection)
      this.setState((state) => ({...state, staff: val }))
    }
  }

  static getDerivedStateFromProps(props, state) {
    // handling selected staff inputs
    if (props.schedule?.length > 0 ) {
      let staff = ''
      props.schedule.forEach(sch => {
        if (sch.shift === props.shift && sch.day === props.dayNo) {staff= sch.staff}
      })
      if (staff !== '') return {staff}
      else return {staff: ''}
    } else if (props.schedule?.length === 0 && state.staff !== '') return {staff: ''}
    else return null
  }

  render() {
    // this.required = false
    this.staffsDisabled = []
    this.props.disableStaffForSession && this.props.disableStaffForSession.length > 0 && this.props.disableStaffForSession?.forEach(sessionCombo => {
      if (sessionCombo.session === this.props.shift && sessionCombo.day === this.props.dayNo) {
        // this.required= true
        this.staffsDisabled.push(sessionCombo.staff)
      }
    })

    var className = this.state.staff !== '' ? 'selected' : ''
    return (
      <select
      className={className}
      name="staff"
      id="staff"
      value={this.state.staff} 
      onChange={this.handleChange}
      size = "1"
      >
        <option hidden>Select</option>
        {this.props?.staffs && this.props?.staffs?.map((staffOption, i) => 
          {
            const doneForTheSession = this.staffsDisabled.includes(staffOption) // one staff can be present at one place at a time logic
            const doneForTheDay = this.props.shiftsPerStaff[staffOption][this.props.dayNo] >= 2 // one staff can be have only 2 shifts per day logic
            const doneForTheWeek = Object.values(this.props.shiftsPerStaff[staffOption]).reduce((a, b) => a + b, 0) >=7 // one staff can be have only 7 shifts per week logic
            return <option key={i} value={staffOption} disabled={doneForTheSession || doneForTheDay || doneForTheWeek}>
              { staffOption }
            </option>
          }
        )}
      </select>
    )
  }
}

const mapStateToProps = state => {
    return {
      loading: state.weeklyScheduler.loading,
      schedule: state.weeklyScheduler.schedule,
      staffs: state.weeklyScheduler.staffs,
      disableStaffForSession: state.weeklyScheduler.disableStaffForSession,
      shiftsPerStaff: state.weeklyScheduler.shiftsPerStaff
    }
  }
  
  export default connect(
    mapStateToProps,
    { loadData }
  )(ShiftSelector)
