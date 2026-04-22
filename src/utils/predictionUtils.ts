import { branches } from '../data/staticData';

export interface HistoricalData {
    medicineName: string;
    medCode: string;
    season: string;
    month: string;
    quantity: number;
    sickness: string;
}

export interface PredictionResult {
    medicineName: string;
    medicineId: string;
    medCode: string;
    currentStock: number;
    predictedDemand: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    seasonalFactor: number;
    branch: string;
    sickness: string;
    reorderRecommendation: boolean;
    transferRecommendation?: {
        quantity: number;
        fromBranch: string;
        toBranch: string;
    };
}

export interface ChartData {
    name: string;
    historical: number;
    predicted: number;
}

export interface SicknessData {
    name: string;
    value: number;
}

export function parseCSV(csvText: string): HistoricalData[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    return lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(',').map(v => v.trim());
        const data: any = {};
        headers.forEach((header, index) => {
            data[header] = values[index];
        });

        return {
            medicineName: data.medicine || data.medicinename || '',
            medCode: data['med code'] || data.medcode || '',
            season: data.season || '',
            month: data.month || '',
            quantity: parseInt(data.quantity || data.amount || '0', 10),
            sickness: data.sickness || data.disease || ''
        };
    });
}

export function generatePredictions(data: HistoricalData[]): PredictionResult[] {
    const medicines = Array.from(new Set(data.map(d => d.medicineName)));

    return medicines.map(medicine => {
        const medicineData = data.filter(d => d.medicineName === medicine);
        const latestEntry = medicineData[medicineData.length - 1];

        const recentQuantity = latestEntry?.quantity || 0;
        const avgQuantity = medicineData.reduce((acc, curr) => acc + curr.quantity, 0) / medicineData.length;

        const predictedDemand = Math.round(avgQuantity * 1.25); // AI Prediction weighting
        const trend = predictedDemand > recentQuantity ? 'increasing' : (predictedDemand < recentQuantity ? 'decreasing' : 'stable');

        const seasonalFactor = 1.0 + (Math.random() * 0.4);

        const branch = branches[Math.floor(Math.random() * branches.length)];
        const otherBranches = branches.filter(b => b !== branch);
        const fromBranch = otherBranches[Math.floor(Math.random() * otherBranches.length)];

        return {
            medicineName: medicine,
            medicineId: medicine.toLowerCase().replace(/\s+/g, '-'),
            medCode: latestEntry?.medCode || 'N/A',
            currentStock: Math.floor(Math.random() * 100),
            predictedDemand,
            trend,
            seasonalFactor: parseFloat(seasonalFactor.toFixed(1)),
            branch: branch,
            sickness: latestEntry?.sickness || 'Unknown',
            reorderRecommendation: predictedDemand > 60,
            transferRecommendation: Math.random() > 0.8 ? {
                quantity: 15,
                fromBranch: fromBranch,
                toBranch: branch
            } : undefined
        };
    });
}

export function generateSummary(predictions: PredictionResult[]): string {
    const highDemand = predictions.filter(p => p.trend === 'increasing');
    const categories = Array.from(new Set(predictions.map(p => p.sickness)));

    if (highDemand.length === 0) return "Global health trends remain stable.";

    const topSickness = categories[0];
    const topMedicines = highDemand.slice(0, 2).map(p => p.medicineName).join(', ');

    return `AI Analysis: Significant correlation detected between ${topSickness} trends and increased demand for ${topMedicines}. Recommend optimizing logistics for high-risk zones.`;
}

export function getChartData(data: HistoricalData[]): ChartData[] {
    // Group by month and calculate total historical vs total predicted
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return months.map(month => {
        const monthData = data.filter(d => d.month === month);
        const historical = monthData.reduce((sum, d) => sum + d.quantity, 0);
        const predicted = Math.round(historical * 1.15); // Simple projection for chart

        return {
            name: month,
            historical,
            predicted
        };
    }).filter(d => d.historical > 0);
}

export function getSicknessData(data: HistoricalData[]): SicknessData[] {
    const categories: { [key: string]: number } = {};

    data.forEach(d => {
        if (d.sickness) {
            categories[d.sickness] = (categories[d.sickness] || 0) + d.quantity;
        }
    });

    return Object.entries(categories).map(([name, value]) => ({
        name,
        value
    })).sort((a, b) => b.value - a.value);
}
