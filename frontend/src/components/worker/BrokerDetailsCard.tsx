import DetailItem from "@components/common/DetailItem"
import Panel from "@components/common/Panel"
import useWorkerState from "@hooks/useWorkerState"
import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import ListItemIcon from "@mui/material/ListItemIcon"
import Tooltip from "@mui/material/Tooltip"
import { formatSecondsDuration } from "@utils/formatSecondsDuration"
import { StateWorker } from "@utils/translateServerModels"
import React from "react"

interface BrokerDetailsCardProps {
    worker: StateWorker
}

const BrokerDetailsCard: React.FC<BrokerDetailsCardProps> = ({ worker }) => {
    const { stats } = useWorkerState(worker)
    return (
        <Panel title="Broker">
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <DetailItem
                        label="Hostname"
                        value={
                            <Box display="flex" alignItems="center">
                                {stats?.broker.hostname}
                                <Tooltip title={stats?.broker.ssl ? "SSL Enabled" : "SSL Disabled"}>
                                    <ListItemIcon sx={{ px: 1 }}>
                                        {stats?.broker.ssl ? (
                                            <LockIcon fontSize="small" color="success" />
                                        ) : (
                                            <LockOpenIcon fontSize="small" color="error" />
                                        )}
                                    </ListItemIcon>
                                </Tooltip>
                            </Box>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DetailItem label="Port" value={stats?.broker.port} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DetailItem label="Transport" value={stats?.broker.transport} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DetailItem label="User ID" value={stats?.broker.userid} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DetailItem label="Timeout" value={stats?.broker.connection_timeout ?? "Unlimited"} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DetailItem
                        label="Heartbeat Interval"
                        value={formatSecondsDuration(stats?.broker.heartbeat || 0)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DetailItem label="Login Method" value={stats?.broker.login_method} />
                </Grid>
            </Grid>
        </Panel>
    )
}

export default BrokerDetailsCard
