import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  ModalDialog,
  Switch,
  Stack,
  Typography,
} from "@mui/joy";
import { Actor } from "../initiative/actor-list/actor";
import { ForwardedRef, forwardRef, useState } from "react";

export interface NewActorDialogProps {
  keyIndex: number;
  onSubmit: (newActors: Actor[]) => void;
}

export const NewActorDialog = forwardRef(
  (props: NewActorDialogProps, ref: ForwardedRef<HTMLElement>) => (
    <Dialog {...props} ref={ref} />
  )
);

interface NewActorDialogPropsWithRef extends NewActorDialogProps {
  ref: ForwardedRef<HTMLElement>;
}

function Dialog({ keyIndex, onSubmit }: NewActorDialogPropsWithRef) {
  let [isPC, setIsPC] = useState(false);

  let createActor = (
    initiative: number,
    displayName: string,
    maxHP?: number
  ): Actor => {
    return {
      actorKey: displayName + keyIndex.toString(),
      initiative: initiative,
      displayName: displayName,
      checked: false,
      isPC: isPC,
      maxHitPoints: maxHP,
      curHitPoints: maxHP,
    };
  };

  return (
    <ModalDialog color={isPC ? "primary" : "neutral"} variant="soft">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          let result: Actor[] = [];

          let init = formData.get("initiative");
          let displayName = formData.get("displayName");
          let maxHP = formData.get("maxHP");

          if (init && displayName) {
            result.push(
              createActor(
                Number.parseFloat(init.toString()),
                displayName.toString(),
                maxHP ? Number.parseInt(maxHP.toString()) : undefined
              )
            );
          }

          onSubmit(result);
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ pb: 2 }}>
          <DialogTitle>Add an actor</DialogTitle>
          <Stack direction="row">
            <Typography sx={{ pr: 1 }}>PC:</Typography>
            <Switch checked={isPC} onChange={() => setIsPC(!isPC)}></Switch>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <FormControl sx={{ pb: 1 }}>
            <FormLabel>Initiative Mod</FormLabel>
            <Input
              name="initiative"
              type="number"
              autoComplete="off"
              sx={{ maxWidth: 125 }}
            />
          </FormControl>
          <FormControl sx={{ pb: 1 }}>
            <FormLabel>Max HP</FormLabel>
            <Input
              name="maxHP"
              type="number"
              autoComplete="off"
              sx={{ maxWidth: 125 }}
            />
          </FormControl>
        </Stack>

        <FormControl sx={{ pb: 1 }}>
          <FormLabel>Name</FormLabel>
          <Input name="displayName" autoComplete="off" />
        </FormControl>

        <Box sx={{ pt: 2 }}>
          <Button type="submit">Add</Button>
        </Box>
      </form>
    </ModalDialog>
  );
}
