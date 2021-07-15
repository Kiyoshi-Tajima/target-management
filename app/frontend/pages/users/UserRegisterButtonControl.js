import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const UserRegisterButtonControl = (props) => {
  const history = useHistory();
  const pageMode = props.pageMode;
  const id = props.id;
  const reset = props.reset;
  const useState = props.useState;
  const dispatch = props.dispatch;
  const setDummy = props.setDummy;

  // ボタンコンポーネント
  const showButton = (
    <Button 
      type="button"
      variant="contained" 
      color="primary"
      onClick={async () => {
        setDummy(true);
        // RHFのresetを使用して値を初期化
        await reset();
        dispatch({type: "ERROR_CLEAR"});
        useState("show");
        history.push(`/users/${id}`);
      }}
    >
      詳細に戻る
    </Button>
  );
  const editButton = (
    <Button 
      type="button"
      variant="contained" 
      color="primary"
      onClick={() => { 
        useState("edit");
        history.push(`/users/${id}/edit`);
      }}
    >
      更新する
    </Button>
  );
  const backButton = (
    <Button 
      type="button"
      variant="contained" 
      color="primary"
      onClick={() => { 
        useState("edit");
        history.push(`/users/${id}/edit`);
      }}
    >
      やっぱやめる
    </Button>
  );
  const confirmButton = (
    <Button 
      type="submit"
      variant="contained" 
      color="secondary"
    >
      確認する
    </Button>
  );
  const updateButton = (
    <Button 
      type="submit"
      variant="contained" 
      color="secondary"
    >
      更新！
    </Button>
  );

  if (pageMode === "show") {
    // 詳細画面時
    return (
      <div>
        {editButton}
      </div>
    );
  } else if (pageMode === "edit") {
    // 更新画面時
    return (
      <div>
        {showButton}
        {confirmButton}
      </div>
    );
  } else if (pageMode === "confirm") {
    // 確認画面時
    return (
      <div>
        {backButton}
        {updateButton}
      </div>
    );
  }
}

export default React.memo(UserRegisterButtonControl);