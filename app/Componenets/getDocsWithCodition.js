'use client';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpin";


export const useDataByCondition = (myCollection, value1, value2, value3) => {
    const [list, setList] = useState([]);
    const colle = collection(firestore, myCollection);
    const condition = where(value1, value2, value3);

    useEffect(() => {
        try {
            const q = query(colle, condition);
            const unsubscribe = onSnapshot(q, (snap) => {
                setList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
            return () => unsubscribe();
        }
        catch (e) {
            console.log(myCollection);
            console.log(value1,value2,value3);
            console.log(e);
        }
    }, [myCollection, value1, value2, value3]);

    return list;
};








