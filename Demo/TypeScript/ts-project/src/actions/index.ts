/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-13 17:07:02
 */
import { data } from "./data";

// 定义数据接口
interface OriginData {
  image_list: Array<object>
  title: string
  has_image: boolean
  image_url: string
  item_id: string
}

// const variableData: OriginData = data.data[0]

// 
const getImage = (data: OriginData): Array<string> => {
  return data.image_list.length > 0
    ? data.image_list.map((info: any) => info.url)
    : [data.image_url];
};

// reflection
const getItemType = data => {
  return data.has_image
    ? data.image_list.length > 0
      ? "there-pic"
      : "one-pic"
    : "no-pic";
};

const formListData = data => {
  return data.map((item: OriginData) => ({
    imageList: getImage(item),
    title: item.title,
    type: getItemType(item)
  }));
};

export const getList = () => {

  return Promise.resolve(formListData(data.data)).then(data => data);
};
