'use client';
import { collection, onSnapshot,query,where } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpin";

export default function GetTrucks(myCollection){

    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(false);
    const colle = collection(firestore,myCollection);

    function getList(){
        setLoading(true);
        onSnapshot(colle,(snap) => {
            setList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        })
        setLoading(false);
    }
    
    useEffect(() => {
        getList();
    },[])

    return loading ? <LoadingSpinner/> : list;
}
