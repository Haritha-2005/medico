const existingMedicines = [
    {
        id: 'MED001',
        name: 'Paracetamol 500mg',
        batchNumber: 'BT2024001',
        quantity: 1500,
        expiryDate: '2025-12-31',
        storageTemp: '15-25°C',
        branch: 'Branch A',
        category: 'Analgesics',
        minStockLevel: 500,
        barcode: '8901234567890'
    },
    {
        id: 'MED002',
        name: 'Amoxicillin 250mg',
        batchNumber: 'BT2024002',
        quantity: 350,
        expiryDate: '2025-08-15',
        storageTemp: '2-8°C',
        branch: 'Branch A',
        category: 'Antibiotics',
        minStockLevel: 400,
        barcode: '8901234567891'
    },
    {
        id: 'MED003',
        name: 'Insulin Glargine',
        batchNumber: 'BT2024003',
        quantity: 180,
        expiryDate: '2025-06-30',
        storageTemp: '2-8°C',
        branch: 'Branch B',
        category: 'Diabetes',
        minStockLevel: 200,
        barcode: '8901234567892'
    },
    {
        id: 'MED004',
        name: 'Lisinopril 10mg',
        batchNumber: 'BT2024004',
        quantity: 800,
        expiryDate: '2026-03-20',
        storageTemp: '15-25°C',
        branch: 'Branch B',
        category: 'Cardiovascular',
        minStockLevel: 300,
        barcode: '8901234567893'
    },
    {
        id: 'MED005',
        name: 'Metformin 500mg',
        batchNumber: 'BT2024005',
        quantity: 1200,
        expiryDate: '2026-01-10',
        storageTemp: '15-25°C',
        branch: 'Branch A',
        category: 'Diabetes',
        minStockLevel: 500,
        barcode: '8901234567894'
    },
    {
        id: 'MED006',
        name: 'Omeprazole 20mg',
        batchNumber: 'BT2024006',
        quantity: 250,
        expiryDate: '2025-11-25',
        storageTemp: '15-25°C',
        branch: 'Branch C',
        category: 'Gastrointestinal',
        minStockLevel: 400,
        barcode: '8901234567895'
    },
    {
        id: 'MED007',
        name: 'Azithromycin 500mg',
        batchNumber: 'BT2024007',
        quantity: 420,
        expiryDate: '2025-09-30',
        storageTemp: '15-25°C',
        branch: 'Branch C',
        category: 'Antibiotics',
        minStockLevel: 300,
        barcode: '8901234567896'
    },
    {
        id: 'MED008',
        name: 'Atorvastatin 20mg',
        batchNumber: 'BT2024008',
        quantity: 650,
        expiryDate: '2026-05-15',
        storageTemp: '15-25°C',
        branch: 'Branch B',
        category: 'Cardiovascular',
        minStockLevel: 400,
        barcode: '8901234567897'
    }
];

const categories = [
    'Analgesics', 'Antibiotics', 'Diabetes', 'Cardiovascular', 'Gastrointestinal',
    'Respiratory', 'Antihistamines', 'Vitamins', 'Dermatologicals', 'Psychotropics'
];

const drugNames = [
    'Ibuprofen', 'Cetirizine', 'Lorartadine', 'Fluoxetine', 'Sertraline',
    'Amlodipine', 'Losartan', 'Simvastatin', 'Metoprolol', 'Pantoprazole',
    'Esomeprazole', 'Ciprofloxacin', 'Levofloxacin', 'Doxycycline', 'Prednisone',
    'Hydrochlorothiazide', 'Furosemide', 'Gabapentin', 'Clonazepam', 'Alprazolam',
    'Tramadol', 'Oxycodone', 'Morphine', 'Warfarin', 'Rivaroxaban',
    'Naproxen', 'Meloxicam', 'Diclofenac', 'Celecoxib', 'Aspirin'
];

const dosages = ['10mg', '20mg', '50mg', '100mg', '200mg', '500mg', '1000mg', '5ml', '10ml', '5g', '15g'];

const branches = ['Branch A', 'Branch B', 'Branch C'];

function randomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

const medicines = [...existingMedicines];

for (let i = 9; i <= 100; i++) {
    const idStr = i.toString().padStart(3, '0');
    const drugName = drugNames[Math.floor(Math.random() * drugNames.length)];
    const dosage = dosages[Math.floor(Math.random() * dosages.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const minStock = Math.floor(Math.random() * 400) + 100;

    medicines.push({
        id: `MED${idStr}`,
        name: `${drugName} ${dosage}`,
        batchNumber: `BT2024${idStr}`,
        quantity: Math.floor(Math.random() * 2000) + 50,
        expiryDate: randomDate(new Date(2025, 0, 1), new Date(2027, 11, 31)),
        storageTemp: Math.random() > 0.5 ? '15-25°C' : '2-8°C',
        branch: branch,
        category: categories[Math.floor(Math.random() * categories.length)],
        minStockLevel: minStock,
        barcode: (8901234567000 + i).toString()
    });
}

function formatObject(obj) {
    const parts = [];
    for (const key in obj) {
        let val = obj[key];
        if (typeof val === 'string') {
            val = `'${val}'`;
        }
        parts.push(`  ${key}: ${val}`);
    }
    return `  {\n  ${parts.join(',\n  ')}\n  }`;
}

import fs from 'fs';
const output = `import { Medicine } from '../types';\n\nexport const staticMedicines: Medicine[] = [\n${medicines.map(formatObject).join(',\n')}\n];`;
fs.writeFileSync('generated_medicines.txt', output);
console.log('Successfully generated 100 medicines to generated_medicines.txt');
