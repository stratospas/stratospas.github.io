import { collection, getDocs, doc, query, where, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getCountries(full = true) {
    const q = query(
        collection(db, "countries"),
        where("isLive", "==", true)
    );
    const countriesSnapshot = await getDocs(q);
    if(full) {
        return countriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a,b) => a.aa - b.aa);
    }
    return countriesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, pickedBy: null })).sort((a,b) => a.aa - b.aa);
}

export async function getAllCountries() {
    const q = query(
        collection(db, "countries")
    );
    const countriesSnapshot = await getDocs(q);
    return countriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


export async function getUser(name) {
    const q = query(
        collection(db, "users"),
        where("username", "==", name)
    );
    const docSnap = await getDocs(q);
    const userData = docSnap.docs[0].data();

    return {...userData, id: docSnap.docs[0].id }
}

export async function getScores() {
    const q = query(
        collection(db, "users")
    );
    const docSnap = await getDocs(q);

    return docSnap.docs.map(doc => ({ name: doc.data().username, score: doc.data().score })).sort((a,b) => b.score - a.score);
    
}

export async function createScores() {

    const docSnapC = await getDocs(
        collection(db, "countries"),
        where("isLive", "==", true)
    );

    const countries = {};
    
    docSnapC.docs.forEach(doc => {
        countries[doc.data().name] = doc.data().score;
    });


    const userScores = [];
    const q = query(
        collection(db, "users")
    );
    const docSnap = await getDocs(q);

    for (const d of docSnap.docs) {
        const id = d.id;
        let score = 0;

        d.data().countries.forEach(c => {
            if (c.pickedBy) {
                score += c.pickedBy * countries[c.name];
            }
        });

        const userDocRef = doc(db, "users", id);

        await updateDoc(userDocRef, {
            score: score
        });

        userScores.push({
            username: d.data().username,
            score: score
        });
    }
    
    return userScores;
}