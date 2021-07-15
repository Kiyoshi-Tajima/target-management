
// 本来ならコンポーネントを生成するものだが
// 今はコンディションとメッセージを返すのみ
// 何ならエラーメッセージを表示するコンポーネントをココで生成して
// 返却するものあり
export const getErrorCondition = (state, fieldName) => {
  const error = state[fieldName];

  if (typeof error === "undefined") {
    return false;
  } else if (state[fieldName]) {
    return true;
  }
  return false;
}
export const getErroMessage = (state, fieldName) => {
  return state[fieldName]
}
