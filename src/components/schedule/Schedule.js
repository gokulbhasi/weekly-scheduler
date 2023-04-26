import React, { Component } from 'react'
import { connect } from 'react-redux'

class Schedule extends Component {

  render() {
    return (
      <div>
        <table className="table load-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              {this.props.days.map((item, i) => <th key={i}>{ item}</th>)}
              <th>Totals</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.staffs.map((staff, i) =>
                <tr key={i}>
                  <td key={i}>{staff}</td>
                  {
                    this.props.days.map((day, dayNo) => 
                      <td key={day}>{ this.props.schedule.filter((data) => data.staff === staff && data.day === dayNo).length }</td>
                    )
                  }
                  <td>{ this.props.schedule.filter((data) => data.staff === staff).length}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.weeklyScheduler.loading,
    schedule: state.weeklyScheduler.schedule,
    days: state.weeklyScheduler.days,
    shifts: state.weeklyScheduler.shifts,
    staffs: state.weeklyScheduler.staffs,
    disableStaffForSession: state.weeklyScheduler.disableStaffForSession
  }
}

export default connect(
  mapStateToProps,
  {}
)(Schedule)
