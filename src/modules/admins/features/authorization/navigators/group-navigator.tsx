import { Route, Routes } from "react-router-dom"
import { GroupList, GroupView } from "../screens"
import { FC } from "react"


export const GroupNavigator:FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GroupList />} />
            <Route path="/:id" element={<GroupView />} />
        </Routes>
    )
}