import { collection, addDoc, getDocs, getDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Exercise } from '../types/Exercise';

export async function saveExercise(exerciseData: Exercise): Promise<string> {
    try {
        // Si el ejercicio tiene ID, actualizamos el documento existente
        if (exerciseData.id) {
            const exerciseRef = doc(db, 'ejercicios', exerciseData.id);
            const { id, ...dataWithoutId } = exerciseData;
            
            const exerciseWithMetadata = {
                ...dataWithoutId,
                metadata: {
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
        const exerciseSnapshot = await getDocs(exercisesCol);
        const exerciseList = exerciseSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Exercise));
        return exerciseList;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
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
        throw error;
    }
}