'use client';
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpin";
import GetTrucks from "./getDocs";

export default function GetDocum(id) {
    const getInvoices = GetTrucks("invoices");
    let ino = {};
    getInvoices.map(docc => {
        docc.id == id ? ino = docc : null;
    })
    return ino;
}