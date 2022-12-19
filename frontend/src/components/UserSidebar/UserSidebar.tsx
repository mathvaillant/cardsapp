import React, { useLayoutEffect, useState } from "react"
import CustomSidebar from "../CustomSidebar"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import useDebounceCallback from "../../hooks/useDebounceCallback"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CloudDoneIcon from "@mui/icons-material/CloudDone"
import { Button } from "@mui/material"
import { toastr } from "react-redux-toastr"
import "./UserSidebar.scss"
import { getStateLoggedUser, getStateUserById } from "../../selectors/users"
import UserServices from "../../services/userServices"
import { logout } from "../../slices/authSlice"

const UserSidebar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const userId = params.id || ""

  const stateUserData = useAppSelector(getStateUserById(userId))
  const stateUserLogged = useAppSelector(getStateLoggedUser)

  const [savingChanges, setSavingChanges] = useState(false)
  const [name, setName] = useState(stateUserData?.name)
  const [username, setUsername] = useState(stateUserData?.username)

  useLayoutEffect(() => {
    if (stateUserData) {
      setName(stateUserData?.name)
      setUsername(stateUserData?.username)
    }
  }, [stateUserData])

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true)
    setName(e.target.value)
  }

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true)
    setUsername(e.target.value)
  }

  const handleSaveChanges = async (): Promise<void> => {
    if (!stateUserData || !name || !username) return

    const {
      status,
      message,
      data: updatedUser
    } = await UserServices.updateUser(stateUserData?._id, name, username)

    setSavingChanges(false)
  }

  useDebounceCallback(handleSaveChanges, 1000, [name, username])

  const handleDeleteAccount = () => {
    if (!stateUserData) return

    toastr.confirm("Are you sure?", {
      onOk: async () => {
        await UserServices.deleteUser(stateUserData?._id)

        if (stateUserData._id === stateUserLogged?._id) {
          dispatch(logout())
          return
        }

        toastr.success("Successfully deleted user", "")
        navigate("/home")
      }
    })
  }

  return (
    <CustomSidebar>
      <Box
        className="CollectionSidebar"
        component="form"
        sx={{
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          gap: 5
        }}
      >
        {!stateUserData ? (
          <Typography variant="h4">User Not Found!</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h4">Edit User</Typography>
              <LoadingButton
                className="LoadingButton"
                disabled={true}
                size="small"
                color="secondary"
                loading={savingChanges}
                loadingPosition="start"
                startIcon={<CloudDoneIcon />}
                variant="outlined"
              >
                {savingChanges ? "Saving..." : "Up to date"}
              </LoadingButton>
            </Box>
            <TextField
              sx={{ mt: 2 }}
              id="name"
              onChange={handleChangeName}
              value={name}
              size="small"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              sx={{ mt: 2 }}
              id="username"
              onChange={handleChangeUsername}
              value={username}
              size="small"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
            />
            {stateUserData?.role !== "admin" && (
              <Button
                size="small"
                onClick={handleDeleteAccount}
                variant="outlined"
                sx={{ display: "block", width: "max-content", m: "auto" }}
              >
                Delete account
              </Button>
            )}
          </>
        )}
      </Box>
    </CustomSidebar>
  )
}

export default UserSidebar
