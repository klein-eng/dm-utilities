import { Stack, Checkbox, Input, Button } from "@mui/joy";
import { Actor } from "../actor-list/actor";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { HeartBroken } from "@mui/icons-material";

export interface CheckboxActionsProps {
  actors: Actor[];
  onParentCheckboxChanged: () => void;
  onApplyDamageClicked: (damageAmount: number) => void;
  onDeleteClicked: () => void;
}

export function CheckboxActions({
  actors,
  onParentCheckboxChanged,
  onApplyDamageClicked,
  onDeleteClicked,
}: CheckboxActionsProps) {
  let [damageAmount, setDamageAmount] = useState((): number | null => null);

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

  let onDamageInputChanged: ChangeEventHandler<HTMLInputElement> = (_e) => {
    let newDamageAmount = _e.target.valueAsNumber;
    if (!Number.isNaN(newDamageAmount)) {
      setDamageAmount(newDamageAmount);
    } else {
      setDamageAmount(null);
    }
  };

  let onCheckboxChanged: ChangeEventHandler<HTMLInputElement> = (_e) => {
    onParentCheckboxChanged();
  };

  let onDamageClicked: MouseEventHandler<HTMLAnchorElement> = (_e) => {
    if (damageAmount !== null) {
      onApplyDamageClicked(damageAmount);
    }
  };

  let onDeleteButtonClicked: MouseEventHandler<HTMLAnchorElement> = (_e) => {
    onDeleteClicked();
  };

  return (
    <Stack direction="row" gap={2} sx={{ pl: 2, pt: 1 }}>
      <Checkbox
        checked={allActorsSelected()}
        indeterminate={mixedSelection()}
        sx={{ pl: 2, pt: 1 }}
        onChange={onCheckboxChanged}
        color={mixedSelection() ? "danger" : "primary"}
      />
      <Input
        type="number"
        onChange={onDamageInputChanged}
        endDecorator={<HeartBroken />}
        sx={{ maxWidth: 150 }}
      />
      <Button
        color="primary"
        variant="soft"
        onClick={onDamageClicked}
        disabled={damageAmount === null}
      >
        Apply Damage
      </Button>
      <Button color="danger" variant="soft" onClick={onDeleteButtonClicked}>
        Delete
      </Button>
    </Stack>
  );
}
