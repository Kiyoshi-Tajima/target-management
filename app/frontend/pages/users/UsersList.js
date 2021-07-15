import { any } from "prop-types";
import React from "react"
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const UsersList = (props) => {
  const userList = props.users;
  const history = useHistory();

  return (
    <div>
      {
        userList.map((user, idx) => (
          <div key={idx}>
            <label>{user.id}</label>
            <label>{user.user_name}</label>
            <label>{user.email}</label>
            <label>{user.authority}</label>
            <Button 
              type="button"
              variant="contained" 
              color="primary"
              onClick={() => { history.push(`/users/${user.id}`) }}
            >
              詳細
            </Button>
          </div>
        ))
      }
    </div>
  );
}
// 何故かTSが邪魔しているので
UsersList.propTypes = {
  users: any
}


export default React.memo(UsersList);
