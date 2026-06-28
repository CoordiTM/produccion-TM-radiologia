import { db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  addDoc,
  getDoc
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';
const PRODUCTION_COLLECTION = 'production';
const SALAS_COLLECTION = 'salas';
const EXAMENES_COLLECTION = 'examenes_especiales';

// ============================================
// USUARIOS
// ============================================
export const getAllUsers = async () => {
  const snapshot = await getDocs(collection(db, USERS_COLLECTION));
  return snapshot.docs.map(doc => ({ dni: doc.id, ...doc.data() }));
};

export const saveUser = async (userData) => {
  const { dni, ...data } = userData;
  await setDoc(doc(db, USERS_COLLECTION, dni), data, { merge: true });
  return { dni, ...data };
};

export const deleteUser = async (dni) => {
  await deleteDoc(doc(db, USERS_COLLECTION, dni));
};

// ============================================
// PRODUCCIÓN
// ============================================
export const getAllProduction = async () => {
  const snapshot = await getDocs(collection(db, PRODUCTION_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductionByUser = async (userDni) => {
  const q = query(collection(db, PRODUCTION_COLLECTION), where('user', '==', userDni));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduction = async (productionData) => {
  const docRef = await addDoc(collection(db, PRODUCTION_COLLECTION), productionData);
  return { id: docRef.id, ...productionData };
};

export const updateProduction = async (id, productionData) => {
  const docRef = doc(db, PRODUCTION_COLLECTION, String(id));
  await updateDoc(docRef, productionData);
  return { id, ...productionData };
};

export const deleteProduction = async (id) => {
  await deleteDoc(doc(db, PRODUCTION_COLLECTION, String(id)));
};

// ============================================
// SALAS
// ============================================
export const getSalas = async () => {
  const docRef = doc(db, SALAS_COLLECTION, 'lista');
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data().items || [];
  }
  return [];
};

export const saveSalas = async (salas) => {
  await setDoc(doc(db, SALAS_COLLECTION, 'lista'), { items: salas });
};

// ============================================
// EXÁMENES ESPECIALES
// ============================================
export const getExamenesEspeciales = async () => {
  const docRef = doc(db, EXAMENES_COLLECTION, 'catalogo');
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data().items || [];
  }
  return [];
};

export const saveExamenesEspeciales = async (examenes) => {
  await setDoc(doc(db, EXAMENES_COLLECTION, 'catalogo'), { items: examenes });
};
