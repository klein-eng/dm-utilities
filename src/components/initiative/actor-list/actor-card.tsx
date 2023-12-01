import {
  Card,
  Checkbox,
  Stack,
  Input,
  Typography,
  Menu,
  Dropdown,
  MenuButton,
  MenuItem,
  Divider,
  Tooltip,
  Grid,
} from "@mui/joy";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { MenuOutlined } from "@mui/icons-material";

export interface ActorCardProps {
  onActorChecked: (actorKey: string, checked: boolean) => void;
  onActorNameChanged: (actorKey: string, displayName: string) => void;
  onActorInitiativeChanged: (actorKey: string, inititiative: number) => void;
  onActorDeleted: (actorKey: string) => void;
  actorKey: string;
  initiative: number;
  displayName: string;
  checked?: boolean;
  curHitPoints?: number;
  maxHitPoints?: number;
}

export function ActorCard({
  onActorChecked,
  onActorNameChanged,
  onActorInitiativeChanged,
  onActorDeleted,
  actorKey,
  initiative,
  displayName,
  checked,
  curHitPoints,
  maxHitPoints,
}: ActorCardProps) {
  let onCheckboxChanged: ChangeEventHandler<HTMLInputElement> = (_e) => {
    onActorChecked(actorKey, !checked);
  };

  let onDisplayNameChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    onActorNameChanged(actorKey, e.target.value);
  };

  let onInitiativeChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    onActorInitiativeChanged(actorKey, Number.parseFloat(e.target.value));
  };

  let onDeleted: MouseEventHandler<HTMLDivElement> = (_e) => {
    onActorDeleted(actorKey);
  };

  return (
    <Card variant="soft" color="neutral">
      <Grid container direction="row" spacing={2}>
        <Grid>
          <Checkbox
            sx={{ pt: 1 }}
            checked={checked}
            onChange={onCheckboxChanged}
          />
        </Grid>

        <Divider orientation="vertical" />
        <Grid>
          <Tooltip
            title="Initiative"
            placement="bottom-start"
            disableInteractive
          >
            <Input
              value={initiative}
              onChange={onInitiativeChanged}
              type="number"
              sx={{ maxWidth: 80 }}
            />
          </Tooltip>
        </Grid>

        <Grid sm>
          <Input value={displayName} onChange={onDisplayNameChanged} />
        </Grid>

        {curHitPoints != undefined && maxHitPoints != undefined && (
          <Grid sm="auto">
            <Stack direction="row" gap={1}>
              <Typography
                level="h4"
                color={
                  curHitPoints <= maxHitPoints / 4
                    ? "danger"
                    : curHitPoints <= maxHitPoints / 2
                    ? "warning"
                    : undefined
                }
              >
                {curHitPoints}
              </Typography>
              <Typography level="h4">/</Typography>
              <Typography level="h4">{maxHitPoints} HP</Typography>
            </Stack>
          </Grid>
        )}

        <Grid smOffset="auto">
          <Dropdown>
            <MenuButton
              variant="plain"
              color="primary"
              sx={{ justifySelf: "end" }}
            >
              <MenuOutlined />
            </MenuButton>
            <Menu>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Duplicate</MenuItem>
              <MenuItem color="danger" onClick={onDeleted}>
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Grid>
      </Grid>
    </Card>
  );
}
