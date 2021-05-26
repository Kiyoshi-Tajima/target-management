import * as React from "react"

const Item: React.FC<Props> = ({item}) => {
  const hoge = item;
  console.log('#### Item ####');
  console.log(hoge);

  return (
    <div>
      {hoge.item_name}
    </div>
  );
}

type Props = {
  item: any;
}

export default Item;
