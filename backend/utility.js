export function rename_idToid(arrayOfObj) {
  const newArrayOfObj = arrayOfObj.map(({ _id: id, ...rest }) => ({
    id,
    ...rest
  }));
  return newArrayOfObj;
}
export const renameKey = (object, key, newKey) => {

  const clonedObj = clone(object);

  const targetKey = clonedObj[key];



  delete clonedObj[key];

  clonedObj[newKey] = targetKey;

  return clonedObj;

};
const clone = (obj) => Object.assign({}, obj);

export function isEmptyObject(obj) {
  return JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]';
}

/* console.log(renameKey({
  _id: "63c787455cb162c497e58560",
  title: 'Sample',
  done: false,
  notes: '',
  date: '',
  priority: 'none',
  deleted: false
},'_id','id')) */
