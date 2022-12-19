import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { useNavigate } from "react-router"
import { Outlet } from "react-router"
import Header from "./components/Header"
import { pusherInstance } from "./pusher"
import { mapPusherUpdates } from "./slices/pusherSlice"
import { IPusherTriggerData } from "@internal/shared"

const AppOn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, user: loggedUser } = useAppSelector(
    (state) => state?.auth
  )

  const Cards = React.useMemo(() => pusherInstance().subscribe("cards"), [])

  const Collections = React.useMemo(
    () => pusherInstance().subscribe("collections"),
    []
  )

  const Users = React.useMemo(() => pusherInstance().subscribe("users"), [])

  React.useEffect(() => {
    if (!isLoggedIn) return

    Cards.bind("child_updated", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })
    Cards.bind("child_deleted", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })
    Cards.bind("child_added", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })

    Cards.bind("childs_updated", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })

    Collections.bind("child_updated", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })
    Collections.bind("child_deleted", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })
    Collections.bind("child_added", (data: IPusherTriggerData) => {
      return dispatch(mapPusherUpdates(data))
    })

    if (loggedUser?.role === "admin") {
      Users.bind("child_updated", (data: IPusherTriggerData) => {
        return dispatch(mapPusherUpdates(data))
      })
      Users.bind("child_deleted", (data: IPusherTriggerData) => {
        return dispatch(mapPusherUpdates(data))
      })
    }
  }, [Cards, Collections, Users, loggedUser, isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
  }, [isLoggedIn])

  return (
    <div className="AppOn">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppOn
