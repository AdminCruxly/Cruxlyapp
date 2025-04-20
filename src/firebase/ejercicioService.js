import { db } from './config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const guardarEjercicio = async (ejercicioData) => {
  try {
    const ejercicioCompleto = {
      metadata: {
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp(),
      },
      ...ejercicioData,
    };

    const docRef = await addDoc(collection(db, 'ejercicios'), ejercicioCompleto);
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar el ejercicio:', error);
    throw error;
  }
};