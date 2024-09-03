import React from "react"

const Home =  React.lazy(()=> import("~/pages/Home"))

export const publicPath = [
    {pathname:'/',Element: Home}
]

export const privatePath = []

