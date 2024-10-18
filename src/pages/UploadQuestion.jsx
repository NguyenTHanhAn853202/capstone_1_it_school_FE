import * as XLSX from 'xlsx';

function UploadQuestion() {
    
const handleFileUpload = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Lấy sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      console.log(sheetName);
      
      const sheet = workbook.Sheets[sheetName];
  
      // Chuyển đổi sheet sang dạng JSON
      const quizData = XLSX.utils.sheet_to_json(sheet);
      console.log(quizData);
      
  
      // Xử lý dữ liệu câu hỏi
    //   const question = []
    //   quizData.forEach((row) => {
    //     question.push({
    //         question: row["Question"],
    //         choices: [row["Option1"], row["Option2"], row["Option3"]],
    //         answer: row["Question"],
    //     })
    //   });
    //   console.log(question);
      
    };
  
    reader.readAsArrayBuffer(file);
  };
    return (  
        <input onChange={handleFileUpload} type='file' />
    );
}

export default UploadQuestion;