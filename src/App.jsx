import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PrivateRoute } from "components"
// pages
import {
  Login,
  AdminDashboard,
  Coordinator,
  Students,
  EnrollmentModule,
  Organization,
  UpdateCoordinator,
  UpdateStudents,
  UpdateOrganization,
  MasterList,
  Tasks,
  TasksSubmitted,
  UpdateMasterList,
  ManageTasks,
  StudentTasks,
  ViewSubmission,
  UpdateStudentGrade,
  TaskRecord,
  ViewStudentSubmission,
  UpdateEnrollmentModule,
  TaskDescription,
  Message,
} from "./pages"

function App() {
  const linkType = "/admin"

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path={`${linkType}/message`} element={<PrivateRoute />}>
          <Route exact path={`${linkType}/message`} element={<Message />} />
        </Route>

        {/* Administrator Routes */}
        <Route exact path={linkType} element={<PrivateRoute />}>
          <Route exact path={linkType} element={<AdminDashboard />} />
        </Route>
        <Route
          exact
          path={`${linkType}/coordinator`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/coordinator`}
            element={<Coordinator />}
          />
        </Route>
        <Route exact path={`${linkType}/students`} element={<PrivateRoute />}>
          <Route exact path={`${linkType}/students`} element={<Students />} />
        </Route>
        <Route
          exact
          path={`${linkType}/enrollmentModule`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/enrollmentModule`}
            element={<EnrollmentModule />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/organization`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/organization`}
            element={<Organization />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/updateCoordinator`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/updateCoordinator`}
            element={<UpdateCoordinator />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/updateStudents`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/updateStudents`}
            element={<UpdateStudents />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/updateOrganization`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/updateOrganization`}
            element={<UpdateOrganization />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/updateEnrollment`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/updateEnrollment`}
            element={<UpdateEnrollmentModule />}
          />
        </Route>
        {/* Administrator Routes */}

        {/* Coordinator Routes */}
        <Route exact path={`${linkType}/masterList`} element={<PrivateRoute />}>
          <Route
            exact
            path={`${linkType}/masterList`}
            element={<MasterList />}
          />
        </Route>
        <Route exact path={`${linkType}/tasks`} element={<PrivateRoute />}>
          <Route exact path={`${linkType}/tasks`} element={<Tasks />} />
        </Route>
        <Route
          exact
          path={`${linkType}/taskSubmitted`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/taskSubmitted`}
            element={<TasksSubmitted />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/updateMasterList`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/updateMasterList`}
            element={<UpdateMasterList />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/updateTasks`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/updateTasks`}
            element={<ManageTasks />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/view-submission`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/view-submission`}
            element={<ViewSubmission />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/update-grade/:id`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/update-grade/:id`}
            element={<UpdateStudentGrade />}
          />
        </Route>
        {/* Coordinator Routes */}

        {/* Students Routes */}
        <Route
          exact
          path={`${linkType}/studentTasks`}
          element={<PrivateRoute />}
        >
          <Route
            exact
            path={`${linkType}/studentTasks`}
            element={<StudentTasks />}
          />
        </Route>
        <Route exact path={`${linkType}/task-record`} element={<TaskRecord />}>
          <Route
            exact
            path={`${linkType}/task-record`}
            element={<TaskRecord />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/view-submission/:id`}
          element={<ViewStudentSubmission />}
        >
          <Route
            exact
            path={`${linkType}/view-submission/:id`}
            element={<ViewStudentSubmission />}
          />
        </Route>
        <Route
          exact
          path={`${linkType}/view-task`}
          element={<TaskDescription />}
        >
          <Route
            exact
            path={`${linkType}/view-task`}
            element={<TaskDescription />}
          />
        </Route>
        {/* Students Routes */}
      </Routes>
    </Router>
  )
}

export default App
