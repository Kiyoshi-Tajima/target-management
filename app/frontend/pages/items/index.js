import React, { useEffect, useReducer } from "react";
import ItemList from "../../components/ItemList"
import axios from "axios";

// 簡単なstateオブジェクトにさせて
const initialState  = {
  items: [],
  loading: false,
  fatal: false,
};

const reducer = (state, action) => {
  switch (action.type){
    case 'GET_ITEM_ALL':
      return {...state,
        items: action.payload,
        fatal: false,
      }
    default:
      return state;
  }
}

const Items = () => {

  const [itemState, dispatch] = useReducer(reducer, initialState)

  console.log('#### Items ####');

  // とりあえずデータを取ってくる
  const getItemList = async () => {
    const url = '/items/all';
    
    // データを取得
    await axios.get(url).then(
      (response) => {
        dispatch ({ type: 'GET_ITEM_ALL', payload: response.data.items})
      }
    ).catch(
      (error) => {
        console.log(error.response.status);
        console.log(error.response.data)
      }
    );
  }
  
  // ランディング時に発動
  useEffect(() => {
    getItemList();
  }, [])

  return (
    <main>
      <h1>アイテム一覧</h1>
      <ItemList items={itemState.items}/>
    </main>
  );
}

export default Items;
