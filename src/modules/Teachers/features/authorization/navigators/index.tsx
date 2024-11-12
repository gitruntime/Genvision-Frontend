import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import { GroupNavigator } from "./group-navigator"
import { PermissionNavigator } from "./permission-navigator"

export const AuthorizationNavigator:FC = () => {
    return (
        <Routes>
            <Route path="/groups/*" element={<GroupNavigator />} />
            <Route path="/permissions/*" element={<PermissionNavigator />} />
        </Routes>
    )
}