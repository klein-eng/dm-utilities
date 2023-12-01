import "./App.css";
import { Box, Button, CssVarsProvider, Grid, Modal, Stack } from "@mui/joy";
import { InitiativeHeader } from "./components/initiative/header/initiative-header";
import { ChangeEventHandler, useState } from "react";
import { Actor } from "./components/initiative/actor-list/actor";
import { ActorCard } from "./components/initiative/actor-list/actor-card";
import { Flipper, Flipped } from "react-flip-toolkit";
import { CheckboxActions } from "./components/initiative/header/checkbox-actions";
import { NewActorDialog } from "./components/new-actor-modal/new-actor-dialog";

function App() {
  const [actors, setActors] = useState(getDefaultActors());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [keyIndex] = useState(0);

  function getDefaultActors(): Actor[] {
    return [
      {
        actorKey: "testKey",
        initiative: 10,
        displayName: "Test",
        checked: false,
        curHitPoints: 12,
        maxHitPoints: 20,
      },
      {
        actorKey: "test2",
        initiative: 5,
        displayName: "Test2",
        checked: false,
      },
    ];
  }

  let addActors = (newActors: Actor[]): void => {
    let actorsCopy = actors.concat(newActors);
    actorsCopy.sort(sortingFunction);
    setActors(actorsCopy);
  };

  let sortActors = (): void => {
    let actorsCopy = [...actors];
    actorsCopy.sort(sortingFunction);
  };

  let sortingFunction = (a: Actor, b: Actor): number => {
    if (a.initiative === b.initiative) {
      return 0;
    } else if (a.initiative > b.initiative) {
      return -1;
    } else {
      return 1;
    }
  };

  let onActorChecked = (actorKey: string, checked: boolean): void => {
    let actorsCopy = [...actors];
    let actorIndex = actorsCopy.findIndex((a) => a.actorKey === actorKey);
    actorsCopy[actorIndex].checked = checked;
    setActors(actorsCopy);
  };

  let onActorNameChanged = (actorKey: string, displayName: string): void => {
    let actorsCopy = [...actors];
    let actorIndex = actorsCopy.findIndex((a) => a.actorKey === actorKey);
    actorsCopy[actorIndex].displayName = displayName;
    setActors(actorsCopy);
  };

  let onActorInitiativeChanged = (
    actorKey: string,
    initiative: number
  ): void => {
    let actorsCopy = [...actors];
    let actorIndex = actorsCopy.findIndex((a) => a.actorKey === actorKey);
    actorsCopy[actorIndex].initiative = initiative;
    actorsCopy.sort(sortingFunction);
    setActors(actorsCopy);
  };

  let onActorDeleted = (actorKey: string): void => {
    setActors(actors.filter((actor) => actor.actorKey !== actorKey));
  };

  let onParentCheckboxChanged: ChangeEventHandler<HTMLInputElement> = () => {
    if (actors.every((actor) => actor.checked === false)) {
      checkAllActors(true);
    } else {
      checkAllActors(false);
    }
  };

  let checkAllActors = (value: boolean) => {
    let actorsCopy = [...actors];
    actorsCopy.forEach((actor) => (actor.checked = value));
    setActors(actorsCopy);
  };

  sortActors();

  return (
    <CssVarsProvider defaultMode="dark">
      <Box>
        <Stack spacing={1}>
          <InitiativeHeader />
          <CheckboxActions
            actors={actors}
            onParentCheckboxChanged={onParentCheckboxChanged}
          />
          <Stack sx={{ px: 2, pt: 1 }} gap={2}>
            <Flipper flipKey={actors.map((actor) => actor.actorKey).join("")}>
              {actors.map((actor) => (
                <Flipped flipId={actor.actorKey} key={actor.actorKey}>
                  <div>
                    <Box sx={{ mb: 2 }}>
                      <ActorCard
                        onActorChecked={onActorChecked}
                        onActorNameChanged={onActorNameChanged}
                        onActorInitiativeChanged={onActorInitiativeChanged}
                        onActorDeleted={onActorDeleted}
                        {...actor}
                      />
                    </Box>
                  </div>
                </Flipped>
              ))}
              <Flipped flipId="add_new_button">
                <div>
                  <Grid container justifyContent="center">
                    <Button
                      onClick={() => setDialogOpen(true)}
                      variant="solid"
                      color="primary"
                      sx={{ minWidth: 0.5, borderRadius: 15 }}
                    >
                      Add New
                    </Button>
                  </Grid>
                </div>
              </Flipped>
            </Flipper>
            <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <NewActorDialog keyIndex={keyIndex} onSubmit={addActors} />
            </Modal>
          </Stack>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
