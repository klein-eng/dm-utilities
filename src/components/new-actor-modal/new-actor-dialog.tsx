import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  ModalDialog,
} from "@mui/joy";
import { Actor } from "../initiative/actor-list/actor";

export interface NewActorDialogProps {
  keyIndex: number;
  onSubmit: (newActors: Actor[]) => void;
}

export function NewActorDialog({ keyIndex, onSubmit }: NewActorDialogProps) {
  let createActor = (
    initiative: number,
    displayName: string,
    maxHP?: number
  ): Actor => {
    return {
      actorKey: displayName + keyIndex.toString(),
      initiative: initiative,
      displayName: displayName,
      maxHitPoints: maxHP,
    };
  };

  return (
    <ModalDialog>
      <DialogTitle>Add an actor</DialogTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          let result: Actor[] = [];
          let init = formData.get("initiative");
          let displayName = formData.get("displayName");
          if (init && displayName) {
            result.push(
              createActor(
                Number.parseFloat(init.toString()),
                displayName.toString()
              )
            );
          }

          onSubmit(result);
        }}
      >
        <FormControl>
          <FormLabel>Initiative Modifier</FormLabel>
          <Input name="initiative" type="number" />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="displayName" />
        </FormControl>
        <FormControl>
          <FormLabel>Max HP</FormLabel>
          <Input name="maxHP" type="number" />
        </FormControl>
        <Button type="submit">Add</Button>
      </form>
    </ModalDialog>
  );
}
