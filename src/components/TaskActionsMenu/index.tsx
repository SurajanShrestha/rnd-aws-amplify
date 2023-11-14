import { Menu, MenuItem } from "@aws-amplify/ui-react";

interface Props {}

const TaskActionMenu = ({}: Props) => {
  return (
    <Menu menuAlign="start" size="small">
      <MenuItem onClick={() => alert("Edit")}>Edit</MenuItem>
      <MenuItem isDisabled={false} onClick={() => alert("Delete")}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default TaskActionMenu;
