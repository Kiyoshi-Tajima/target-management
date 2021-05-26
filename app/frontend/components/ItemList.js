import React from "react";
import PropTypes from "prop-types";
import Item from "./Item.tsx"

const ItemList = (props) => {
  const items = props.items;
  console.log('#### ItemList ####'); 
  console.log(items);

  // itemsに何もなければdivのみ
  if (items.length === 0)
    return <div></div>
  
  return (
    <div>
      <h1>ほげアイテムー</h1>
      {
        items.map((item) => (
          <Item key={item.item_id} item={item}/>
        ))
      }
    </div>
  );
}
// 奇しくもESLint様のせい（おかげで）引数の型チェック
// が必要になってしまった。。。
ItemList.propTypes = {
  items: PropTypes.array,
}

export default ItemList;