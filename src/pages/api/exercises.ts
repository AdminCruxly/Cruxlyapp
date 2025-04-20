import type { APIRoute } from 'astro';
import { saveExercise } from '../../services/exerciseService';
import type { Exercise } from '../../types/Exercise';

export const post: APIRoute = async ({ request }) => {
    try {
        const exercise = await request.json() as Exercise;
        
        // Validate required fields
        if (!exercise.title || !exercise.description || !exercise.category) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Faltan campos requeridos'
                }),
                { status: 400 }
            );
        }

        const id = await saveExercise(exercise);
        
        return new Response(
            JSON.stringify({
                success: true,
                id
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving exercise:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: 'Error al guardar el ejercicio'
            }),
            { status: 500 }
        );
    }
}