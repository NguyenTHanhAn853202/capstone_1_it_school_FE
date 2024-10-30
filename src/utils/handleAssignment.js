import * as XLSX from 'xlsx';

export function handleAssignmentXLSX(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const questionsArray = jsonData.map((row) => ({
                    question: row[0],
                    answer: [row[1], row[2], row[3]],
                    correctAnswer: row[4],
                    explaination: row[5],
                }));

                resolve(questionsArray);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

export function handleInteractionAssignmentXLSX(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const questionsArray = jsonData.map((row) => ({
                    question: row[0],
                    answer: [row[1], row[2], row[3]],
                    correctAnswer: row[4],
                    explaination: row[5],
                    time: +row[6],
                }));

                resolve(questionsArray);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

function handleAssignmentDocx(text) {
    const questionsArray = [];
    const questions = text.split(/\n\n/); // Tách từng câu hỏi bằng khoảng trống dòng

    questions.forEach((q) => {
        const lines = q.split('\n');
        const questionObj = {
            question: lines[0].replace('Question: ', ''),
            answerA: lines[1].replace('A) ', ''),
            answerB: lines[2].replace('B) ', ''),
            answerC: lines[3].replace('C) ', ''),
            answerD: lines[4].replace('D) ', ''),
            correctAnswer: lines[5].replace('Correct Answer: ', ''),
        };
        questionsArray.push(questionObj);
    });

    return questionsArray;
}
