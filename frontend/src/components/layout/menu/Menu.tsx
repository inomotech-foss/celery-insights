import WorkerStatusList from "@components/layout/menu/WorkerStatusList"
import ApiIcon from "@mui/icons-material/Api"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import InboxIcon from "@mui/icons-material/Inbox"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import SubjectIcon from "@mui/icons-material/Subject"
import { useMediaQuery, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import Fade from "@mui/material/Fade"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import useSettingsStore from "@stores/useSettingsStore"
import React, { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

export const DRAWER_WIDTH = 240
export const DRAWER_WIDTH_COLLAPSED = 72

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "fixed",
        whiteSpace: "nowrap",
        width: DRAWER_WIDTH,
        transition: theme.transitions.create("width"),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width"),
            width: DRAWER_WIDTH_COLLAPSED,
        }),
    },
}))

const StyledLogoContainer = styled(Link)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    textDecoration: "none",
})

const StyledLogo = styled(Box)({
    width: "70px",
    height: "70px",
    backgroundColor: "white",
    borderRadius: "10px",
})

interface MenuLink {
    label: string
    icon: React.ReactElement
    to: string
    external: boolean
}

const menuLinks: MenuLink[] = [
    {
        label: "Home",
        icon: <InboxIcon />,
        to: "/",
        external: false,
    },
    {
        label: "Tasks Explorer",
        icon: <ManageSearchIcon />,
        to: "/explorer",
        external: false,
    },
    {
        label: "API Explorer",
        icon: <ApiIcon />,
        to: "/docs",
        external: true,
    },
    {
        label: "API Docs",
        icon: <SubjectIcon />,
        to: "/redoc",
        external: true,
    },
]

const Menu: React.FC = () => {
    const location = useLocation()
    const expanded = useSettingsStore((state) => state.menuExpanded)
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    useEffect(() => {
        if (smallScreen) useSettingsStore.setState({ menuExpanded: false })
    }, [smallScreen])

    return (
        <StyledDrawer variant="permanent" open={expanded}>
            <StyledLogoContainer to="/">
                <StyledLogo />
            </StyledLogoContainer>
            <List component="nav" sx={{ flexGrow: 1 }}>
                {menuLinks.map((link, index) => (
                    <ListItem key={index} disablePadding sx={{ display: "block" }}>
                        <Tooltip
                            title={link.label}
                            placement="right"
                            disableHoverListener={expanded}
                            arrow
                            describeChild
                        >
                            <ListItemButton
                                selected={link.to === location.pathname}
                                component={link.external ? "a" : Link}
                                to={link.to}
                                target={link.external ? "_blank" : ""}
                                rel={link.external ? "noopener noreferrer" : ""}
                                sx={{
                                    justifyContent: expanded ? "initial" : "r",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        mr: expanded ? 3 : "auto",
                                        justifyContent: "r",
                                    }}
                                >
                                    {link.icon}
                                </ListItemIcon>
                                <Fade in={expanded}>
                                    <ListItemText primary={link.label} />
                                </Fade>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <Collapse in={expanded} unmountOnExit>
                <WorkerStatusList />
            </Collapse>
            <Divider />
            <ListItem disablePadding>
                <Tooltip title={expanded ? "Collapse menu" : "Expand menu"} placement="right" arrow>
                    <ListItemButton
                        onClick={() => useSettingsStore.setState({ menuExpanded: !expanded })}
                        sx={{ display: "flex", justifyContent: expanded ? "flex-end" : "center" }}
                    >
                        {expanded ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </ListItemButton>
                </Tooltip>
            </ListItem>
        </StyledDrawer>
    )
}

export default Menu
