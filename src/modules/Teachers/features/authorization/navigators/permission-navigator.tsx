import { Route, Routes } from "react-router-dom"
import { PermissionList, PermissionView } from "../screens"
import { FC } from "react"


export const PermissionNavigator:FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PermissionList />} />
            <Route path="/:id" element={<PermissionView />} />
        </Routes>
    )
}