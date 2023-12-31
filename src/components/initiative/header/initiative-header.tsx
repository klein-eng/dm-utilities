import {
  Cached,
  Delete,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MenuOutlined,
  Redo,
  Save,
  Undo,
} from "@mui/icons-material";
import {
  Sheet,
  Stack,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Divider,
  ListItemDecorator,
} from "@mui/joy";

export interface initiativeHeaderProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export function InitiativeHeader({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: initiativeHeaderProps) {
  return (
    <Sheet sx={{ px: 2, py: 1 }} color="primary" variant="solid" invertedColors>
      <Stack direction="row" justifyContent="space-between">
        <Dropdown>
          <MenuButton>
            <MenuOutlined />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => onUndo()} disabled={!canUndo}>
              <ListItemDecorator>
                <Undo />
              </ListItemDecorator>
              Undo
            </MenuItem>
            <MenuItem onClick={() => onRedo()} disabled={!canRedo}>
              <ListItemDecorator>
                <Redo />
              </ListItemDecorator>
              Redo
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemDecorator>
                <Cached />
              </ListItemDecorator>
              Restore Defaults
            </MenuItem>
            <MenuItem>
              <ListItemDecorator>
                <Save />
              </ListItemDecorator>
              Set as Default
            </MenuItem>
            <Divider />
            <MenuItem color="danger">
              <ListItemDecorator>
                <Delete />
              </ListItemDecorator>
              Clear All
            </MenuItem>
          </Menu>
        </Dropdown>
        <Typography level="h3">DM Utilities - Initiative Tracker</Typography>
        <Stack direction="row" gap={1}>
          <Button variant="outlined" startDecorator={<KeyboardArrowLeft />}>
            Previous
          </Button>
          <Button variant="solid" endDecorator={<KeyboardArrowRight />}>
            Next
          </Button>
        </Stack>
      </Stack>
    </Sheet>
  );
}
