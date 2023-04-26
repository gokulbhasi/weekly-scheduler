import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Scheduler from "../pages/home/Scheduler"
import NotFound from "../pages/notfound/NotFound"

import RouteConfig from "./RouteConfig"

const AppRoute = () => {
  return (
    <Router>
      <div className="container">
          <Routes>
            <Route path={RouteConfig.home.path} element={<Scheduler />} />
            <Route element={<NotFound />} />
          </Routes>
      </div>
    </Router>
  )
}

export default AppRoute

/*

*/
