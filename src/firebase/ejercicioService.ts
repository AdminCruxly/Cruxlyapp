import { db } from './config'; // Asumiendo que tienes la configuración de Firebase aquí
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface Ejercicio {
  metadata: {
    fechaCreacion: any;
    fechaActualizacion: any;
  };
  informacionBasica: {
    titulo: string;
    descripcion: string;
    categoria: string;
    subcategoria: string;
  };
  etiquetas: string[];
  configuracionEjercicio: {
    duracion: number;
    series: number;
    descanso: string;
    repeticiones: number;
    tiempoRepeticiones: string;
  };
  configuracionAvanzada: {
    nivel: string;
    visibleEnBiblioteca: boolean;
  };
}

export const guardarEjercicio = async (ejercicioData: Omit<Ejercicio, 'metadata'>) => {
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