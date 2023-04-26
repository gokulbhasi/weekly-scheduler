import React, { Component } from "react"
import { connect } from "react-redux"

import { clearSchedule, getSchedule, undoSchedule, redoSchedule } from "../../store/actions/schedulerActions"
import ShiftSelector from "../../components/shifts/shiftSelector"
import Schedule from "../../components/schedule/Schedule"

class Scheduler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      clear: false,
      id: '',
      isSubmitted: false
    }
  }

  clear = () => {
    this.props.clearSchedule(this.state.id)
    this.setState({clear: true})
  }
  
  handleChange= (e) => {
    this.setState({id: e.target.value})
  }

  handleSubmit= (e) => {
    e.preventDefault()
    this.setState({isSubmitted: true})
    this.props.getSchedule(this.state.id)
  }

  undo = () => this.props.undoSchedule()
  redo = () => this.props.redoSchedule()

  render() {
    // undo button logic
    const isUserPresent = (this.state.id && this.state.isSubmitted)
    const isUndoPossible = !(this.props.pastSchedule && this.props.pastSchedule.length > 0 && isUserPresent) 
    const isRedoPossible = !(this.props.futureSchedule && this.props.futureSchedule.length > 0 && isUserPresent)
    return (
      <div className="container ">
        <div className = "header">Weekly Scheduler</div>
        <div className="content-start">
          <h3 className="subheading">Schedule</h3>
          <div className="userInput">
            <div className="leftNote">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Unique ID: 
                  <input className="idInput" type="text" value={this.state.id} onChange={this.handleChange} />
                </label>
                <input  className="idSubmit" type="submit" value="Submit" />
              </form>
            </div>
            <div className="leftNote">
              <button className="clearBtn" onClick={this.undo} hidden={isUndoPossible}>Undo</button>
            </div>
            <div className="rightNote">
              <button className="clearBtn" onClick={this.redo} hidden={isRedoPossible}>Redo</button>
            </div>
            <div className="rightNote">Min Staffs Needed: 
              <b>{Math.ceil((this.props.days.length*this.props.shifts.length)/7)}</b>
              <button className="clearBtn" onClick={this.clear}>Clear</button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                {this.props.days.map((day, i) => <th key={i}>{ day}</th>)}
              </tr>
            </thead>
            <tbody>
              {this.props.shifts.map((shift, i) =>
                <tr key={i}>
                  <td>{shift}</td>
                  {this.props.days.map((day, i) => 
                    <td key={i}><ShiftSelector id={this.state.id} isSubmitted={this.state.isSubmitted} shift={shift} day={day} dayNo={i} clear={this.state.clear} updatedSchedule={this.props.schedule} /></td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="content-start">
          <h3 className="subheading">Load</h3>
          <Schedule />
        </div>
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
    pastSchedule: state.weeklyScheduler.pastSchedule,
    futureSchedule: state.weeklyScheduler.futureSchedule
  }
}

export default connect(
  mapStateToProps,
  { clearSchedule, getSchedule, undoSchedule, redoSchedule }
)(Scheduler)
