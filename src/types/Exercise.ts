export interface Exercise {
    id?: string;
    title: string;
    description: string;
    category: string;
    subcategory: string | null;
    material: string[];
    duration: number | null;
    series: number | null;
    seriesRestTime: string | null;
    repetitionsRestTime: string | null;
    repetitions: number | null;
    repetitionTime: string | null;
    level: 'beginner' | 'intermediate' | 'advanced' | 'all';
    isVisible: boolean;
}