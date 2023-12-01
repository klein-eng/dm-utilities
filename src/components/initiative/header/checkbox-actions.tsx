import { Stack, Checkbox, Input, Button } from "@mui/joy";
import { Actor } from "../actor-list/actor";
import { ChangeEventHandler } from "react";
import { HeartBroken } from "@mui/icons-material";

export interface CheckboxActionsProps {
  actors: Actor[];
  onParentCheckboxChanged: ChangeEventHandler<HTMLInputElement>;
}

export function CheckboxActions({
  actors,
  onParentCheckboxChanged,
}: CheckboxActionsProps) {
  let allActorsSelected = (): boolean => {
    if (actors.length == 0) {
      return false;
    }
    for (let i = 0; i < actors.length; i++) {
      if (!actors[i].checked) {
        return false;
      }
    }
    return true;
  };

  let mixedSelection = (): boolean => {
    if (actors.length == 0) {
      return false;
    }
    let firstActorStatus = actors[0].checked as boolean;
    for (let i = 0; i < actors.length; i++) {
      if (actors[i].checked !== firstActorStatus) {
        return true;
      }
    }
    return false;
  };

  return (
    <Stack direction="row" gap={2} sx={{ pl: 2, pt: 1 }}>
      <Checkbox
        checked={allActorsSelected()}
        indeterminate={mixedSelection()}
        sx={{ pl: 2, pt: 1 }}
        onChange={onParentCheckboxChanged}
        color={mixedSelection() ? "danger" : "primary"}
      />
      <Input
        type="number"
        endDecorator={<HeartBroken />}
        sx={{ maxWidth: 150 }}
      />
      <Button color="primary">Apply Damage</Button>
      <Button color="danger" variant="soft">
        Delete
      </Button>
    </Stack>
  );
}
