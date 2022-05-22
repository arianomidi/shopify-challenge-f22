import { db } from "../firebase";
import { collection, doc, setDoc, updateDoc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const inventoryRef = collection(db, "inventory");

const getAll = () => {
  return inventoryRef;
};

const create = (data) => {
  return addDoc(inventoryRef, {
    timestamp: serverTimestamp(),
    ...data
  });
};

const update = (id, value) => {
  return updateDoc(doc(inventoryRef, id), {
    timestamp: serverTimestamp(),
    ...value
  });
};

const trash = (id, comment) => {
  return updateDoc(doc(inventoryRef, id), {
    deleted: true,
    comment
  });
};

const restore = (id) => {
  return updateDoc(doc(inventoryRef, id), {
    deleted: false,
    comment: ""
  });
};

const remove = (id) => {
  return deleteDoc(doc(inventoryRef, id));
};

const InventoryService = {
  getAll,
  create,
  update,
  remove,
  trash,
  restore,
};

export default InventoryService;