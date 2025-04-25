import { collection, addDoc, getDocs, getDoc, doc, serverTimestamp, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { Exercise } from '../types/Exercise';

export async function saveExercise(exerciseData: Exercise): Promise<string> {
    try {
        // Si el ejercicio tiene ID, actualizamos el documento existente
        if (exerciseData.id) {
            const exerciseRef = doc(db, 'ejercicios', exerciseData.id);
            const { id, ...dataWithoutId } = exerciseData;
            
            // Primero obtenemos el documento actual para preservar el created_at
            const currentDoc = await getDoc(exerciseRef);
            const currentData = currentDoc.data();
            const currentMetadata = currentData?.metadata || {};
            
            const exerciseWithMetadata = {
                ...dataWithoutId,
                metadata: {
                    // Preservamos el created_at si existe
                    created_at: currentMetadata.created_at || serverTimestamp(),
                    updated_at: serverTimestamp(),
                }
            };

            await updateDoc(exerciseRef, exerciseWithMetadata);
            return exerciseData.id;
        } 
        // Si no tiene ID, creamos un nuevo documento
        else {
            const exerciseWithMetadata = {
                ...exerciseData,
                metadata: {
                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                }
            };

            const docRef = await addDoc(collection(db, 'ejercicios'), exerciseWithMetadata);
            return docRef.id;
        }
    } catch (error) {
        console.error('Error saving exercise:', error);
        throw error;
    }
}

export async function getAllExercises(): Promise<Exercise[]> {
    try {
        const exercisesCol = collection(db, 'ejercicios');
        const exercisesQuery = query(exercisesCol, orderBy('metadata.created_at', 'desc'));
        const exerciseSnapshot = await getDocs(exercisesQuery);
        
        // Verificamos si hay documentos antes de procesarlos
        if (exerciseSnapshot.empty) {
            console.log('No se encontraron ejercicios en la base de datos');
            return [];
        }
        
        const exerciseList = exerciseSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data
            } as Exercise;
        });
        
        return exerciseList;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        // En caso de error, devolvemos un array vacío en lugar de lanzar una excepción
        // para evitar que la aplicación se rompa
        return [];
    }
}

export function subscribeToExercises(callback: (exercises: Exercise[]) => void) {
    try {
        const exercisesCol = collection(db, 'ejercicios');
        const exercisesQuery = query(exercisesCol, orderBy('metadata.created_at', 'desc'));
        
        // Utilizamos onSnapshot para obtener actualizaciones en tiempo real
        // Esto funciona incluso en el plan gratuito de Firebase
        return onSnapshot(exercisesQuery, (snapshot) => {
            const exercises = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Exercise));
            callback(exercises);
        }, (error) => {
            console.error('Error en la suscripción a ejercicios:', error);
            // En caso de error, intentamos obtener los datos una sola vez
            getAllExercises().then(callback).catch(console.error);
        });
    } catch (error) {
        console.error('Error subscribing to exercises:', error);
        // En caso de error, intentamos obtener los datos una sola vez
        getAllExercises().then(callback).catch(console.error);
        // Devolvemos una función vacía como unsubscribe
        return () => {};
    }
}

export async function getExerciseById(id: string): Promise<Exercise | null> {
    try {
        const exerciseRef = doc(db, 'ejercicios', id);
        const exerciseSnap = await getDoc(exerciseRef);
        
        if (exerciseSnap.exists()) {
            const data = exerciseSnap.data();
            return {
                id: exerciseSnap.id,
                ...data
            } as Exercise;
        } else {
            console.log('No exercise found with ID:', id);
            return null;
        }
    } catch (error) {
        console.error('Error fetching exercise:', error);
        // En caso de error, devolvemos null en lugar de lanzar una excepción
        return null;
    }
}

export async function deleteExercise(id: string): Promise<void> {
    try {
        // Importamos deleteDoc de firebase/firestore
        const { deleteDoc } = await import('firebase/firestore');
        
        const exerciseRef = doc(db, 'ejercicios', id);
        await deleteDoc(exerciseRef);
        console.log('Exercise deleted successfully:', id);
    } catch (error) {
        console.error('Error deleting exercise:', error);
        throw error;
    }
}
